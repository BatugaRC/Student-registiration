const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db.js');


app.use(cors());
app.use(express.json());



// get all students
app.get('/student', async (req, res) => {
    try {
        const students = await pool.query("SELECT * FROM students");
        res.json(students.rows);
    } catch (err) {
        console.error(err.message);
    }
});


//register a student
app.post("/student", async (req, res) => {
    try {
        const { first_name, last_name, gpa } = req.body;
        console.log(req.body);
        const student = await pool.query(
            "INSERT INTO students(first_name, last_name, gpa) VALUES($1, $2, $3) RETURNING *",
            [first_name, last_name, gpa]
        );
        res.json(student.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
    }
});

// get one student 
app.get('/student/:id', async (req, res) => {
    try {
        const student = await pool.query("SELECT * FROM students WHERE student_id=$1", [req.params.id]);
        res.json(student.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//delete a student 

app.delete('/student/:id', async (req, res) => {
    try {
        await pool.query("DELETE FROM students WHERE student_id=$1", [req.params.id]);
        res.send("Student deleted successfully")
    } catch (err) {
        console.error(err.message);
    }
    
})


const port = 1000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});