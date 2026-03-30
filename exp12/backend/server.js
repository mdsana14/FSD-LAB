const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://mailmdsana_db_user:fYMRtm5mD1XGDNqa@cluster0.hvmy19b.mongodb.net/studentsDB')
  .then(() => console.log('MongoDB Atlas connected'))
  .catch(err => console.log(err));


// Schema
const Student = mongoose.model('Student', new mongoose.Schema({
  name: String,
  studentId: String,
  grade: String
}));

// GET
app.get('/api/students', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// POST
app.post('/api/students', async (req, res) => {
  const newStudent = new Student(req.body);
  await newStudent.save();
  res.status(201).json(newStudent);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});