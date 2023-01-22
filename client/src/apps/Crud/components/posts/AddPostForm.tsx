// import { Box, Button, Stack, TextField } from '@mui/material';
// import { useFormik } from 'formik';
// import { useSnackbar } from 'notistack';
// import { useAppDispatch } from '../../redux/hooks';
// import { createPost } from './postsSlice';
// import * as yup from 'yup';

interface IAddPostFormProps {
}

export interface IAddPostFormDto {
    title: string;
    caption: string;
}

// const validationSchema = yup.object<Shape<IAddPostFormDto>>({
//     title: yup
//         .string()
//         .required('Please specify your new title')
//         .min(5, 'The new title should have at minimum length of 5'),
//     caption: yup
//         .string()
//         .required('Please specify your new caption')
//         .min(5, 'The new caption should have at minimum length of 5')
// });

export function AddPostForm(props: IAddPostFormProps) {
    // const initialValues: IAddPostFormDto = {
    //     title: '',
    //     caption: '',
    // };

    // const dispatch = useAppDispatch()
    // const { enqueueSnackbar } = useSnackbar()

    // const onSubmit = async (values: IAddPostFormDto): Promise<any> => {
    //     dispatch(createPost({
    //         axiosPrivate,
    //         enqueueSnackbar,
    //         data: {
    //             title: formik.values.title,
    //             caption: formik.values.caption
    //         }
    //     }))
    //     formik.resetForm()
    // };

    // const formik = useFormik({
    //     initialValues,
    //     validationSchema: validationSchema,
    //     onSubmit,
    // });


    // return (
    //     <Box component={'section'} >
    //         <form onSubmit={formik.handleSubmit}>
    //             <Stack spacing={2}>
    //                 <TextField
    //                     required
    //                     autoComplete='new-post-title'
    //                     label="Post Title"
    //                     variant="outlined"
    //                     name={'title'}
    //                     type={'text'}
    //                     fullWidth
    //                     value={formik.values.title}
    //                     onChange={formik.handleChange}
    //                     onBlur={formik.handleBlur}
    //                     error={
    //                         formik.touched.title && Boolean(formik.errors.title)
    //                     }
    //                     helperText={formik.touched.title && formik.errors.title}
    //                 />
    //                 <TextField
    //                     required
    //                     autoComplete='new-post-caption'
    //                     label="Post Caption"
    //                     variant="outlined"
    //                     name={'caption'}
    //                     type={'text'}
    //                     fullWidth
    //                     value={formik.values.caption}
    //                     onChange={formik.handleChange}
    //                     onBlur={formik.handleBlur}
    //                     error={
    //                         formik.touched.caption && Boolean(formik.errors.caption)
    //                     }
    //                     helperText={formik.touched.caption && formik.errors.caption}
    //                 />
    //                 <Button
    //                     size={'large'}
    //                     variant={'contained'}
    //                     type={'submit'}
    //                     fullWidth
    //                 >
    //                     <strong>Save New Post</strong>
    //                 </Button>
    //             </Stack>
    //         </form>
    //     </Box>
    // )

    return <p>addpost</p>
}
