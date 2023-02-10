import PropTypes from 'prop-types';

import { ContactsList, ContactItem, RemoveBtn } from './phone-book-list.styled';

const PhoneBookList = ({ removeContacts, items }) => {
  const contacts = items.map(({ id, name, number }) => (
    <ContactItem key={id}>
      {name}: {number}
      <RemoveBtn onClick={() => removeContacts(id)} type="button">
        Delete
      </RemoveBtn>
    </ContactItem>
  ));

  return <ContactsList>{contacts}</ContactsList>;
};

export default PhoneBookList;

PhoneBookList.defaultProps = {
  items: [],
};

PhoneBookList.propTypes = {
  removeContacts: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
