CREATE TABLE students( 
    student_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL UNIQUE,
    gpa NUMERIC(2, 2) NOT NULL
);