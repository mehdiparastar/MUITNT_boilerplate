import { Box, SxProps, Tooltip } from '@mui/material';
import Button, { ButtonProps } from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import * as React from 'react';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
    btnTitle?: string | React.ReactNode
    // btnVariant?: "text" | "outlined" | "contained"
    title?: string
    content?: string | JSX.Element
    confirmText?: string
    handleConfirm?: (T: any) => void,
    confirmComp?: JSX.Element,
    formId: string,
    sx?: SxProps,
    btnProps?: ButtonProps,
    tooltipTitle?: string
}

export default function SimpleSlideDialog(props: Props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    if (props.confirmComp) {
        props.confirmComp.props = { ...props.confirmComp.props, onClick: () => handleClose() }
    }

    return (
        <Box sx={props.sx}>
            {
                props.tooltipTitle ?
                    <Tooltip title={props.tooltipTitle}>
                        <Button
                            onClick={handleClickOpen}
                            {...props.btnProps}
                        >
                            {props.btnTitle || 'Slide in alert dialog'}
                        </Button>
                    </Tooltip> :
                    <Button
                        onClick={handleClickOpen}
                        {...props.btnProps}
                    >
                        {props.btnTitle || 'Slide in alert dialog'}
                    </Button>
            }
            <Dialog
                fullWidth
                maxWidth="lg"
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{props.title || "alert dialog slide title."}</DialogTitle>
                <DialogContent>
                    {typeof (props.content) === 'string' ?
                        <DialogContentText id="alert-dialog-slide-description">
                            {props.content || "alert dialog slide description."}
                        </DialogContentText> :
                        props.content || "alert dialog slide description."
                    }
                </DialogContent>
                <DialogActions>
                    <Button
                        form={props.formId}
                        type="submit"
                        variant="contained"
                        onClick={handleClose}
                    >
                        {props.confirmText || "confirm"}
                    </Button>
                    <Button
                        onClick={props.handleConfirm || handleClose}
                    >
                        {"cancel"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}