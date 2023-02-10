import { Component } from 'react';
import PropTypes from 'prop-types';

import initialState from './initialState';

import {
  PhoneBookForm,
  InputWrapper,
  FormInputTitle,
  PhoneBookInput,
  ContactAddBtn,
} from './phone-book-form.styled';

class PhoneBooksForm extends Component {
  state = { ...initialState };

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const result = onSubmit({ ...this.state });
    if (result) {
      this.reset();
    }
  };

  reset() {
    this.setState({ ...initialState });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { handleChange, handleSubmit } = this;
    const { name, number } = this.state;

    return (
      <PhoneBookForm action="" onSubmit={handleSubmit}>
        <InputWrapper>
          <FormInputTitle>Name</FormInputTitle>
          <PhoneBookInput
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </InputWrapper>
        <InputWrapper>
          <FormInputTitle>Number</FormInputTitle>
          <PhoneBookInput
            type="tel"
            name="number"
            value={number}
            onChange={handleChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </InputWrapper>
        <ContactAddBtn type="submit">Add contact</ContactAddBtn>
      </PhoneBookForm>
    );
  }
}

export default PhoneBooksForm;

PhoneBooksForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
