import { Switch } from '@mui/material';
import { style } from '@mui/system';
import { useRef, useState } from 'react';
import { icons } from '../constans';
import { Form } from './Todoform.styled';

export const TodoForm = ({ submitHandler, disabledIds }) => {
  const nameRef = useRef();
  const [valueID, setID] = useState('');
  const [validated, setValidated] = useState(true);

  const applyId = (e) => {
    if (
      e.target.value < 1000 &&
      !disabledIds.includes(Number(e.target.value))
    )
      setID(e.target.value);

    // if (e.target.value < 1000) setID(e.target.value);

    // if (disabledIds.includes(Number(e.target.value))) {
    //   setValidated(false);
    // } else {
    //   setValidated(true);
    // }
  };

  const applyName = (e) => {
    if (e.key === 'Enter') {
      submitHandler({
        id: valueID,
        name: nameRef.current.value,
        sku: 'xxx-',
      });
    }
  };

  return (
    <Form>
      <div>
        <Switch defaultValue="checked" />
      </div>
      <div>
        <span>xxxx-</span>
      </div>
      <div>
        <input
          name="id"
          type="number"
          onChange={applyId}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              nameRef.current.focus();
            }
          }}
          value={valueID}
          autoFocus
        />
      </div>
      <div>
        <img src={icons[0].url} alt="icon" />

        <input name="name" onKeyDown={applyName} ref={nameRef} />
      </div>
    </Form>
  );
};