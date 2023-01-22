import { AlertTitle, Button, Card, CardMedia, Divider, Stack, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Item from 'components/Item/Item';
import { PageLoader } from 'components/PageLoader/PageLoader';
import { useAuthLogoutMutation } from 'redux/features/auth/authApiSlice';
import { useChangeCurrentUserPasswordMutation } from 'redux/features/currentUser/currentUserApiSlice';
import { useFormik } from 'formik';
import { IChangeCurrentUserPasswordDto } from 'models/currentUser.model';
import { useSnackbar } from 'notistack';
import PasswordSVG from 'svg/banners/Password/Password';
import * as yup from 'yup';

interface IChangePasswordProps {
}

const validationSchema = yup.object({
    password: yup
        .string()
        .required('Please specify your new password')
        .min(5, 'The new password should have at minimum length of 5'),
});


const ChangePassword: React.FunctionComponent<IChangePasswordProps> = (props) => {
    const [changeCurrentUserPassword, { isLoading }] = useChangeCurrentUserPasswordMutation()
    const [serverLogout] = useAuthLogoutMutation()
    const { enqueueSnackbar } = useSnackbar()

    const initialValues = {
        password: '',
    };

    const onLocalSubmit = async (values: IChangeCurrentUserPasswordDto): Promise<any> => {
        try {
            await changeCurrentUserPassword(values).unwrap()
            serverLogout()
        }
        catch (ex) {
            const err = ex as { data: { msg: string } }
            enqueueSnackbar(`Changing password Failed! ${err.data?.msg || 'Unknown Error'}`, { variant: 'error' });
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
        onSubmit: onLocalSubmit,
    });

    let content

    if (isLoading) {
        content = <PageLoader />
    } else {
        content = <Grid container>
            {isLoading && <PageLoader />}
            <Grid xs={0} sm={3}>
                <Item height={1} alignItems={'center'} p={2} justifyContent="center" display="flex">
                    <PasswordSVG width={'100%'} height={'100%'} />
                </Item>
            </Grid>
            <Grid xs={12} sm={9}>
                <Item>
                    <form onSubmit={formik.handleSubmit}>
                        <Stack direction={'column'} spacing={2} p={4}>
                            <AlertTitle sx={{ textAlign: 'left' }}><strong>☉</strong> Enter new password</AlertTitle>
                            <TextField
                                required
                                autoComplete='new-password'
                                label="New Password"
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
                            <Button
                                size={'large'}
                                variant={'contained'}
                                type={'submit'}
                                fullWidth
                            >
                                <strong>Save New Password</strong>
                            </Button>
                        </Stack>
                    </form>
                </Item>
            </Grid>
            <Grid xs={12}>
                <Divider />
            </Grid>
            <Grid xs={12}>
                <Item p={4}>
                    <Card>
                        <CardMedia
                            component="img"
                            height={'100%'}
                            image="/statics/images/security2.jpg"
                            alt="security"
                            loading='lazy'
                        />
                    </Card>
                </Item>
            </Grid>
        </Grid>
    }

    return content
};

export default ChangePassword;
