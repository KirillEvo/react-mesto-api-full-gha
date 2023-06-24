import React, { Component } from 'react';

class PopupWithForm extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
        <div className={`popup popup_${this.props.name} ${!this.props.isOpen ? '' : 'popup_opened'}`} aria-label="Модальное окно">
            <div className="popup__container">
                <button onClick={this.props.onClose} type="button" className="popup__close"/>
                  <h2 className="popup__title">{this.props.title}</h2>
                  <form onSubmit={this.props.onSubmit} className="popup__form" name={this.props.name}>
                    {this.props.children}
                    <button className="popup__btn" type="submit">{this.props.buttonText}</button>
                  </form>
            </div>
          </div>
    );
  }
}

export default PopupWithForm;
