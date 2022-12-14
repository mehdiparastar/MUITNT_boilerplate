/* eslint-disable react/no-unescaped-entities */
import {
  Divider,
  Stack,
} from '@mui/material';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useAuth from '../../../../auth/hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'api/axios';
import { assess } from 'helperFunctions/componentAssess';
import { useSnackbar } from 'notistack';
import { MUINavLink } from 'components/MUINavLink/MUINavLink';
import ProfilePicEditor from 'components/ProfilePicEditor/ProfilePicEditor';
import { localRegisterService } from 'services/auth/local.signup.service';
import { AxiosError } from 'axios';


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
  name: yup
    .string()
    .required('Please specify your name')
    .min(5, 'The Full Name should have at minimum length of 5'),
});

export const RegisterForm = () => {
  assess && console.log('assess')
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const { accessTokenCtx, refreshTokenCtx, userCtx } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const initialValues = {
    email: '',
    password: '',
    name: ''
  };

  const handleCompletingLoginFlow = async ({
    accessToken,
    refreshToken,
  }: IAuthResponse) => {
    accessTokenCtx.update(accessToken);
    refreshTokenCtx.update(refreshToken);
    const response = await axios.get('auth/profile', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    userCtx.update(response.data);
    // navigate('/auth', { replace: true });
    navigate(from, { replace: true });
    enqueueSnackbar('successfully login', { variant: 'success' });
  };

  const onLocalSubmit = async (values: ILocalRegisterDto): Promise<any> => {
    try {
      const response = await localRegisterService(values);
      await handleCompletingLoginFlow(response.data);
    }
    catch (ex) {
      const err = ex as AxiosError<{ msg: string }>
      enqueueSnackbar(err.response?.data?.msg || 'Unknown Error', { variant: 'error' });
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: onLocalSubmit,
  });

  return (
    <Grid container>
      <Grid xs={12} mb={4}>
        <Stack direction={'row'} justifyContent={'center'}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Welcome to
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700 }} color="secondary">
            &nbsp; MUITNT
          </Typography>
        </Stack>
      </Grid>
      <Grid xs={12}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={4}>
            <Grid xs={12}>
              <ProfilePicEditor formik={formik} />
            </Grid>
            <Grid xs={12}><Divider /></Grid>
            <Grid xs={12} sm={6}>
              <TextField
                required
                label="Email"
                variant="outlined"
                name={'email'}
                fullWidth
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <TextField
                required
                label="Password"
                variant="outlined"
                name={'password'}
                type={'password'}
                fullWidth
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                required
                label="Full Name"
                variant="outlined"
                name={'name'}
                fullWidth
                value={formik.values.name}
                onChange={formik.handleChange}
                error={
                  formik.touched.name && Boolean(formik.errors.name)
                }
                onBlur={formik.handleBlur}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid xs={12} textAlign={'center'}>
              <Button
                size={'large'}
                variant={'contained'}
                type={'submit'}
                fullWidth
              >
                Local Register
              </Button>
            </Grid>
          </Grid>
          <Grid xs={12} textAlign="left">
            <Typography variant={'subtitle2'}>
              Do you have an account?{' '}
              <Link
                component={MUINavLink}
                to={'/auth'}
                underline={'none'}
                color={'primary'}
              >
                Login here
              </Link>
            </Typography>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};
