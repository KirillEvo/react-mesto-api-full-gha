import React, { Component } from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

class Card extends Component {

  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleLikeClick = this.handleLikeClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.state = {}
  }

  handleClick = () => {
    this.props.onCardClick(this.props.card);
  }
  handleLikeClick = () => {
    this.props.onCardLike(this.props.card);
  }
  handleDeleteClick = () => {
    this.props.onCardDelete(this.props.card);
  }

  static contextType = CurrentUserContext;

  render() {
    const isOwn = this.props.card.owner === this.context._id;
    const isLiked = this.props.card.likes.some(i => i === this.context._id);
    const cardLikeButtonClassName = (
      `element__heart ${isLiked && 'element__heart_black'}`
    );
    return (
      <>
        <article className="element">
          <img className="element__image" onClick={this.handleClick} src={this.props.card.link} alt={this.props.card.name} />
          {isOwn && <button onClick={this.handleDeleteClick} type="button" className='element__cart' />}
          {/* <button type="button" className="element__cart"></button> onClick={handleDeleteClick} */}
          <div className="element__body-card">
              <h2 className="element__text">{this.props.card.name}</h2>
              <div className="element__body-heart">
                <button onClick={this.handleLikeClick} type="button" className={cardLikeButtonClassName}></button>
                <p className="element__quantity-likes">{this.props.card.likes.length}</p>
              </div>
          </div>
        </article>
      </>
    );
  }
}

export default Card;
