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
import { useAppDispatch } from 'redux/hooks';
import { MUINavLink } from 'components/MUINavLink/MUINavLink';
import { PageLoader } from 'components/PageLoader/PageLoader';
import { useAuthLocalLoginMutation } from 'redux/features/WHOLE_APP/auth/authApiSlice';
import { useFormik } from 'formik';
import { strToBool } from 'helperFunctions/strToBool';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { setPersist } from '../../../../redux/features/WHOLE_APP/auth/authSlice';

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
  const from: string = (location.state?.from?.pathname === '/auth' ? '/' : location.state?.from?.pathname) || '/';
  const [authLocalLogin, { isLoading: localLoginIsLoading }] = useAuthLocalLoginMutation()

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

    persistCheck ? localStorage.setItem('persist', String(persistCheck)) : localStorage.setItem('persist', String(null))
    persistCheck ? localStorage.setItem('rT', String(refreshToken)) : localStorage.setItem('rT', String(null))
    dispatch(setPersist(persistCheck))
    navigate(from, { replace: true });
    enqueueSnackbar('successfully login', { variant: 'success' });
  };

  const onLocalSubmit = async (values: ILocalLoginDto): Promise<any> => {
    try {
      const response = await authLocalLogin({ email: values.email, password: values.password }).unwrap();
      await handleCompletingLoginFlow(response);
    }
    catch (ex) {
      const err = ex as { data: { msg: string } }
      enqueueSnackbar(`Login Failed! ${err.data?.msg || 'Unknown Error'}`, { variant: 'error' });
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: onLocalSubmit,
  });

  const googleLogin = async () => {
    try {
      window.open(`${process.env.REACT_APP_API_SERVER_URL}/auth/google-logins/${from.replaceAll('/', '@')}`, "_self");
      persistCheck ? localStorage.setItem('persist', String(persistCheck)) : localStorage.setItem('persist', String(null))
      dispatch(setPersist(persistCheck))
    } catch (ex) {
      console.log(ex)
    }
  }

  const togglePersist = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPersistCheck(event.target.checked);
  };

  let content;

  if (localLoginIsLoading) {
    content = <PageLoader />
  }
  else {
    content = <Grid container>
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
          onClick={googleLogin}
          fullWidth
          variant="outlined"
          size="large"
        >
          Login with Google
        </Button>
      </Grid>
    </Grid>
  }
  return content
};
