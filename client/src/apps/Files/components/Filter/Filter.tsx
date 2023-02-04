import { Add } from '@mui/icons-material';
import { FormControl, FormControlLabel, Radio, RadioGroup, Stack, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AxiosResponse } from 'axios';
import { MUIAsyncAutocompleteTags } from 'components/MUIAsyncAutocompleteTags/MUIAsyncAutocompleteTags';
import SimpleSlideDialog from 'components/SimpleSlideDialog/SimpleSlideDialog';
import { strToBool } from 'helperFunctions/strToBool';
import { ITag } from 'models/TAGS/tag.model';
import { useGetFileTagsQuery } from 'redux/features/FILE/fileTagsApiSlice';
import AddTag from './components/AddTag';


type Props = {
    privateFilter: boolean,
    setPrivateFilter: (arg: boolean) => void,
    tagsFilter: ITag[],
    setTagsFilter: (arg: ITag[]) => void,
}

const Filter = (props: Props) => {
    const { data: fileTags = [] } = useGetFileTagsQuery()
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.up('sm'), {
        defaultMatches: true,
    });

    const handleChangePrivateFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setPrivateFilter(strToBool((event.target as HTMLInputElement).value))
    };

    const handleGetTagsList = async () => {
        return Promise.resolve({ data: fileTags } as AxiosResponse<ITag[]>)
    }

    return (
        <Stack direction={'column'} spacing={3}>
            <FormControl>
                {/* <FormLabel id="demo-controlled-radio-buttons-group">Security Type</FormLabel> */}
                <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={props.privateFilter}
                    onChange={handleChangePrivateFilter}
                >
                    <FormControlLabel value={true} control={<Radio />} label="Private" />
                    <FormControlLabel value={false} control={<Radio />} label="Public" />
                </RadioGroup>
            </FormControl>
            <Stack direction={'row'}>
                <MUIAsyncAutocompleteTags<ITag>
                    ac_sx={{ width: '100%' }}
                    titleField={'tag'}
                    label='Tags Filter'
                    getOptions={handleGetTagsList}
                    value={props.tagsFilter}
                    setValue={(newValue) => props.setTagsFilter(newValue || [])}
                    textfield_sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                // onBlur={formik.handleBlur}
                // error={Boolean(formik.touched.files?.find(item => item === file).tags)}
                // helperText={(formik.touched.tags && formik.errors.tags)}                    
                />
                <SimpleSlideDialog
                    sx={{ display: 'flex', marginTop: isSm ? '-1px' : '0px' }}
                    tooltipTitle="Add New Tag"
                    btnProps={{
                        color: 'secondary',
                        variant: 'contained',
                        sx: {
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                        }
                    }}
                    btnTitle={<Add />}
                    content={
                        <AddTag
                            formId="file-app-add-new-tag-form"

                        />
                    }
                    title="Adding New Tag"
                    confirmText='Add'
                    formId="file-app-add-new-tag-form"
                />
            </Stack>
        </Stack>
    )
}

export default Filter