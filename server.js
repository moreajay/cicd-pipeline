// server.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const path = require('path');

const app = express();
const PORT = 3000;

// Create table if it doesn't exist
async function initializeDatabase() {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS todos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            task VARCHAR(255) NOT NULL,
            completed BOOLEAN DEFAULT FALSE
        );
    `;
    try {
        await db.query(createTableQuery);
        console.log('Table "todos" is ready.');
    } catch (err) {
        console.error('Error creating table:', err.message);
        process.exit(1); // Stop app if DB setup fails
    }
}

//  Start server only after DB is initialized
(async () => {
    await initializeDatabase();

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
})();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/api/todos', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM todos');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/todos', async (req, res) => {
    const { task } = req.body;
    try {
        const [result] = await db.query('INSERT INTO todos (task) VALUES (?)', [task]);
        res.json({ id: result.insertId, task, completed: false });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/todos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('UPDATE todos SET completed = NOT completed WHERE id = ?', [id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/todos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM todos WHERE id = ?', [id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
