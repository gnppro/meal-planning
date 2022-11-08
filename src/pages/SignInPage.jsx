/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/aria-role */
import React, { useRef } from 'react';
import {
  Stack, TextField, Button, Box, Checkbox, FormControlLabel,
} from '@mui/material';
import * as yup from 'yup';
import './styles/index.scss';
import { useFormik } from 'formik';
// import { useRef } from "react";
import { loginUser } from '../firebase/useAuth';

function Alert(props) {
  return (
    <div>{props.msg}</div>
  );
}

const schema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(7, 'Should be minimun 7 characters')
    .required('Password is required'),
});

function SignIn() {
  const msgRef = useRef('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: async ({ email, password }, formikHelpers) => {
      try {
        const currentUser = await loginUser(email, password);
        console.log(currentUser);
        msgRef.current = `Hola ${currentUser.user.displayName}`;
      } catch (error) {
        console.log(error);
      }
      formikHelpers.resetForm();
    },
  });

  return (
    <Stack sx={{
      height: '100vh', width: '100vw', justifyContent: 'center', alignItems: 'center',
    }}
    >
      <h2>Signin</h2>
      <form onSubmit={formik.handleSubmit} className="form__container login">
        <TextField
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && formik.errors.email}
          helperText={formik.touched.email && formik.errors.email}
          sx={{ width: '80%' }}
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && formik.errors.password}
          helperText={formik.touched.password && formik.errors.password}
          sx={{ width: '80%' }}
        />
        <Box>
          <FormControlLabel control={<Checkbox size="small" sx={{ padding: '3px', width: 'auto' }} />} label="Remember me" sx={{ fontSize: '13px' }} />
          <Button role="button-login" color="primary" variant="contained" type="submit">Login</Button>
        </Box>
        {msgRef.current && <Alert msg={msgRef.current} />}
      </form>
    </Stack>
  );
}

export default SignIn;
