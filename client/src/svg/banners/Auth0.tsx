import React from 'react';
import { useTheme } from '@mui/material/styles';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

interface SVGProps extends SvgIconProps {
    width?: number
    height?: number
}

const Auth0BannerSVG: React.FC<SVGProps> = ({ width = 101.36, height = 70, ...rest }) => {
    const theme = useTheme();
    const colorPrimaryMain = theme.palette.primary.main;
    const colorPrimaryDark = theme.palette.primary.dark;
    return (
        <SvgIcon
            viewBox='0 0 800 310'
            {...rest}
        >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        </SvgIcon>
    );
};


export default Auth0BannerSVG;
