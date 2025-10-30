


// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";

// dotenv.config();

// export const verifyToken = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   if (!authHeader) return res.status(401).json({ message: "No token provided" });

//   const token = authHeader.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "No token provided" });

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) return res.status(403).json({ message: "Invalid token" });
//     req.user = decoded;
//     next();
//   });
// };

// export const adminOnly = (req, res, next) => {
//   if (req.user.role !== "admin") {
//     return res.status(403).json({ message: "Access denied: Admins only" });
//   }
//   next();
// };

// export const teacherOnly = (req, res, next) => {
//   if (req.user.role !== "teacher") {
//     return res.status(403).json({ message: "Access denied: Teachers only" });
//   }
//   next();
// };

// export const allowRoles = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res
//         .status(403)
//         .json({ message: `Access denied: Only ${roles.join(", ")} allowed` });
//     }
//     next();
//   };
// };

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Verify JWT Token
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = decoded; // { id, role }
    next();
  });
};

// Admin Only Middleware
export const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  next();
};

// Teacher Only Middleware
export const teacherOnly = (req, res, next) => {
  if (req.user.role !== "teacher") {
    return res.status(403).json({ message: "Access denied: Teachers only" });
  }
  next();
};

// Allow Multiple Roles
export const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Access denied: Only ${roles.join(", ")} allowed` 
      });
    }
    next();
  };
};