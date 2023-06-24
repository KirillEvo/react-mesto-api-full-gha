import React, { Component } from "react";

class ImagePopup extends Component {
  render() {
    return (
      <div
        className={`popup popup_image ${
          !this.props.card ? "" : "popup_opened"
        }`}
        aria-label="Увеличенные фотографии"
      >
        <div className="popup__image-container">
          <button
            onClick={this.props.onClose}
            type="button"
            className="popup__close"
          ></button>
          <img
            className="popup__image"
            src={this.props.card?.link}
            alt={this.props.card?.name}
          />
          <p className="popup__image-text">{this.props.card?.name}</p>
        </div>
      </div>
    );
  }
}

export default ImagePopup;
