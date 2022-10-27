/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/aria-role */
import React, { useRef } from 'react';
import {
  Stack, TextField, Button, Box, Checkbox, FormControlLabel,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import './styles/index.scss';
import { register } from '../firebase/useAuth';

function Alert(props) {
  return (
    <div>{props.msg}</div>
  );
}

const schema = yup.object({
  email: yup
    .string('Enter you email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(7, 'Should be minimum 7 characters')
    .required('The password is required'),
});

function SignIp() {
  const msgRef = useRef('');
  // const [user, setUser] = React.useState('');
  // const [msg, setMsg] = React.useState('');

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: async ({ name, email, password }, formikHelpers) => {
      const nameWithoutSpaces = name.trim();
      try {
        await register(nameWithoutSpaces, email, password);
        msgRef.current = 'Registrado';
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          msgRef.current = 'Email already in use';
        }
      }
      formikHelpers.resetForm();
    },
  });

  return (
    <Stack sx={{
      height: '100vh', width: '100vw', justifyContent: 'center', alignItems: 'center',
    }}
    >
      <h2>Register</h2>
      <form onSubmit={formik.handleSubmit} className="form__container register">
        <TextField
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.password && formik.errors.name}
          sx={{ width: '80%' }}
        />
        <TextField
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.password && formik.errors.email}
          sx={{ width: '80%' }}
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          sx={{ width: '80%' }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <FormControlLabel control={<Checkbox defaultChecked size="small" sx={{ padding: '3px', width: 'auto' }} />} label="Remember me" sx={{ fontSize: '13px' }} />
          <Button role="button-register" color="primary" variant="contained" type="submit">SigUp</Button>
        </Box>
        {msgRef.current && <Alert msg={msgRef.current} />}
      </form>
    </Stack>
  );
}

export default SignIp;
