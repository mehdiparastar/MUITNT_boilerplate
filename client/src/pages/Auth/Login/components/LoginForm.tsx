/* eslint-disable react/no-unescaped-entities */
import GoogleIcon from '@mui/icons-material/Google';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
} from '@mui/material';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { googleLoginService } from 'services/auth/google.login.service';
import { localLoginService } from 'services/auth/local.login.service';
import * as yup from 'yup';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

interface ILoginDto {
  email: string;
  password: string;
}

const validationSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email is required.'),
  password: yup
    .string()
    .required('Please specify your password')
    .min(5, 'The password should have at minimum length of 5'),
});

export const LoginForm = () => {
  const [showGLogin, setShowGLogin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const initialValues = {
    email: '',
    password: '',
  };

  const onSubmit = async (values: ILoginDto): Promise<any> => {
    const response = await localLoginService(values.email, values.password);
    console.warn(response.data);
    return response;
  };

  const handleGoogleLogin = async () => {
    // const response = await googleLoginService();
    console.warn(location);
    // return response;
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

  // const google =
  //   "<iframe width='100%' height='100%' scrolling='no' src='http://localhost:3001/auth/google-logins' sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'></iframe>";


  return (
    <Grid container>
      <Grid
        marginBottom={4}
        width="100%"
        textAlign={'center'}
      >
        <Stack
          direction={'row'}
          justifyContent={'center'}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
            }}
          >
            Welcome back to
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
            }}
            color="secondary"
          >
            &nbsp; MUITNT
          </Typography>
        </Stack>
        <Typography color="text.secondary">
          Login to manage your account.
        </Typography>
        <Box width={'100%'}
          sx={{
            marginY: 6, '& iframe .qJTHM div ': {
              backgroundColor: 'red'
            }
          }}
        >
          <GoogleLogin
            type='standard'
            shape='circle'
            theme='filled_blue'
            width='100%'
            size='large'
            // component={GoogleLogin}
            onSuccess={async credentialResponse => {
              const response = await googleLoginService(credentialResponse.credential);
              console.log(response.data);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </Box>
        {/* <Button
          size={'large'}
          variant={'outlined'}
          startIcon={<GoogleIcon />}
          fullWidth
          sx={{ marginY: 6 }}
          onClick={handleGoogleLogin}
        >
          Login with Google
        </Button> */}
        <Stack
          direction={'row'}
          sx={{ width: '100%' }}
          alignItems="center"
          justifyContent={'center'}
        >
          <Divider sx={{ width: '40%' }} />
          <Typography paddingX={2}>or</Typography>
          <Divider sx={{ width: '40%' }} />
        </Stack>
      </Grid>
      <Grid marginTop={6}>
        <form onSubmit={formik.handleSubmit}>
          <Grid
            container
            spacing={4}
          >
            <Grid xs={12}>
              <TextField
                label="Email *"
                variant="outlined"
                name={'email'}
                fullWidth
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                label="Password *"
                variant="outlined"
                name={'password'}
                type={'password'}
                fullWidth
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <Typography variant={'subtitle2'}>
                <Link
                  component={'a'}
                  color={'primary'}
                  href={'/page-forgot-password'}
                  underline={'none'}
                >
                  Forgot your password?
                </Link>
              </Typography>
            </Grid>
            <Grid
              xs={12}
              marginTop={2}
              textAlign={'center'}
            >
              <Button
                size={'large'}
                variant={'contained'}
                type={'submit'}
                fullWidth
              >
                Login
              </Button>
            </Grid>
            <Grid
              xs={12}
              textAlign="center"
            >
              <Typography variant={'subtitle2'}>
                Don't have an account yet?{' '}
                <Link
                  component={'a'}
                  color={'primary'}
                  href={'/page-signup'}
                  underline={'none'}
                >
                  Sign up here.
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};
