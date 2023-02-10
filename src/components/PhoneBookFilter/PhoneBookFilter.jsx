import PropTypes from 'prop-types';

import {
  FilterBox,
  FilterLabel,
  PhoneBookInput,
} from './phone-book-filter.styled';

const PhoneBookFilter = ({ handleChange }) => {
  return (
    <FilterBox>
      <FilterLabel>Find contacts by name</FilterLabel>
      <PhoneBookInput name="filter" onChange={handleChange} />
    </FilterBox>
  );
};

export default PhoneBookFilter;

PhoneBookFilter.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
