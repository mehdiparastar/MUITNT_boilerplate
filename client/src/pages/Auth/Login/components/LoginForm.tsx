/* eslint-disable react/no-unescaped-entities */
import GoogleIcon from '@mui/icons-material/Google';
import {
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Stack
} from '@mui/material';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { CredentialResponse, GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import axios from 'api/axios';
import { useAppDispatch } from 'apps/hooks';
import { MUINavLink } from 'components/MUINavLink/MUINavLink';
import { useGetUserProfileMutation, useLocalLoginMutation } from 'features/auth/authApiSlice';
import { useFormik } from 'formik';
import { strToBool } from 'helperFunctions/strToBool';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { googleLoginService } from 'services/auth/google.login.service';
import * as yup from 'yup';
import { setAuthTokens, setAuthUserProfile, setPersist } from '../../../../features/auth/authSlice';

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
  const [persistCheck, setPersistCheck] = useState<boolean>(strToBool(localStorage.getItem('persist')) || false)
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state?.from?.pathname === '/auth' ? '/' : location.state?.from?.pathname) || '/';

  const [localLogin, { isLoading: localLoginIsLoading }] = useLocalLoginMutation()
  const [getUserProfile, { isLoading: getUserProfileIsLoading }] = useGetUserProfileMutation()

  const dispatch = useAppDispatch()

  const { enqueueSnackbar } = useSnackbar();

  const initialValues = {
    email: '',
    password: '',
  };

  const handleCompletingLoginFlow = async ({
    accessToken,
    refreshToken,
  }: IAuthResponse) => {

    dispatch(setAuthTokens({ accessToken, refreshToken }))

    persistCheck ? localStorage.setItem('persist', String(persistCheck)) : localStorage.setItem('persist', String(null))
    persistCheck ? localStorage.setItem('rT', String(refreshToken)) : localStorage.setItem('rT', String(null))
    dispatch(setPersist(persistCheck))

    const response = await getUserProfile().unwrap();
    dispatch(setAuthUserProfile(response))

    navigate(from, { replace: true });
    enqueueSnackbar('successfully login', { variant: 'success' });
  };

  const onLocalSubmit = async (values: ILocalLoginDto): Promise<any> => {
    try {
      const response = await localLogin({ email: values.email, password: values.password }).unwrap();
      await handleCompletingLoginFlow(response);
    }
    catch (ex) {
      enqueueSnackbar('Login Failed! try again', { variant: 'error' });
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: onLocalSubmit,
  });

  const onGoogleSubmit = async (credentialResponse: CredentialResponse) => {
    const response = await googleLoginService(credentialResponse.credential);
    await handleCompletingLoginFlow(response.data);
  };

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (tokenResponse) => {
      const res = await axios.post('auth/google/login-custom-btn', {
        code: tokenResponse.code,
      });
      await handleCompletingLoginFlow(res.data);
    },
    onError: (err) => {
      console.error(err)
      enqueueSnackbar('Login Failed! try again', { variant: 'error' });
    },
  });

  const togglePersist = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPersistCheck(event.target.checked);
  };

  return (
    <Grid container>
      <Grid xs={12}>
        <Stack direction={'row'} justifyContent={'center'}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Welcome back to
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700 }} color="secondary">
            &nbsp; MUITNT
          </Typography>
        </Stack>
      </Grid>
      <Grid xs={12}>
        <Divider variant="fullWidth" sx={{ mb: 4 }} />
      </Grid>
      <Grid xs={12}>
        <FormGroup sx={{ mb: 4 }}>
          <FormControlLabel
            control={
              <Checkbox
                onChange={togglePersist}
                checked={persistCheck}
              />
            }
            label="Trust This Device"
          />
        </FormGroup>
      </Grid>
      <Grid xs={12}>
        <Divider variant="fullWidth" sx={{ mb: 4 }} />
      </Grid>
      <Grid xs={12}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={4}>
            <Grid xs={12}>
              <TextField
                required
                autoComplete='email'
                label="Email"
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
                required
                autoComplete='current-password'
                label="Password"
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
            <Grid xs={12} textAlign={'center'}>
              <Button
                size={'large'}
                variant={'contained'}
                type={'submit'}
                fullWidth
              >
                Local Login
              </Button>
            </Grid>
          </Grid>
          <Grid xs={12} textAlign="left">
            <Typography variant={'subtitle2'}>
              Don't have an account yet?{' '}
              <Link
                component={MUINavLink}
                to={'/register'}
                underline={'none'}
                color={'primary'}
              >
                Register here
              </Link>
            </Typography>
          </Grid>
        </form>
      </Grid>
      {
        2 > 3 &&
        <>
          <Grid xs={12}>
            <Stack
              direction={'row'}
              sx={{ width: '100%', my: 3 }}
              alignItems="center"
              justifyContent={'center'}
            >
              <Divider sx={{ width: '45%' }} />
              <Typography paddingX={2}>or</Typography>
              <Divider sx={{ width: '45%' }} />
            </Stack>
          </Grid>
          <Grid xs={12}>
            <Button
              color="secondary"
              startIcon={<GoogleIcon />}
              onClick={() => googleLogin()}
              fullWidth
              variant="outlined"
              size="large"
            >
              Login with Google
            </Button>
          </Grid>
          <Grid xs={12} justifyContent={'center'} display="flex" mt={1}>
            <GoogleLogin
              type="standard"
              shape="rectangular"
              // theme={themeMode === 'dark' ? 'filled_blue' : 'outline'}
              width="100%"
              size="large"
              context="signin"
              auto_select={false}
              useOneTap={false}
              ux_mode="popup"
              onSuccess={onGoogleSubmit}
              onError={() => {
                console.log('Login Failed');
                enqueueSnackbar('Login Failed! try again', { variant: 'error' });
              }}
            />
          </Grid>
        </>
      }
    </Grid>
  );
};
