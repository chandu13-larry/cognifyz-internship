const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Temporary server-side storage
const students = [];

app.get('/', (req, res) => {
    res.render('index');
});

// Server-side validation and storage
app.post('/register', (req, res) => {
    const { name, email, phone, course } = req.body;
    
    // Validation: Check if any field is empty
    if (!name || !email || !phone || !course) {
        return res.send("<h1>Error: All fields are required!</h1><a href='/'>Go Back</a>");
    }

    // Store the data
    students.push({ name, email, phone, course });
    
    // Redirect to the success page
    res.redirect('/students');
});

// Display registered students
app.get('/students', (req, res) => {
    res.render('students', { students });
});

app.listen(port, () => {
    console.log(`Task 2 Server is running on http://localhost:${port}`);
});