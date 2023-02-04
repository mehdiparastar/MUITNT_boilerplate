import { SxProps } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import { AxiosResponse } from 'axios';
import { useSnackbar } from 'notistack';
import * as React from 'react';


export interface ICustomAutoCompleteTagsProps<T> {
    ac_sx?: SxProps;
    label?: string;
    titleField: Extract<keyof T, string>,
    value: T[] | null,
    setValue: (arg0: T[] | null) => void,
    getOptions: () => Promise<AxiosResponse<T[], any>>
    onBlur?: {
        (e: React.FocusEvent<any>): void;
        <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
    },
    error?: boolean,
    helperText?: string | boolean,
    textfield_sx?: SxProps
}


export const MUIAsyncAutocompleteTags = <T,>(props: ICustomAutoCompleteTagsProps<T>) => {
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<T[]>([]);
    const loading = open && options.length === 0;
    const getOptions = props?.getOptions
    const titleField = props?.titleField

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {

            if (active && getOptions && titleField) {
                try {
                    const response = await getOptions()
                    setOptions(response.data);
                } catch (ex) {
                    const err = ex as { data: { msg: string } }
                    enqueueSnackbar(`Fetching Failed! ${err.data?.msg || 'Unknown Error'}`, { variant: 'error' });
                }
            }
        })();

        return () => {
            active = false;
        };
    }, [loading, enqueueSnackbar, getOptions, titleField]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete
            multiple
            id="asynchronous-demo"
            sx={{ width: 440, ...props?.ac_sx }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            isOptionEqualToValue={(option, value) => option[titleField] === value[titleField]}
            getOptionLabel={(option) => option[titleField] as string}
            options={options}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={props?.label || "Asynchronous"}
                    InputProps={{
                        ...params.InputProps,
                        ...(props.textfield_sx && { sx: props.textfield_sx }),
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                    error={props.error}
                    helperText={props.helperText && props.helperText}
                    onBlur={props.onBlur}
                />
            )}
            // value={props.value || []}
            // onChange={(event, newValue) => {
            //     props.setValue(newValue);
            // }}
            value={props.value || []}
            onChange={(event: any, newValue: T[] | null) => {
                props.setValue(newValue);
            }}
        />
    );
}
