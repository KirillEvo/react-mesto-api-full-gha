import React, { useState } from "react";
import logo from "../images/logo.svg";
import { Link, Route, Routes } from "react-router-dom";

function Header(props) {
  const [mobileMenu, setMobileMenu] = useState(false);
  function handelClickMenu() {
    if (mobileMenu) {
      setMobileMenu(false);
    } else {
      setMobileMenu(true);
    }
  }
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Место" />
      <Routes>
        <Route
          path="/sign-in"
          element={
            <Link to="/sign-up" className="header__authorization">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Link to="/sign-in" className="header__authorization">
              Войти
            </Link>
          }
        />
        <Route
          exact
          path="/"
          element={
            <>
              <div
                className={
                  mobileMenu
                    ? `header__block-signout-open`
                    : `header__block-signout`
                }
              >
                <p className="header__mail">{props.userEmail}</p>
                <button
                  to="/sign-in"
                  className="header__authorization header__authorization_signout"
                  onClick={props.signOut}
                >
                  Выйти
                </button>
              </div>
              <button onClick={handelClickMenu} className="header__button-icon">
                <i
                  className={
                    mobileMenu ? `header__icon-cross` : `header__icon-burget`
                  }
                ></i>
              </button>
            </>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
