const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.REACT_APP_MONGODB_CONNECTION_STRING);

const courseSchema = new mongoose.Schema({
    likes: Number,
    id: String,
    name: String,
    instructor: String,
    description: String,
    enrollmentStatus: String,
    thumbnail: String,
    duration: String,
    schedule: String,
    location: String,
    prerequisites: [String],
    syllabus: [{
        week: Number,
        topic: String,
        content: String,
    }],
});

const studentSchema = new mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    enrollment: [
        {
            courseId: Number,
            courseName: String,
            completed: {
                type: Boolean,
                default: false
            }
        }
    ]
});

const Student = mongoose.model('Student', studentSchema);

const Course = mongoose.model('Course', courseSchema);
app.get('/courses', async (req, res) => {
    try {
        const coursesFromDB = await Course.find();
        res.json(coursesFromDB);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/courses', async (req, res) => {
    try {
        const newCourse = req.body;
        const createdCourse = await Course.create(newCourse);
        res.status(201).json(createdCourse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
// Define a route to get a course by its ID from MongoDB
app.get('/course/:id', async (req, res) => {
    const courseId = req.params.id;
    try {
        const courseFromDB = await Course.findOne({id:courseId});
        if (courseFromDB) {
            res.json(courseFromDB);
        } else {
            res.status(404).json({ error: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Define a route to increment the likes of a course by 1 in MongoDB
app.put('/courses/:id/like', async (req, res) => {
    const courseId = req.params.id;
    try {
        const courseFromDB = await Course.findOneAndUpdate({id: courseId}, { $inc: { likes: 1 } }, { new: true });
        if (courseFromDB) {
            res.json({ message: 'Likes incremented successfully', likes: courseFromDB.likes });
        } else {
            res.status(404).json({ error: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/students/addCourseToEnrollment', async (req, res) => {
    try {
      const { studentId, courseId, courseName } = req.body;
  
      // Validate input
      if (!studentId || !courseId || !courseName) {
        return res.status(400).json({ error: 'Both studentId, courseId, and courseName are required in the request body' });
      }
  
      // Check if the student exists
      const student = await Student.findOne({id: parseInt(studentId)});
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
  
      // Check if the course exists (assuming there is a Course model)
      const courseExists = await Course.exists({ id: courseId });
      if (!courseExists) {
        return res.status(404).json({ error: 'Course not found' });
      }
  
      // Add the course to the enrollment array
      student.enrollment.push({ courseId, courseName });
      await student.save();
  
      res.json({ message: 'Course added to enrollment successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

app.post('/students', async (req, res) => {
    try {
        const newStudent = req.body;
        const createdStudent = await Student.create(newStudent);
        res.status(201).json(createdStudent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Define a route to get all students
app.get('/students', async (req, res) => {
    try {
        const allStudents = await Student.find();
        res.json(allStudents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.post('/students/id', async (req, res) => {
    try {
      const studentId = req.body.id;
      if (!studentId) {
        return res.status(400).json({ error: 'ID is required in the request body' });
      }
  
      const foundStudent = await Student.findOne({ id: studentId });
      if (foundStudent) {
        res.json(foundStudent);
      } else {
        res.status(404).json({ error: 'Student not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
