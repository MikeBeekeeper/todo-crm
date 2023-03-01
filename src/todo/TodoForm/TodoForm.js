import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Switch } from '@mui/material';
import { style } from '@mui/system';

import { useRef, useState } from 'react';
import { icons } from '../constans';
import { Form , InputId} from './Todoform.styled';

export const TodoForm = ({ submitHandler, disabledIds, todo }) => {
  const nameRef = useRef();
  const [valueID, setID] = useState('');
  const [validated, setValidated] = useState(true);

  const applyId = (e) => {
    if (e.key === 'Enter' && e.target.value < 1000 &&
      !disabledIds.includes(Number(e.target.value))) {
              nameRef.current.focus();
            }
  };

  const applyName = (e) => {
    if (e.key === 'Enter') {
      submitHandler({
        id: valueID,
        name: nameRef.current.value,
        sku: 'xxxx-',
      });
    }
  };

  const onBlurExamination = (e) => {
    const find = todo.find((t) => t.id === e.target.value);
    if (find) {
       Notify.failure('Whoops') 
    } 
  }

  return (
    <Form>
      <div style={{width: '50px'}}>
        <Switch defaultValue="checked" />
      </div>
      <div style={{width: '40px'}}>
        <span>xxxx-</span>
      </div>
      <div style={{width: '40px'}}>
        <InputId
          name="id"
          type="number"
          onChange={(e) => { setID(e.target.value) }}
          onKeyDown={applyId}
          onBlur={onBlurExamination}
          value={valueID}
          autoFocus
        />
      </div>
      <div style={{width: '115px'}}>
        {/* <img src={icons[0].url} alt="icon" style={{width:'15px'}} /> */}

        <InputId name="name" onKeyDown={applyName} ref={nameRef} style={{width: 90}}/>
      </div>
      <div style={{width: '20px', height: '20px'}}></div>
    </Form>
  );
};