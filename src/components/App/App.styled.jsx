import styled from '@emotion/styled';

const MainSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 400px;
`;
const FormBox = styled.div`
  margin-bottom: 15px;
`;
const PhoneBookTitle = styled.h1`
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 15px;
`;
const ContactsBox = styled.div`
  margin-bottom: 15px;
`;
const ContactsTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 15px;
`;
const FilterBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 15px;
`;

export {
  MainSection,
  FormBox,
  PhoneBookTitle,
  ContactsBox,
  ContactsTitle,
  FilterBox,
};
