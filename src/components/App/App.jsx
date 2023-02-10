import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import PhoneBookList from 'components/PhoneBookList/PhoneBookList';
import PhoneBookFilter from 'components/PhoneBookFilter/PhoneBookFilter';
import PhoneBooksForm from 'components/PhoneBookForm/PhoneBookForm';

import {
  MainSection,
  FormBox,
  PhoneBookTitle,
  ContactsBox,
  ContactsTitle,
} from './App.styled';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('phone-book'));
    if (contacts?.length) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts.length !== contacts.length) {
      console.log('Update contacts');
      localStorage.setItem('phone-book', JSON.stringify(contacts));
    }
  }

  addContacts = ({ name, number }) => {
    if (this.isDuplicate(name, number)) {
      return Notify.failure(`'${name} is already exist'`);
    }

    this.setState(prevState => {
      const { contacts } = prevState;

      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      return { contacts: [newContact, ...contacts] };
    });
    return true;
  };

  removeContacts = id => {
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(item => item.id !== id);
      return { contacts: newContacts };
    });
  };

  getFilteredContacts() {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(({ name, number }) => {
      return (
        name.toLowerCase().includes(normalizedFilter) ||
        number.toLowerCase().includes(normalizedFilter)
      );
    });

    return result;
  }

  isDuplicate(name, number) {
    const normalizedName = name.toLowerCase();
    const normalizedNumber = number.toLowerCase();
    const { contacts } = this.state;
    const result = contacts.find(({ name, number }) => {
      return (
        name.toLowerCase() === normalizedName &&
        number.toLowerCase() === normalizedNumber
      );
    });

    return Boolean(result);
  }

  handleFilter = ({ target }) => {
    this.setState({ filter: target.value });
  };

  render() {
    const { addContacts, removeContacts, handleFilter } = this;
    const items = this.getFilteredContacts();
    const isContact = Boolean(items.length);

    return (
      <MainSection>
        <FormBox>
          <PhoneBookTitle>Phonebook</PhoneBookTitle>
          <PhoneBooksForm onSubmit={addContacts} />
        </FormBox>
        <ContactsBox>
          <ContactsTitle>Contacts</ContactsTitle>
          <PhoneBookFilter handleChange={handleFilter} />
          {isContact && (
            <PhoneBookList items={items} removeContacts={removeContacts} />
          )}
          {!isContact && <p>No contacts in list</p>}
        </ContactsBox>
      </MainSection>
    );
  }
}

export default App;
