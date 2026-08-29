const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

const students = [];

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/register', (req, res) => {
    // Added password to the incoming data
    const { name, email, phone, course, password } = req.body;
    
    // Server-side validation
    if (!name || !email || !phone || !course || !password) {
        return res.send("<h1 style='text-align:center; margin-top:50px;'>Error: All fields are required!</h1><div style='text-align:center;'><a href='/'>Go Back</a></div>");
    }

    // We save the student (without storing the password in our temporary list for security)
    students.push({ name, email, phone, course });
    res.redirect('/students');
});

app.get('/students', (req, res) => {
    res.render('students', { students });
});

app.listen(port, () => {
    console.log(`Task 4 Server is running on http://localhost:${port}`);
});