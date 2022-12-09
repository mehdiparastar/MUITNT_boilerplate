/* eslint-disable react/no-unescaped-entities */
import { Box, Divider, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useFormik } from 'formik';
import { googleLoginService } from 'services/auth/google.login.service';
import { localLoginService } from 'services/auth/local.login.service';
import * as yup from 'yup';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { useTheme } from '@mui/material/styles';
import useAuth from '../../../../auth/hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from 'auth/hooks/useAxiosPrivate';
import { useEffect, useState } from 'react';

interface ILocalLoginDto {
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
  const axiosPrivate = useAxiosPrivate();
  const theme = useTheme();
  const themeMode = theme.palette.mode;
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const [loadProfile, setLoadProfile] = useState(false);

  const { accessTokenCtx, refreshTokenCtx, userCtx } = useAuth();

  const initialValues = {
    email: '',
    password: '',
  };

  useEffect(() => {
    const getProfile = async () => {
      const response = await axiosPrivate.get('auth/profile');
      userCtx.update(response.data);
      navigate(from, { replace: true });
      setLoadProfile(false);
    };
    if (loadProfile) {
      getProfile();
    }
    return;
  }, [loadProfile, axiosPrivate, from, navigate, userCtx]);

  const handleLogin = async ({ accessToken, refreshToken }: IAuthResponse) => {
    accessTokenCtx.update(accessToken);
    refreshTokenCtx.update(refreshToken);
    setLoadProfile(true);
  };

  const onLocalSubmit = async (values: ILocalLoginDto): Promise<any> => {
    const response = await localLoginService(values.email, values.password);
    await handleLogin(response.data);
  };

  const onGoogleSubmit = async (credentialResponse: CredentialResponse) => {
    const response = await googleLoginService(credentialResponse.credential);
    await handleLogin(response.data);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: onLocalSubmit,
  });

  return (
    <Grid container>
      <Grid marginBottom={4} width="100%" textAlign={'center'}>
        <Stack direction={'row'} justifyContent={'center'}>
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
            onSuccess={onGoogleSubmit}
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
          <Grid container spacing={4}>
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
            <Grid xs={12} marginTop={2} textAlign={'center'}>
              <Button
                size={'large'}
                variant={'contained'}
                type={'submit'}
                fullWidth
              >
                Login
              </Button>
            </Grid>
            <Grid xs={12} textAlign="center">
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
