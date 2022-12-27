import { Box, Button, Stack, TextField } from '@mui/material';
import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectAllUsers, userAdded } from './usersSlice';

interface IAddUserFormProps {
}

export interface IAddUserFormDto {
    name: string;
}

const validationSchema = yup.object({
    name: yup
        .string()
        .required('Please specify your new title')
        .min(5, 'The new title should have at minimum length of 5'),
});

export function AddUserForm(props: IAddUserFormProps) {
    const initialValues: IAddUserFormDto = {
        name: '',
    };
    const users = useAppSelector(selectAllUsers)
    const dispatch = useAppDispatch()
    const { enqueueSnackbar } = useSnackbar()

    const onSubmit = async (values: IAddUserFormDto): Promise<any> => {
        try {
            dispatch(userAdded({
                name: formik.values.name,
            }))
            formik.resetForm()
        }
        catch (ex) {
            const err = ex as AxiosError<{ msg: string }>
            enqueueSnackbar(err.response?.data?.msg || 'Unknown Error', { variant: 'error' });
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
        onSubmit,
    });

    return (
        <Box component={'section'} >
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={2}>
                    <TextField
                        required
                        autoComplete='new-user-name'
                        label="User Title"
                        variant="outlined"
                        name={'name'}
                        type={'text'}
                        fullWidth
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.name && Boolean(formik.errors.name)
                        }
                        helperText={formik.touched.name && formik.errors.name}
                    />
                    <Button
                        size={'large'}
                        variant={'contained'}
                        type={'submit'}
                        fullWidth
                    >
                        <strong>Save New User</strong>
                    </Button>
                </Stack>
            </form>
        </Box>
    )
}
