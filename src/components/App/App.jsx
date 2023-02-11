import { useState, useEffect } from 'react';
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

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const contacts = JSON.parse(localStorage.getItem('phone-contacts'));
    return contacts ? contacts : [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('phone-contacts', JSON.stringify(contacts));
  }, [contacts]);

  const isDuplicate = (name, number) => {
    const normalizedName = name.toLowerCase();
    const normalizedNumber = number.toLowerCase();
    const result = contacts.find(({ name, number }) => {
      return (
        name.toLowerCase() === normalizedName &&
        number.toLowerCase() === normalizedNumber
      );
    });

    return Boolean(result);
  };

  const addContacts = ({ name, number }) => {
    if (isDuplicate(name, number)) {
      Notify.failure(`'${name} is already exist'`);
      return false;
    }

    setContacts(prevContacts => {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      return [newContact, ...prevContacts];
    });
    return true;
  };

  const removeContacts = id =>
    setContacts(prevContacts => prevContacts.filter(item => item.id !== id));

  const handleFilter = ({ target }) => setFilter(target.value);

  const getFilteredContacts = () => {
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
  };

  const filteredContacts = getFilteredContacts();
  const isContacts = Boolean(filteredContacts.length);

  return (
    <MainSection>
      <FormBox>
        <PhoneBookTitle>Phonebook</PhoneBookTitle>
        <PhoneBooksForm onSubmit={addContacts} />
      </FormBox>
      <ContactsBox>
        <ContactsTitle>Contacts</ContactsTitle>
        <PhoneBookFilter handleChange={handleFilter} />
        {isContacts && (
          <PhoneBookList
            items={filteredContacts}
            removeContacts={removeContacts}
          />
        )}
        {!isContacts && <p>No contacts in list</p>}
      </ContactsBox>
    </MainSection>
  );
};

export default App;
