import { Stack, TextField } from '@mui/material';
import { appNameEnum } from 'enum/appName.enum';
import { useFormik } from 'formik';
import { IAddTag } from 'models/TAGS/tag.model';
import { useSnackbar } from 'notistack';
import { useAddFileTagMutation } from 'redux/features/FILE_APP/fileTagsApiSlice';
import * as yup from 'yup';

type Props = {
    formId: string
}


const validationSchema = yup.object<Shape<IAddTag>>({
    tag: yup
        .string()
        .matches(/^\S*$/, "spaces are not allowed.")
        .required('Please specify your new title')
        .max(10, 'The new tag title should have at maximum length of 10'),
    appName: yup
        .string()
        .required()
});

const AddTag = (props: Props) => {
    const { enqueueSnackbar } = useSnackbar()
    const [addFileTag,] = useAddFileTagMutation()
    const initialValues: IAddTag = {
        tag: '',
        appName: appNameEnum.music
    };

    const onSubmit = async (values: IAddTag) => {
        try {
            const addTag = await addFileTag(values).unwrap()
            enqueueSnackbar(`New tag added with the id of ${addTag.id}`, { variant: 'success' })
        } catch (ex) {
            const err = ex as { data: { msg: string } }
            enqueueSnackbar(`Creating new Tag Failed! ${err.data?.msg || 'Unknown Error'}`, { variant: 'error' });
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
        onSubmit,
    });

    return (
        <form onSubmit={formik.handleSubmit} id={props.formId}>
            <Stack spacing={3} py={2}>
                <TextField
                    required
                    autoComplete='new-tag-title'
                    label="Tag Title"
                    variant="outlined"
                    name={'tag'}
                    type={'text'}
                    fullWidth
                    value={formik.values.tag}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                        formik.touched.tag && Boolean(formik.errors.tag)
                    }
                    helperText={formik.touched.tag && formik.errors.tag}
                />
                <TextField
                    required
                    autoComplete='new-tag-app-name'
                    label="Tag App Name"
                    variant="outlined"
                    name={'appName'}
                    type={'text'}
                    fullWidth
                    value={formik.values.appName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                        formik.touched.appName && Boolean(formik.errors.appName)
                    }
                    helperText={formik.touched.appName && formik.errors.appName}
                    InputProps={{ readOnly: true }}
                />
            </Stack>
        </form>
    )
}

export default AddTag