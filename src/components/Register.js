import React, { useState } from 'react'

function Register({ setLoggedIn }) {
  const [formData, setFormData] = useState ({
    email: "",
    password: "",
    username: ""
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
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(resp => resp.json())
    .then((data) => {
      if (data.id) {
        window.sessionStorage.setItem("currentUserId", `${data.id}`)
        setLoggedIn(true)
      }
      else {
        setErrors(data)
      }
    })
  }

  let displayErrors
  if (errors.length > 0) {
    displayErrors = errors.map((error, idx) => <p key={error + idx} style={{color: "red"}}>{error}</p>)
  }

  return (
    <div>
      {errors.length > 0 && <div>{displayErrors}</div>}
      <form onSubmit={handleSubmit}>
        <label>Email: </label><br/>
        <input type="text" name="email" value={formData.email} onChange={handleChange}/><br />
        <label>Username: </label><br/>
        <input type="text" name="username" value={formData.username} onChange={handleChange}/><br />
        <label>Password: </label><br/>
        <input type="password" name="password" value={formData.password} onChange={handleChange}/><br />
        <input className="login-submit" type="submit" />
      </form>
    </div>
  )
}

export default Register