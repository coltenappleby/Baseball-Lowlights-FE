import React, { useState } from 'react'

function Login({ setCurrentUserId }) {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [errors, setErrors] = useState([])

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    fetch('http://localhost:3000/users/login', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(resp => resp.json())
    .then((data) => {
      if (data.id){
        window.sessionStorage.setItem("currentUserId", `${data.id}`)
        setCurrentUserId(data.id)
      } else {
        setErrors(data)
      }
    })
  }

  return (
    <div>
      {errors ? <p style={{color: "red"}}>{errors[0]}</p> : null}
      <form onSubmit={handleSubmit}>
        <label>Email: </label>
        <input type="text" name="email" value={formData.email} onChange={handleChange}/><br />
        <label>Password: </label>
        <input type="password" name="password" value={formData.password} onChange={handleChange}/><br />
        <input type="submit" />
      </form>
    </div>
  )
}

export default Login 