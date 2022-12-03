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
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { googleLoginService } from 'services/auth/google.login.service';
import { localLoginService } from 'services/auth/local.login.service';
import * as yup from 'yup';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleLogin1 } from './GoogleLogin';
import NewWindow from 'react-new-window';
import { useTheme } from '@mui/material/styles';

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
  const theme = useTheme();
  const themeMode = theme.palette.mode;

  const initialValues = {
    email: '',
    password: '',
  };

  const onSubmit = async (values: ILoginDto): Promise<any> => {
    const response = await localLoginService(values.email, values.password);
    console.warn(response.data);
    return response;
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

  const [externalPopup, setExternalPopup] = useState<Window | null>(null);
  const googleRef = useRef<Window | null>(null);

  const connectClick = (e: any /*: React.MouseEvent<HTMLAnchorElement>*/) => {
    const w: number = 500;
    const h: number = 400;
    const left = window.screenX + (window.outerWidth - w) / 2;
    const top = window.screenY + (window.outerHeight - h) / 2.5;
    const title = `googleoauth2`;
    const url = `http://localhost:3001/auth/google-logins`;
    // const url = `http://localhost:3000`;
    googleRef.current = window.open(
      url,
      title,
      `width=${w},height=${h},left=${left},top=${top}`,
    );
    googleRef.current?.addEventListener('DOMContentLoaded', function () {
      console.log('location changed!');
    });
    setExternalPopup(googleRef.current);
  };

  useEffect(() => {

    // if (!googleRef.current) {
    //   return;
    // }

    // const timer = setInterval(() => {
    //   if (!googleRef.current) {
    //     timer && clearInterval(timer);
    //     return;
    //   }
    //   const currentUrl = googleRef.current.location.href;
    //   console.log(currentUrl);
    //   if (!currentUrl) {
    //     return;
    //   }
    // const searchParams = new URL(currentUrl).searchParams;
    // const code = searchParams.get('code');
    // if (code) {
    //   googleRef.current.close();
    //   console.log(`The popup URL has URL code param = ${code}`);
    // YourApi.endpoint(code)
    //   .then(() => {
    //     // change UI to show after the code was stored
    //   })
    //   .catch(() => {
    //     // API error
    //   })
    //   .finally(() => {
    //     // clear timer at the end
    //     setExternalPopup(null);
    //     timer && clearInterval(timer);
    //   });
    // }
    // }, 500);
  }, [googleRef.current]);

  return (
    <Link
      component={Button}
      onClick={connectClick}
      target="googleoauth2"
    >
      Connect
    </Link>
  );

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
        <Box
          width={'100%'}
          sx={{
            display: 'flex',
            marginY: 6,
            justifyContent: 'center',
          }}
        >
          <GoogleLogin
            type="standard"
            shape="rectangular"
            theme={themeMode === 'dark' ? 'filled_blue' : 'outline'}
            width="100%"
            size="large"
            context="signin"
            auto_select={false}
            useOneTap={false}
            ux_mode="popup"
            onSuccess={async (credentialResponse) => {
              const response = await googleLoginService(
                credentialResponse.credential,
              );
              console.log(response.data);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </Box>
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
