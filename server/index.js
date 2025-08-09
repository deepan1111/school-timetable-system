const express = require('express');
const app = express();
require('dotenv').config();

const authRoutes = require('./routes/auth'); 
const protectedRoutes = require('./routes/protectedRoutes'); 
console.log('ADMIN_ACCESS_CODE:', process.env.ADMIN_ACCESS_CODE);

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
