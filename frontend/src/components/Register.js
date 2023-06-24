import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register(props) {

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
    props.onRegister({
      email: email,
      password: password
    });
}

  return(
    <div className="authorization">
      <h1 className="authorization__title">Регистрация</h1>
      <form onSubmit={handleSubmit} className="authorization__form">
      <div className="authorization__input-block">
        <input value={formValue.email || ""} name="email" onChange={handleChange} className="authorization__input" placeholder="Email" type="email"></input>
        <input value={formValue.password || ""} name="password" onChange={handleChange} className="authorization__input" placeholder="Пароль" type="password"></input>
      </div>
        <button type="submit" className="authorization__button">Зарегистрироваться</button>
        {/* <p className="authorization__text">
        Уже зарегистрированы? Войти */}
          <Link to="/sign-in" className="authorization__link">
            Уже зарегистрированы? Войти
          </Link>
        {/* </p> */}
      </form>
    </div>
  )
}

export default Register;
