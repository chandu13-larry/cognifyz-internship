const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Render the registration form
app.get('/', (req, res) => {
    res.render('index');
});

// Handle form submission (Basic Server Interaction)
app.post('/register', (req, res) => {
    console.log("New student registered:", req.body);
    res.send("<h1>Registration Successful!</h1><p>Check your terminal for the data.</p><a href='/'>Go Back</a>");
});

app.listen(port, () => {
    console.log(`Task 1 Server is running on http://localhost:${port}`);
});