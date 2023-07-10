import React, {useState} from 'react'

const Form = () => {

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    gpa: "",
  })
  const onChangeForm = (e) => {
    const {name, value} = e.target
    setForm(prevForm => {
      return {
        ...prevForm,
        [name]: value
      }
    }
      )
  }
  const onSubmitForm = async (e) => {
    e.preventDefault();
    console.log(e.target.first_name.value)
      try {
        const response = await fetch("http://localhost:1000/student", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        });
    
        if (response.ok) {
          window.location = "/student";
        } else {
          console.error("Failed to add student");
        }
      } catch (err) {
        console.error(err.message);
    }
  }
  return (
    <>
    <form onSubmit={onSubmitForm} className="form">
    <input type="text" placeholder='First name' name='first_name' onChange={onChangeForm} />
    <input type="text" placeholder='Last name' name='last_name' onChange={onChangeForm}  />
    <input type="number" placeholder="GPA" name="gpa" onChange={onChangeForm} />
    <input type="submit" value='Add Student' />
    </form>
    </>
  )
}

export default Form