const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Required to parse JSON from API requests
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Simulated Database
let students = [];

// Serve the main frontend page
app.get('/', (req, res) => {
    res.render('index');
});

// --- RESTful API Endpoints ---

// CREATE: Add a new student
app.post('/api/students', (req, res) => {
    const { name, email, phone, course } = req.body;
    if (!name || !email || !phone || !course) {
        return res.status(400).json({ error: "All fields required" });
    }
    
    const newStudent = { id: Date.now(), name, email, phone, course };
    students.push(newStudent);
    res.status(201).json({ message: "Student registered successfully", student: newStudent });
});

// READ: Fetch all students
app.get('/api/students', (req, res) => {
    res.json(students);
});

// DELETE: Remove a student
app.delete('/api/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    students = students.filter(student => student.id !== id);
    res.json({ message: "Student deleted" });
});

app.listen(port, () => {
    console.log(`Task 5 API Server is running on http://localhost:${port}`);
});