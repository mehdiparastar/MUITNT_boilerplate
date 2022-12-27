import { Box, Button, Stack, TextField } from '@mui/material';
import { AxiosError, AxiosResponse } from 'axios';
import { MUIAsyncAutocomplete } from 'components/MUIAsyncAutocomplete/MUIAsyncAutocomplete';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { IUsersState, selectAllUsers } from '../users/usersSlice';
import { postAdded } from './postsSlice';

interface IAddPostFormProps {
}

export interface IAddPostFormDto {
    title: string;
    content: string;
    user: IUsersState | null;
}

const validationSchema = yup.object<Shape<IAddPostFormDto>>({
    title: yup
        .string()
        .required('Please specify your new title')
        .min(5, 'The new title should have at minimum length of 5'),
    content: yup
        .string()
        .required('Please specify your new content')
        .min(5, 'The new content should have at minimum length of 5'),
    user: yup
        .object()
        .required('Please specify your new user')
});

export function AddPostForm(props: IAddPostFormProps) {
    const initialValues: IAddPostFormDto = {
        title: '',
        content: '',
        user: null
    };
    const users = useAppSelector(selectAllUsers)
    const dispatch = useAppDispatch()
    const { enqueueSnackbar } = useSnackbar()

    const onSubmit = async (values: IAddPostFormDto): Promise<any> => {
        try {
            dispatch(postAdded({
                title: formik.values.title,
                content: formik.values.content,
                user: formik.values.user
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

    const hangleGetUsersList = async () => {
        return Promise.resolve({ data: users } as AxiosResponse<IUsersState[]>)
    }

    return (
        <Box component={'section'} >
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={2}>
                    <TextField
                        required
                        autoComplete='new-post-title'
                        label="Post Title"
                        variant="outlined"
                        name={'title'}
                        type={'text'}
                        fullWidth
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.title && Boolean(formik.errors.title)
                        }
                        helperText={formik.touched.title && formik.errors.title}
                    />
                    <TextField
                        required
                        autoComplete='new-post-content'
                        label="Post Content"
                        variant="outlined"
                        name={'content'}
                        type={'text'}
                        fullWidth
                        value={formik.values.content}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.content && Boolean(formik.errors.content)
                        }
                        helperText={formik.touched.content && formik.errors.content}
                    />
                    <MUIAsyncAutocomplete
                        ac_sx={{ width: '100%' }}
                        titleField={'name'}
                        label='Users List'
                        getOptions={hangleGetUsersList}
                        value={formik.values.user}
                        setValue={(newValue) => formik.setFieldValue('user', newValue)}
                        onBlur={formik.handleBlur}
                        error={formik.touched.user && Boolean(formik.errors.user)}
                        helperText={(formik.touched.user && formik.errors.user)}
                    />
                    <Button
                        size={'large'}
                        variant={'contained'}
                        type={'submit'}
                        fullWidth
                    >
                        <strong>Save New Post</strong>
                    </Button>
                </Stack>
            </form>
        </Box>
    )
}
