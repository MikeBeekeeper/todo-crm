import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { data } from './mock';
import {
  Button,
  Stack,
  Switch,
  Autocomplete,
  TextField,
} from '@mui/material';
// import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useState } from 'react';
import { List, TodoItem, ControlsContainer, DeleteButton, FormButton } from './TodoList.styled';
import { TodoForm } from '../TodoForm';
import { icons } from '../constans';

export const TodoList = () => {
  const [todo, setTodo] = useState(data);
  const [filter, setFilter] = useState();
  const [isFormVisible, setFormVisible] = useState(false);

  const getIconUrl = (id) => {
    const foundIcon = icons.find((icon) => icon.id === id);
    return foundIcon ? foundIcon.url : null;
  };

  const showNewForm = (e) => {
    setFormVisible(!isFormVisible);
  };

  const addTodo = (todoItem) => {
    setTodo((todo) => {
      const find = todo.find((t) => t.id === todoItem.id)
      
      if (!find) {
        setFormVisible(!isFormVisible);
        return [todoItem, ...todo];
      }
      Notify.failure('whoops')
      return todo;
    });
    

    
  };

  const selectItem = (id) => {
    setTodo((todo) => {
      return todo.map((item) => {
        const newItem = { ...item };

        if (item.id === id) {
          newItem.isSelected = !newItem.isSelected;
        }

        return newItem;
      });
    });
  };

  const isDeleteVisible = () => todo.find((el) => el.isSelected);

  const ToDo = () => {
    const todolist = filter
      ? todo.filter((element) => element.name.includes(filter.name))
      : todo;

    return todolist.map((item) => {
      return (
        <TodoItem
          key={item.id}
          onClick={() => {
            selectItem(item.id);
          }}
          isSelected={item.isSelected}
        >
          <div style={{ paddingLeft: 15, width: 200 }}>{item.description}</div>
              {/* <div style={{ paddingLeft: 15, width: 50 }}>
            <Switch defaultValue="checked" />
          </div>
          <div style={{width: 40}}>
            <span>{item.sku}</span>
          </div> */}
          <div style={{width: 40}}>
            <span>{item.id}</span>
          </div>
          <div
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: 115
            }}
          >
            {getIconUrl(item.iconID) && (
              <img src={getIconUrl(item.iconID)} alt={item.name} />
            )}

            <span style={{ whiteSpace: 'nowrap' }}>{item.name}</span>
          </div>
          <DeleteButton
            onClick={() => {
              setTodo((todo) =>
                todo.filter(({ id }) => item.id !== id)
              );
            }}
          >
            x
          </DeleteButton>
        </TodoItem>
      );
    });
  };

  return (
    <Stack alignItems="center" sx={{ mt: 5 }}>
      <div style={{ width: 700, height: 500 }}>
        <List>
          <li style={{ height: '73px', borderBottom: '1px solid black' }}>
            <div style={{paddingLeft: '15px',width: '200px'}}>Description<span style={{fontSize: 12}}> (optional)</span></div>
            {/* <span style={{ paddingLeft: '15px', width: '50px' }}>Статус</span>
            <span style={{width: '40px'}}>Товар</span> */}
            <span style={{width: '40px'}}>Article</span>

            <div style={{width: '115px'}}>
              <span>Title</span>
              <Autocomplete
                sx={{ width: '100%' }}                
                options={todo}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" />
                )}
                onChange={(event, newInputValue) => {
                  setFilter(newInputValue);
                }}
              />
            </div>

            <ControlsContainer>
              <FormButton
                onClick={showNewForm}
                // variant="text"
                // size="small"
                // color="inherit"
                
              >
              +
              </FormButton>

              {isDeleteVisible() && (
                <FormButton
                //   variant="contained"
                //   size="small"
                  onClick={() => {
                    setTodo((todo) =>
                      todo.filter((item) => !item.isSelected)
                    );
                  }}
                >
                  x
                </FormButton>
              )}
            </ControlsContainer>
          </li>

          {isFormVisible && (
            <li>
              <TodoForm
                todo={todo}
                submitHandler={addTodo}
                disabledIds={todo.map((item) => item.id)}
              />
            </li>
          )}
          <ToDo />
        </List>
      </div>
    </Stack>
  );
};


{/* <Button
                onClick={showNewForm}
                variant="text"
                size="small"
                color="inherit"
                
              >
              +
              </Button>

              {isDeleteVisible() && (
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => {
                    setTodo((todo) =>
                      todo.filter((item) => !item.isSelected)
                    );
                  }}
                >
                  x
                </Button> */}