import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.val, isValid: action.val.includes('@')
    };
  }
  if (action.type === 'USER_BLUR') {
    return {
      value: state.value, isValid: state.value.includes('@')
    };
  }
  return {
    value: '',
    isValid: false
  };
}

const pwdReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.val, isValid: action.val.trim().length > 6
    }
  }
  if (action.type === 'USER_BLUR') {
    return {
      value: state.value, isValid: state.value.trim().length > 6
    }
  }
}
const Login = (props) => {
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null
  });

  const [pwdState, dispatchPWD] = useReducer(pwdReducer, {
    value: '',
    isValid: null
  })

  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    console.log('EFFECT RUNNING');

    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, []);

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log('Checking form validity!');
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //     );
  //   }, 500);

  //   return () => {
  //     console.log('CLEANUP');
  //     clearTimeout(identifier);
  //   };
  // }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value });

    setFormIsValid(
      emailState.isValid && pwdState.isValid
    );
  };

  const passwordChangeHandler = (event) => {

    dispatchPWD({ type: 'USER_INPUT', val: event.target.value })

    setFormIsValid(
      emailState.isValid && pwdState.isValid
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'USER_BLUR' });
  };

  const validatePasswordHandler = () => {
    dispatchPWD({
      type: 'USER_BLUR'
    })
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, pwdState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${pwdState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={pwdState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
