const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
// server.js
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1318',
    database: 'fitness_center_db'
  });

// CRUD for Members

// Get all members
router.get('/members', (req, res) => {
    db.query('SELECT * FROM members', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Add new member
router.post('/members', (req, res) => {
    const { name, email, phone, membership_type, start_date, end_date } = req.body;
    const sql = 'INSERT INTO members (name, email, phone, membership_type, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, email, phone, membership_type, start_date, end_date], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'Member added successfully!' });
    });
});

// Update a member
router.put('/members/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, phone, membership_type, start_date, end_date } = req.body;
    const sql = 'UPDATE members SET name=?, email=?, phone=?, membership_type=?, start_date=?, end_date=? WHERE member_id=?';
    db.query(sql, [name, email, phone, membership_type, start_date, end_date, id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'Member updated successfully!' });
    });
});

// Delete a member
router.delete('/members/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM members WHERE member_id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'Member deleted successfully!' });
    });
});

// CRUD for Trainers

// Get all trainers
router.get('/trainers', (req, res) => {
    db.query('SELECT * FROM trainers', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Add new trainer
router.post('/trainers', (req, res) => {
    const { name, specialization, email, phone } = req.body;
    const sql = 'INSERT INTO trainers (name, specialization, email, phone) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, specialization, email, phone], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'Trainer added successfully!' });
    });
});

// Update a trainer
router.put('/trainers/:id', (req, res) => {
    const { id } = req.params;
    const { name, specialization, email, phone } = req.body;
    const sql = 'UPDATE trainers SET name=?, specialization=?, email=?, phone=? WHERE trainer_id=?';
    db.query(sql, [name, specialization, email, phone, id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'Trainer updated successfully!' });
    });
});

// Delete a trainer
router.delete('/trainers/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM trainers WHERE trainer_id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'Trainer deleted successfully!' });
    });
});

module.exports = router;
