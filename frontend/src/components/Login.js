import React, { useState } from "react";

function Login(props) {

  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { email,  password } = formValue;
    props.onLogin({
      email: email,
      password: password
    });
}

  return(
    <div className="authorization">
      <h1 className="authorization__title">Вход</h1>
      <form onSubmit={handleSubmit} className="authorization__form">
      <div className="authorization__input-block">
        <input value={formValue.email || ""} onChange={handleChange} name="email" className="authorization__input" placeholder="Email" type="email"></input>
        <input value={formValue.password || ""} onChange={handleChange} name="password" className="authorization__input" placeholder="Пароль" type="password"></input>
      </div>
        <button type="submit" className="authorization__button">Войти</button>
      </form>
    </div>
  )
}

export default Login;
