import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import Api from "../utils/api";

import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";

import Register from "./Register";
import Login from "./Login";

import { Route, Routes, useNavigate, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import AuthApi from "../utils/AuthApi";
import InfoTooltip from "./InfoTooltip";

function App() {
  const navigate = useNavigate();

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isDeleteCardPopup, setDeleteCardPopup] = useState(false);
  const [selectedCard, setselectedCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSuccessPopupOpen, setSuccessPopupOpen] = useState(false)

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([Api.getUserInfo(), Api.getCard()])
      .then((values) => {
        const [userData, cardsData] = values;
        setCurrentUser(userData);
        setCards(cardsData.reverse());
      })
      .catch((err) => {
        console.log(`${err}`);
      });
    }
  }, [loggedIn]);

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setselectedCard(null);
    setSuccessPopupOpen(false);
  }

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isSuccessPopupOpen ||
    selectedCard;

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }

    function closeByVisibility(evt) {
      if (
        evt.target.classList.contains("popup_opened") ||
        evt.target.classList.contains("popup__close")
      ) {
        closeAllPopups();
      }
    }

    if (isOpen) {
      // навешиваем только при открытии
      document.addEventListener("keydown", closeByEscape);
      document.addEventListener("click", closeByVisibility);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
        document.removeEventListener("click", closeByVisibility);
      };
    }
  }, [isOpen]);

  function userRegistration(data) {
    AuthApi.register(data.email, data.password)
      .then((data) => {
        setSuccess(true);
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        setSuccess(false);
        console.log(`${err}`);
      }).finally(()=> setSuccessPopupOpen(true));
  }

  function userLogin(dataUser) {
    AuthApi.login(dataUser.email, dataUser.password)
      .then((data) => {
        if (data) {
          // const token = localStorage.setItem("jwt", data._id);
          console.log(data);
          setUserEmail(dataUser.email);
          setLoggedIn(true);
          // localStorage.setItem("jwt", data._id);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        setSuccess(false);
        setSuccessPopupOpen(true);
        console.log(`${err}`);
      });
  }

  function signOut(){
    // localStorage.removeItem('jwt');
    AuthApi.signOut()
    .then(() => {
      setLoggedIn(false);
      setUserEmail('');
      navigate("/sign-in", { replace: false });
    })
    .catch((err) => console.log(err));
  }

 function handleTokenCheck() {
    AuthApi.token()
    .then((user) => {
      setUserEmail(user.email)
      setLoggedIn(true);
      navigate("/", {replace: true});
    })
    .catch((err) => console.log(err));
  }

  useEffect(() => {
    handleTokenCheck();
  }, // eslint-disable-next-line
  []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    if (!isLiked) {
      Api.setLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(`${err}`);
        });
    } else {
      Api.deleteLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(`${err}`);
        });
    }
  }

  function handleCardDelete(card) {
    Api.setDeleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => setIsLoading(false));
    setIsLoading(true);
  }

  function handleUpdateUser(data) {
    Api.setUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => setIsLoading(false));
    setIsLoading(true);
  }

  function handleUpdateAvatar(data) {
    console.log(data);
    Api.setUserAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => setIsLoading(false));
    setIsLoading(true);
  }

  function handleAddPlaceSubmit(data) {
    Api.setNewCard(data)
      .then((res) => {
        setCards((cards) => [res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => setIsLoading(false));
    setIsLoading(true);
  }

  function handleCardClick(card) {
    setselectedCard(card);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleDeleteCardPopup() {
    setDeleteCardPopup(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header signOut={signOut} userEmail={userEmail} />
      <Routes>
      <Route path="*" element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="sign-in" replace />} />
        <Route
          exact
          path="/"
          element={
            <ProtectedRoute
            element={Main}
              onCardClick={handleCardClick}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              loggedIn={loggedIn}
            />
          }
        ></Route>
        <Route path="/sign-in" element={<Login onLogin={userLogin} />}></Route>
        <Route
          path="/sign-up"
          element={<Register onRegister={userRegistration} />}
        ></Route>
      </Routes>
      {loggedIn && <Footer/>}
      <EditProfilePopup
        isLoading={isLoading}
        onUpdateUser={handleUpdateUser}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      />
      <EditAvatarPopup
        isLoading={isLoading}
        onUpdateAvatar={handleUpdateAvatar}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      />
      <AddPlacePopup
        isLoading={isLoading}
        onAddPlacePopup={handleAddPlaceSubmit}
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      />
      <DeleteCardPopup
        isLoading={isLoading}
        onDeleteCardPopup={handleDeleteCardPopup}
        isOpen={isDeleteCardPopup}
        onClose={closeAllPopups}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <InfoTooltip
        name={"success"}
        isOpen={isSuccessPopupOpen}
        isSuccess={success}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
