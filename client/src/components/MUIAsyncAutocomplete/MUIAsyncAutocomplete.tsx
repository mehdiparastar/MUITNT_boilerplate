import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { SxProps } from '@mui/material';
import { AxiosError, AxiosResponse } from 'axios';
import { useSnackbar } from 'notistack';


export interface ICustomAutoCompleteProps<T> {
    ac_sx?: SxProps;
    label?: string;
    titleField: Extract<keyof T, string>,
    value: T | null,
    setValue: (arg0: T | null) => void,
    getOptions: () => Promise<AxiosResponse<T[], any>>
}


export const MUIAsyncAutocomplete = <T,>(props: ICustomAutoCompleteProps<T>) => {
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
                    const err = ex as AxiosError<{ msg: string }>
                    enqueueSnackbar(err.response?.data?.msg || 'Unknown Error', { variant: 'error' });
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
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
            value={props.value}
            onChange={(event: any, newValue: T | null) => {
                props.setValue(newValue);
            }}
        />
    );
}
