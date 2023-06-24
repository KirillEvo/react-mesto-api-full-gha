import React, { Component } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

class Main extends Component {
  static contextType = CurrentUserContext;

  render() {
    return (
      <main>
        <section className="profile">
          <div className="profile__info">
            <button
              onClick={this.props.onEditAvatar}
              className="profile__edit-avatar"
            >
              <img
                className="profile__image"
                src={this.context.avatar}
                alt="Аватар Место"
              />
            </button>
            <div className="profile__text">
              <h1 className="profile__title">{this.context.name}</h1>
              <button
                onClick={this.props.onEditProfile}
                type="button"
                className="profile__edit-button"
              ></button>
              <p className="profile__description">{this.context.about}</p>
            </div>
          </div>
          <button
            onClick={this.props.onAddPlace}
            type="button"
            className="profile__add-button"
          ></button>
        </section>
        <section className="elements" aria-label="Карточки с фотографиями">
          {this.props.cards.map((card) => (
            <Card
              onCardClick={this.props.onCardClick}
              card={card}
              key={card._id}
              onCardLike={this.props.onCardLike}
              onCardDelete={this.props.onCardDelete}
            />
          ))}
        </section>
      </main>
    );
  }
}
export default Main;
