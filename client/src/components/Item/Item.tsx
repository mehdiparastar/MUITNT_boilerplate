import { Box } from "@mui/material";
import { styled } from '@mui/material/styles';

const Item = styled(Box)(({ theme, textAlign }) => ({ textAlign: 'center', }));

export default Item