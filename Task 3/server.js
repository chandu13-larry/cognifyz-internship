const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// NEW: This tells the server to load our custom CSS from the 'public' folder
app.use(express.static('public'));

const students = [];

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/register', (req, res) => {
    const { name, email, phone, course } = req.body;
    
    if (!name || !email || !phone || !course) {
        return res.send("<h1 style='text-align:center; margin-top:50px;'>Error: All fields are required!</h1><div style='text-align:center;'><a href='/'>Go Back</a></div>");
    }

    students.push({ name, email, phone, course });
    res.redirect('/students');
});

app.get('/students', (req, res) => {
    res.render('students', { students });
});

app.listen(port, () => {
    console.log(`Task 3 Server is running on http://localhost:${port}`);
});