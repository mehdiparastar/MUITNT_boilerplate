import { AlertTitle, Button, Stack, TextField } from '@mui/material';
import { PageLoader } from 'components/PageLoader/PageLoader';
import ProfilePicEditor from 'components/ProfilePicEditor/ProfilePicEditor';
import { useGetCurrentUserQuery, useUpdateCurrentUserMutation } from 'redux/features/currentUser/currentUserApiSlice';
import { useFormik } from 'formik';
import { IEditCurrentUserDto } from 'models/currentUser.model';
import { useSnackbar } from 'notistack';
import * as yup from 'yup';

interface IEditUserProfileProps {
}

const validationSchema = yup.object({
    name: yup
        .string()
        .required('Please specify your name')
        .min(5, 'The Full Name should have at minimum length of 5'),
});

const EditUserProfile: React.FunctionComponent<IEditUserProfileProps> = (props) => {
    const { data: currentUser, isSuccess: isGetCurrentUserSuccess, isLoading: isGetCurrentUserLoading, isError: isGetCurrentUserError, error } = useGetCurrentUserQuery()
    const [updateCurrentUser, { isLoading: isUpdateCurrentUserLoading }] = useUpdateCurrentUserMutation()
    const { enqueueSnackbar } = useSnackbar()
    const loading = isGetCurrentUserLoading || isUpdateCurrentUserLoading

    const initialValues = {
        name: currentUser?.name || '',
        photo: currentUser?.photo || ''
    };

    const onLocalSubmit = async (values: IEditCurrentUserDto) => {
        try {
            await updateCurrentUser(values).unwrap()
        }
        catch (ex) {
            const err = ex as { data: { msg: string } }
            enqueueSnackbar(`Updating Failed! ${err.data?.msg || 'Unknown Error'}`, { variant: 'error' });
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
        onSubmit: onLocalSubmit,
    });

    let content = <h3>unknown status(bug)!!!</h3>

    if (loading) {
        content = <PageLoader />
    } else if (isGetCurrentUserSuccess) {
        content = <form onSubmit={formik.handleSubmit}>
            <Stack direction={'column'} spacing={2}>
                <AlertTitle><strong>☉</strong> You can only edit your <strong>profile picture</strong> and <strong>name</strong> here — <strong>try it!</strong></AlertTitle>
                <ProfilePicEditor formik={formik} />
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
                <Button
                    size={'large'}
                    variant={'contained'}
                    type={'submit'}
                    fullWidth
                >
                    <strong>Finalize Your Edit</strong>
                </Button>
            </Stack>
        </form>
    } else if (isGetCurrentUserError) {
        content =
            <>
                <p>{JSON.stringify(error)}</p>
            </>
    }

    return content
};

export default EditUserProfile;
