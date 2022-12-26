import { Alert, AlertTitle, Avatar, Button, Paper, Slider, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import Item from 'components/Item/Item'
import { useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import Dropzone from 'react-dropzone'
import DoubleRightArrowSVG from 'svg/signs/DoubleRightArrow'

const ProfilePicEditor = (props: { formik?: any }) => {
    const [image, setImage] = useState<File | string>(props.formik.values.photo || '')
    const [cropedImg, setCropedImg] = useState<string>('')
    const [rotate, setRotate] = useState<number>(0)
    const [zoom, setZoom] = useState<number>(100)
    const editor = useRef<any>(null)

    const handleChangeRotate = (event: Event, newValue: number | number[]) => {
        setRotate(newValue as number);
    };
    const handleChangeZoom = (event: Event, newValue: number | number[]) => {
        setZoom(newValue as number);
    };

    const handleSave = () => {
        if (editor) {
            // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
            // drawn on another canvas, or added to the DOM.
            // const canvas = editor.current.getImage().toDataURL()

            // If you want the image resized to the canvas size (also a HTMLCanvasElement)
            const canvasScaled = editor.current.getImageScaledToCanvas().toDataURL()
            props.formik.setFieldValue('photo', canvasScaled)
            setCropedImg(canvasScaled)
        }
    }

    return (
        <Dropzone
            accept={{ 'image/png': ['.png', '.jpg', '.jpeg'] }}
            onDrop={(dropped) => setImage(dropped[0])}
            noClick={image instanceof File || image !== ''}
            noKeyboard={image instanceof File || image !== ''}
            multiple={false}
        >
            {({ getRootProps, getInputProps }) => (
                <Grid
                    container
                    justifyContent={'center'}
                    justifyItems={'center'}
                    alignItems={"center"}
                    alignContent={'center'}
                    border={props.formik.values.photo ? '1px dashed green' : '1px dashed'}
                    spacing={1}
                    p={2}
                    {...getRootProps()}>
                    <Grid xs={12}>
                        <Typography textAlign={'center'} variant='body1'>Select your profile picture</Typography>
                        <input {...getInputProps()} />
                        <Paper
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-evenly',
                                flexWrap: 'wrap',
                                p: 0.5,
                                m: 0,
                                flexDirection: { xs: 'column', md: 'row' }
                            }}
                        >
                            <Item>
                                <AvatarEditor
                                    ref={editor}
                                    width={200}
                                    height={200}
                                    image={image}
                                    rotate={rotate}
                                    scale={zoom / 100}
                                    borderRadius={200 / 2}
                                />
                            </Item>
                            <Item sx={{ transform: { xs: 'rotate(90deg)', md: 'rotate(0deg)' } }}>
                                <DoubleRightArrowSVG width={50} height={50} />
                            </Item>
                            <Item>
                                <Avatar alt="result Image" src={cropedImg} sx={{ width: 200, height: 200 }} />
                            </Item>
                        </Paper>
                    </Grid>
                    {
                        (image instanceof File || image !== '') &&
                        <>
                            <Grid xs={12}>
                                <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                                    <Typography minWidth={60} maxWidth={60}>Rotate:</Typography>
                                    <Typography minWidth={25} maxWidth={25}>0</Typography>
                                    <Slider valueLabelDisplay="auto" aria-label="Rotate" min={0} max={360} value={rotate} onChange={(handleChangeRotate)} />
                                    <Typography minWidth={25} maxWidth={25}>360</Typography>
                                </Stack>
                            </Grid>
                            <Grid xs={12}>
                                <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                                    <Typography minWidth={60} maxWidth={60}>Zoom:</Typography>
                                    <Typography minWidth={25} maxWidth={25}>1</Typography>
                                    <Slider
                                        valueLabelFormat={value => value / 100}
                                        valueLabelDisplay="auto" aria-label="Zoom" min={100} max={400} value={zoom} onChange={(handleChangeZoom)} />
                                    <Typography minWidth={25} maxWidth={25}>4</Typography>
                                </Stack>
                            </Grid>
                            <Grid xs={6}>
                                <Button
                                    fullWidth
                                    variant='contained'
                                    color='secondary'
                                    onClick={handleSave}
                                >
                                    Save Profile Pic
                                </Button>
                            </Grid>
                            <Grid xs={6}>
                                <Button
                                    fullWidth
                                    onClick={() => {
                                        setImage('')
                                        props.formik.setFieldValue('photo', undefined)
                                        setCropedImg('')
                                    }}
                                >
                                    Remove Pic
                                </Button>
                            </Grid>
                            <Grid xs={12}>
                                <Alert severity="info">
                                    <AlertTitle>
                                        This save is temporarily, to complete the flow, finalize your changes.
                                    </AlertTitle>
                                </Alert>
                            </Grid>
                        </>
                    }
                </Grid>
            )}
        </Dropzone>
    )
}

export default ProfilePicEditor