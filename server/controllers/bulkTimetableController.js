// backend/controllers/bulkTimetableController.js
import db from "../db/db.js";

/**
 * Bulk create timetables for all sections
 * Algorithm: Distributes teachers evenly, avoids conflicts, balances workload
 */
export const bulkCreateTimetable = async (req, res) => {
  const connection = await db.getConnection();
  
  try {
    const {
      standard,           // e.g., "10th"
      sections,          // e.g., ["A", "B", "C", "D"]
      subjects,          // Array of { subject_id, subject_name, teacher_ids: [1,2,3], periods_per_week: 5 }
      room_numbers,      // Optional: { "A": "101", "B": "102" }
      start_time,        // "08:00"
      period_duration,   // 45 (minutes)
      breaks,            // [{ after_period: 3, duration: 15 }, { after_period: 6, duration: 45 }]
      working_days       // 6 (Mon-Sat) or 5 (Mon-Fri)
    } = req.body;

    // Validation
    if (!standard || !sections || !subjects || sections.length === 0) {
      return res.status(400).json({ 
        message: "Missing required fields: standard, sections, subjects" 
      });
    }

    await connection.beginTransaction();

    // Step 1: Delete existing timetables for these sections
    console.log(`🗑️ Cleaning up existing timetables for ${standard}...`);
    for (const section of sections) {
      const className = `${standard} ${section}`.toUpperCase();
      await connection.query(
        `DELETE schedules FROM schedules 
         JOIN classes ON schedules.class_id = classes.class_id 
         WHERE classes.class_name = ?`,
        [className]
      );
      await connection.query(
        `DELETE FROM classes WHERE class_name = ?`,
        [className]
      );
    }

    // Step 2: Create time slots (excluding breaks)
    const timeSlots = generateTimeSlots(start_time || "08:00", period_duration || 45, breaks || [], 8);
    
    // Step 3: Distribute subjects across sections using round-robin
    const sectionAssignments = distributeSectionsToTeachers(sections, subjects);

    // Step 4: Create classes and schedules
    console.log(`📅 Creating timetables for ${sections.length} sections...`);
    
    for (const section of sections) {
      const className = `${standard} ${section}`.toUpperCase();
      const roomNumber = room_numbers?.[section] || null;

      // For each subject assigned to this section
      for (const subjectAssignment of sectionAssignments[section]) {
        const { subject_id, subject_name, teacher_id, periods_per_week } = subjectAssignment;

        // Create class entry
        const [classResult] = await connection.query(
          `INSERT INTO classes (class_name, teacher_id, subject_id, room_number, student_capacity)
           VALUES (?, ?, ?, ?, ?)`,
          [className, teacher_id, subject_id, roomNumber, 40]
        );

        const classId = classResult.insertId;

        // Distribute periods across the week
        const scheduleSlots = distributePeriodsAcrossWeek(
          periods_per_week, 
          working_days || 6, 
          timeSlots
        );

        // Create schedule entries
        for (const slot of scheduleSlots) {
          const { day, time, endTime } = slot;
          
          // Check for conflicts (same teacher, same time)
          const [conflicts] = await connection.query(
            `SELECT COUNT(*) as count FROM schedules sch
             JOIN classes c ON sch.class_id = c.class_id
             WHERE c.teacher_id = ? 
             AND sch.day_of_week = ? 
             AND sch.start_time = ?`,
            [teacher_id, day, time]
          );

          if (conflicts[0].count > 0) {
            console.log(`⚠️ Conflict detected for teacher ${teacher_id} on day ${day} at ${time}, skipping...`);
            continue; // Skip this slot
          }

          await connection.query(
            `INSERT INTO schedules (class_id, day_of_week, start_time, end_time, duration)
             VALUES (?, ?, ?, ?, ?)`,
            [classId, day, time, endTime, period_duration || 45]
          );
        }
      }
    }

    await connection.commit();

    res.status(201).json({ 
      message: `✅ Successfully created timetables for ${sections.length} sections!`,
      details: {
        standard,
        sections: sections.length,
        subjects: subjects.length,
        total_classes: Object.values(sectionAssignments).flat().length
      }
    });

  } catch (error) {
    await connection.rollback();
    console.error("❌ Error in bulk timetable creation:", error);
    res.status(500).json({ 
      message: "Failed to create timetables", 
      error: error.message 
    });
  } finally {
    connection.release();
  }
};

