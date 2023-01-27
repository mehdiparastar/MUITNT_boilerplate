/* eslint-disable react/no-unescaped-entities */
import {
  Divider,
  Stack
} from '@mui/material';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { MUINavLink } from 'components/MUINavLink/MUINavLink';
import { PageLoader } from 'components/PageLoader/PageLoader';
import ProfilePicEditor from 'components/ProfilePicEditor/ProfilePicEditor';
import { ILocalRegisterDto, useAuthLocalRegisterMutation } from 'redux/features/WHOLE_APP/auth/authApiSlice';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';


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

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [authLocalRegister, { isLoading }] = useAuthLocalRegisterMutation()

  const { enqueueSnackbar } = useSnackbar();

  const initialValues = {
    email: '',
    password: '',
    name: ''
  };

  const handleCompletingRegisteringFlow = async ({
    accessToken,
    refreshToken,
  }: IAuthResponse) => {

    navigate(from, { replace: true });
    enqueueSnackbar('successfully registered.', { variant: 'success' });
  };

  const onLocalSubmit = async (values: ILocalRegisterDto): Promise<any> => {
    try {
      const response = await authLocalRegister(
        {
          email: values.email,
          password: values.password,
          name: values.name,
          photo: values.photo
        }).unwrap();
      await handleCompletingRegisteringFlow(response);
    }
    catch (ex) {
      const err = ex as { data: { msg: string } }
      enqueueSnackbar(`Registeration Failed! ${err.data?.msg || 'Unknown Error'}`, { variant: 'error' });
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: onLocalSubmit,
  });

  let content;

  if (isLoading) {
    content = <PageLoader />
  }
  else {
    content = <Grid container>
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
                autoComplete='email'
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
                autoComplete='current-password'
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
  }
  return content
};


