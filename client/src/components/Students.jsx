import React, {useState, useEffect, Fragment} from 'react'

const Students = () => {

  const [students, setStudents] = useState([]);

  const deleteStudent = async id => {
      try {
        const deleteTodo = await fetch(`http://localhost:1000/student/${id}`, {
          method: 'DELETE'
        });

      setStudents(students.filter(student => student.student_id !== id));
      } catch (err) {
        console.error(err.message);
      }
  }
  const getStudents = async () => {
    try {
      const response = await fetch("http://localhost:1000/student");
      const data = await response.json();
      setStudents(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);
  return (
    <Fragment>
      {students.length > 0 ? (<table border="1" className='table'> 
      <thead>
      <tr>
        <td>Student Number</td>
        <td>First Name</td>
        <td>Last Name</td>
        <td>GPA</td>
      </tr>
      </thead>
      <tbody>
        {
          students.map((student) => (
            
            <tr key={student.student_id}>
              <td>{student.student_id}</td>
              <td>{student.first_name}</td>
              <td>{student.last_name}</td>
              <td>{student.gpa}</td>
              <td>
              <button className='button' onClick={() => deleteStudent(student.student_id)}>Delete Student</button>

              </td>
            </tr>
          ))
        }
        </tbody>
      </table>)  : (<><h1 className='title'>There are no any students to see!</h1> 
                  <h2 className='title'>Fill in the form to register a student</h2>
                  </>
        )
      }
    </Fragment>
  )
}
export default Students