/**
 * Generate time slots for the day (excluding breaks)
 */
function generateTimeSlots(startTime, periodDuration, breaks, maxPeriods) {
  const slots = [];
  let currentTime = startTime;
  let periodCount = 0;

  const breakTimes = breaks.reduce((acc, b) => {
    acc[b.after_period] = b.duration;
    return acc;
  }, {});

  for (let i = 1; i <= maxPeriods; i++) {
    const [hours, minutes] = currentTime.split(':').map(Number);
    const startMinutes = hours * 60 + minutes;
    const endMinutes = startMinutes + periodDuration;
    
    const endHours = Math.floor(endMinutes / 60);
    const endMins = endMinutes % 60;
    const endTime = `${String(endHours).padStart(2, '0')}:${String(endMins).padStart(2, '0')}`;

    slots.push({ period: i, time: currentTime, endTime });
    periodCount++;

    // Add break time if exists
    if (breakTimes[i]) {
      const breakEndMinutes = endMinutes + breakTimes[i];
      const breakEndHours = Math.floor(breakEndMinutes / 60);
      const breakEndMins = breakEndMinutes % 60;
      currentTime = `${String(breakEndHours).padStart(2, '0')}:${String(breakEndMins).padStart(2, '0')}`;
    } else {
      currentTime = endTime;
    }
  }

  return slots;
}

/**
 * Distribute sections to teachers using round-robin
 * Ensures even workload distribution
 */
function distributeSectionsToTeachers(sections, subjects) {
  const assignments = {};
  
  sections.forEach(section => {
    assignments[section] = [];
  });

  subjects.forEach(subject => {
    const { subject_id, subject_name, teacher_ids, periods_per_week } = subject;
    const teachers = teacher_ids || [];
    
    if (teachers.length === 0) {
      console.warn(`⚠️ No teachers assigned for ${subject_name}`);
      return;
    }

    // Round-robin distribution
    sections.forEach((section, index) => {
      const teacherIndex = index % teachers.length;
      const assignedTeacher = teachers[teacherIndex];
      
      assignments[section].push({
        subject_id,
        subject_name,
        teacher_id: assignedTeacher,
        periods_per_week: periods_per_week || 5
      });
    });
  });

  return assignments;
}

/**
 * Distribute periods evenly across the week
 * Avoids clustering periods on same day
 */
function distributePeriodsAcrossWeek(periodsPerWeek, workingDays, timeSlots) {
  const distribution = [];
  const periodsPerDay = Math.floor(periodsPerWeek / workingDays);
  const extraPeriods = periodsPerWeek % workingDays;
  
  let periodIndex = 0;
  
  for (let day = 1; day <= workingDays; day++) {
    let periodsForThisDay = periodsPerDay;
    
    // Distribute extra periods to early days
    if (day <= extraPeriods) {
      periodsForThisDay++;
    }
    
    for (let p = 0; p < periodsForThisDay && periodIndex < timeSlots.length; p++) {
      const slot = timeSlots[periodIndex % timeSlots.length];
      distribution.push({
        day,
        time: slot.time,
        endTime: slot.endTime
      });
      periodIndex++;
    }
  }
  
  return distribution;
}

/**
 * Get all available teachers with their subjects
 */
export const getAvailableTeachersForBulk = async (req, res) => {
  try {
    const [teachers] = await db.query(
      `SELECT 
        t.teacher_id,
        t.name,
        t.email,
        s.subject_id,
        s.subject_name
       FROM teachers t
       LEFT JOIN subjects s ON t.subject_id = s.subject_id
       ORDER BY s.subject_name, t.name`
    );

    // Group teachers by subject
    const grouped = teachers.reduce((acc, teacher) => {
      const subjectKey = teacher.subject_id;
      if (!acc[subjectKey]) {
        acc[subjectKey] = {
          subject_id: teacher.subject_id,
          subject_name: teacher.subject_name,
          teachers: []
        };
      }
      acc[subjectKey].teachers.push({
        teacher_id: teacher.teacher_id,
        name: teacher.name,
        email: teacher.email
      });
      return acc;
    }, {});

    res.json(Object.values(grouped));
  } catch (error) {
    console.error("Error fetching teachers:", error);
    res.status(500).json({ message: "Failed to fetch teachers" });
  }
};