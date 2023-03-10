import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Switch } from '@mui/material';
import { style } from '@mui/system';

import { useRef, useState } from 'react';
import { icons } from '../constans';
import { Form , InputId, TextArea} from './Todoform.styled';

export const TodoForm = ({ submitHandler, disabledIds, todo }) => {
  const nameRef  = useRef();
  const idRef = useRef();
  const [valueID, setID] = useState('');
  const [valueDescription, setDescription] = useState('')
  const [validated, setValidated] = useState(true);

  const applyId = (e) => {
    if (e.key === 'Enter' && e.target.value.trim() === '' || e.key === 'Enter' && disabledIds.includes(Number(e.target.value))) {
            Notify.warning('Please enter an unique article') 
    }
    if (e.key === 'Enter' && e.target.value > 0 &&
      !disabledIds.includes(Number(e.target.value))) {
              nameRef.current.focus();
    }
  };

  const applyDescription = (e) => {
    if (e.key === 'Enter') {
      idRef.current.focus();
    }
  }

  const applyName = (e) => {
    if (e.key === 'Enter' && nameRef.current.value.trim() === '') {
      Notify.warning('Please enter a title') 
    }
    if (e.key === 'Enter' && idRef.current.value.trim() === '') {
      Notify.warning('Please enter an article')
    }
    if (e.key === 'Enter' && nameRef.current.value.trim() !== '') {
      submitHandler({
        // id: valueID,
        description: valueDescription,
        id: idRef.current.value,
        name: nameRef.current.value,
      });
    }
  };

  const onBlurExamination = (e) => {
    const find = todo.find((t) => t.id === e.target.value);
    if (find) {
      Notify.failure('Article must be unique') 
      idRef.current.focus();
    } 
  }

  return (
    <Form>
      <div style={{ width: '200px' }}>
        <TextArea
          name="description"
          rows="3"
          maxlength="50"
          onChange={(e) => { setDescription(e.target.value) }}
          onKeyDown={applyDescription}
          value={valueDescription}
          autoFocus
        />
      </div>
      {/* <div style={{width: '50px'}}>
        <Switch defaultValue="checked" />
      </div>
      <div style={{width: '40px'}}>
        <span>xxxx-</span>
      </div> */}
      <div style={{width: '40px'}}>
        <InputId
          min="1"
          name="id"
          type="number"
          onChange={(e) => { setID(e.target.value) }}
          onKeyDown={applyId}
          onBlur={onBlurExamination}
          value={valueID}
          ref={idRef}
          
        />
      </div>
      <div style={{width: '115px'}}>
        {/* <img src={icons[0].url} alt="icon" style={{width:'15px'}} /> */}

        <InputId
          name="name"
          onKeyDown={applyName}
          ref={nameRef}
          style={{ width: 90 }} />
      </div>
      <div style={{width: '20px', height: '20px'}}></div>
    </Form>
  );
};