const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

// 1. Initialize Database
const db = new sqlite3.Database('./database.sqlite');
const SECRET_KEY = 'cognifyz_secure_key_123';

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT UNIQUE, password TEXT)");
});

app.get('/', (req, res) => res.render('index'));

// 2. Register Endpoint (Hashes Password)
app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    db.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword], function(err) {
        if (err) return res.status(400).json({ error: "Email already registered" });
        res.status(201).json({ message: "User registered securely!" });
    });
});

// 3. Login Endpoint (Generates JWT)
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ message: "Login successful", token });
    });
});

// 4. Security Middleware (Verifies Token)
const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ error: "Access denied. No token provided." });
    
    jwt.verify(token.split(' ')[1], SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ error: "Invalid or expired token." });
        req.userId = decoded.id;
        next();
    });
};

// 5. Secure Endpoint (Requires Authentication)
app.get('/api/dashboard', authenticate, (req, res) => {
    db.all("SELECT id, name, email FROM users", [], (err, rows) => {
        res.json({ message: "Welcome to the secure vault!", users: rows });
    });
});
app.listen(3001, () => console.log('Task 6 Server running on http://localhost:3001'));