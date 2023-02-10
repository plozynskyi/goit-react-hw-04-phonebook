import styled from '@emotion/styled';

const FilterBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 15px;
`;

const FilterLabel = styled.label``;

const PhoneBookInput = styled.input`
  width: 177px;
  margin-bottom: 15px;
  border-color: rgba(0, 0, 0, 0.5);
  border-width: 2px;
  :hover {
    border-color: rgba(0, 0, 255, 0.5);
  }
`;

export { FilterBox, FilterLabel, PhoneBookInput };
