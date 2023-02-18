import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AxiosResponse } from 'axios';
import { MUIAsyncAutocompleteTags } from 'components/MUIAsyncAutocompleteTags/MUIAsyncAutocompleteTags';
import { useFormik } from 'formik';
import { ICreateChatRoomFormDto } from 'models/CHAT_APP/room.model';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useCreateChatRoomMutation } from 'redux/features/CHAT_APP/chatApiSlice';
import { useGetCurrentUserQuery } from 'redux/features/WHOLE_APP/currentUser/currentUserApiSlice';
import { useGetAllUsersQuery } from 'redux/features/WHOLE_APP/user/userApiSlice';
import * as yup from 'yup';
import { useLocation, useNavigate } from "react-router-dom";
import ProfilePicEditor from 'components/ProfilePicEditor/ProfilePicEditor';

type Props = {}

const userSchema = yup.object<Shape<IUser>>({
    id: yup.number(),
    email: yup.string().email(),
    name: yup.string(),
    photo: yup.string().notRequired().nullable(true),
    provider: yup.string(),
    providerId: yup.string().notRequired().nullable(true),
    roles: yup.array().of(yup.string())
})

const validationSchema = yup.object/*<Shape<ICreateChatRoomFormDto>>*/({
    title: yup
        .string()
        .required('Please specify your new title')
        .min(5, 'The new title should have at minimum length of 5'),
    caption: yup
        .string()
        .required('Please specify your new caption')
        .min(5, 'The new caption should have at minimum length of 5'),
    intendedParticipants: yup
        .array()
        .of(userSchema)
        .required('Please specify your intendedParticipants')
        .min(1, 'You should choose at least one participant.')
});

const CreateChatRoom = (props: Props) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const { enqueueSnackbar } = useSnackbar()
    const [createChatRoom] = useCreateChatRoomMutation()
    const { data: allUsers } = useGetAllUsersQuery()
    const { data: currentUser } = useGetCurrentUserQuery()

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return () => { };
    }, []);

    const initialValues: ICreateChatRoomFormDto = {
        title: '',
        caption: '',
        intendedParticipants: []
    };

    const onSubmit = async (values: ICreateChatRoomFormDto): Promise<any> => {
        try {
            console.log(values)
            const newRoom = await createChatRoom(values).unwrap()
            enqueueSnackbar(`Room Created Successfully with the id of ${newRoom.id}`, { variant: 'success' })
            formik.resetForm()
            navigate(`/chat/${newRoom.id}`, { state: { from: location }, replace: true });
        } catch (ex) {
            const err = ex as { data: { msg: string } }
            enqueueSnackbar(`Creating new Room Failed! ${err.data?.msg || 'Unknown Error'}`, { variant: 'error' });
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
        onSubmit,
    });

    const hangleGetUsersList = () => {
        return Promise.resolve({ data: allUsers?.filter(user => user.id !== currentUser?.id) } as AxiosResponse<IUser[], any>)
    }

    return (
        <Box component={'section'} width={1} height={1} display="flex">
            <Container
                maxWidth="lg"
                sx={{
                    display: "flex",
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    pt: 4
                }}
            >
                <form onSubmit={formik.handleSubmit}>
                    <Stack spacing={2}>
                        <Typography variant='body1'>Please, Complete the form below to create your own secure new room. 😎</Typography>
                        <ProfilePicEditor formik={formik} />
                        <TextField
                            required
                            autoComplete='new-chat-room-title'
                            label="Room Title"
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
                            autoComplete='new-chat-room-caption'
                            label="Room Caption"
                            variant="outlined"
                            name={'caption'}
                            type={'text'}
                            fullWidth
                            value={formik.values.caption}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.caption && Boolean(formik.errors.caption)}
                            helperText={formik.touched.caption && formik.errors.caption}
                        />
                        <MUIAsyncAutocompleteTags
                            name={'intendedParticipants'}
                            ac_sx={{ width: '100%' }}
                            titleField={'name'}
                            label='Users List'
                            getOptions={hangleGetUsersList}
                            value={formik.values.intendedParticipants || []}
                            setValue={(newValue) => formik.setFieldValue(
                                'intendedParticipants',
                                newValue
                            )}
                            onBlur={formik.handleBlur}
                            error={formik.touched.intendedParticipants && Boolean(formik.errors.intendedParticipants)}
                            helperText={(formik.touched.intendedParticipants && formik.errors.intendedParticipants)}
                        />
                        <Button
                            size={'large'}
                            variant={'contained'}
                            type={'submit'}
                            fullWidth
                        >
                            <strong>Create New Room</strong>
                        </Button>
                    </Stack>
                </form>
            </Container>
        </Box>
    )
}

export default CreateChatRoom