import styled from '@emotion/styled';

export const List = styled.ul`
  list-style: none;
  margin: 0;
  li:first-of-type {
    display: flex;
    width: 100%;
    justify-content: space-between;
    // border-bottom: 1px solid #000;
    padding-bottom: 5px;
    margin-bottom: 20px;
  }
  img {
    width: 12px;
  }
`;

export const TodoItem = styled.li`
  display: flex;
  width: 100%;
  justify-content: space-between;
  position: relative;
  margin-bottom: 10px;
  ::before {
    position: absolute;
    content: '';
    width: 10px;
    height: 100%;
    background-color: #515151;
    opacity: ${({ isSelected }) => (isSelected ? 1 : 0)};
    cursor: pointer;
  }
  :hover {
    background-color: #cacaca;
    ::before {
      opacity: 1;
    }
  }
  > div {
    width: 100px;
  }
  background-color: ${({ isSelected }) =>
    isSelected ? 'rgba(81, 81, 81, 0.7)' : 'white'};
`;

export const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

`;

export const DeleteButton = styled.button`
width: 20px;
height: 20px;
font-weight: 300;
font-size: 18px;
color: #000000;
background-color: transparent;
border: none;

:hover{
  transform: scale(1.5)
}
`;

export const FormButton = styled.button`
border-radius: 30%;
background-color: transparent;
border: 1.2px solid rgba(0, 0, 0, 0.65);
text-align: center;
font-size: 15px;


:hover{
  transform: scale(1.2);
}
`;