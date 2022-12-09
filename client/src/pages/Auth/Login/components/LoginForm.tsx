/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Stack,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useFormik } from 'formik';
import { localLoginService } from 'services/auth/local.login.service';
import * as yup from 'yup';
import { useGoogleLogin } from '@react-oauth/google';
import { useTheme } from '@mui/material/styles';
import useAuth from '../../../../auth/hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from 'auth/hooks/useAxiosPrivate';
import { useEffect, useState } from 'react';
import axios from 'api/axios';

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
  const { accessTokenCtx, refreshTokenCtx, userCtx, persistCtx } = useAuth();

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

  const handleCompletingLoginFlow = async ({
    accessToken,
    refreshToken,
  }: IAuthResponse) => {
    accessTokenCtx.update(accessToken);
    refreshTokenCtx.update(refreshToken);
    setLoadProfile(true);
  };

  const onLocalSubmit = async (values: ILocalLoginDto): Promise<any> => {
    const response = await localLoginService(values.email, values.password);
    await handleCompletingLoginFlow(response.data);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: onLocalSubmit,
  });

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const res = await axios.post('auth/google/login-custom-btn', {
        code: tokenResponse.code,
      });
      await handleCompletingLoginFlow(res.data);
    },
    onError: (err) => console.error(err),
    flow: 'auth-code',
  });

  const togglePersist = () => {
    persistCtx.update(!persistCtx.value);
  };

  useEffect(() => {}, [persistCtx.value]);

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
              <Checkbox onChange={togglePersist} checked={persistCtx.value} />
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
                focused
                required
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
                focused
                required
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
                component={'a'}
                color={'primary'}
                href={'/page-signup'}
                underline={'none'}
              >
                Sign up here.
              </Link>
            </Typography>
          </Grid>
        </form>
      </Grid>
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
    </Grid>
  );
};
