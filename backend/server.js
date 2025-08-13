const express = require('express');
const cors = require('cors');
require('dotenv').config();

const attendanceRoutes = require('./routes/attendance');
const userRoutes = require('./routes/users');

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON bodies

app.use('/attendance', attendanceRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});