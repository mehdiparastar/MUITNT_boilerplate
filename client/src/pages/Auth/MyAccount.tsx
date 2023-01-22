import { Container, useMediaQuery } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import * as React from 'react';
import ChangePassword from './components/components/ChangePassword';
import PermissionRequest from './components/components/PermissionRequest';
import { UpdateProfileDetail } from './components/UpdateProfileDetail';

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && children}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

function FullWidthTabs() {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const isSm = useMediaQuery(theme.breakpoints.up('sm'), {
        defaultMatches: true,
    });

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ bgcolor: 'background.paper', width: 1, height: 1, my: 4 }}>
            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label={<strong>Update Your Profile</strong>} {...a11yProps(0)} />
                    <Tab label={<strong>Change Your Password</strong>} {...a11yProps(1)} />
                    <Tab label={<strong>Permission Request</strong>} {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <Box
            >
                <TabPanel data-aos={isSm ? 'fade-left' : 'fade-up'} value={value} index={0} dir={theme.direction}>
                    <UpdateProfileDetail />
                </TabPanel>
                <TabPanel data-aos={isSm ? 'fade-left' : 'fade-up'} value={value} index={1} dir={theme.direction}>
                    <ChangePassword />
                </TabPanel>
                <TabPanel data-aos={isSm ? 'fade-left' : 'fade-up'} value={value} index={2} dir={theme.direction}>
                    <PermissionRequest />
                </TabPanel>
            </Box>
        </Box>
    );
}

interface IMyAccountProps {
}

const MyAccount: React.FunctionComponent<IMyAccountProps> = (props) => {
    const theme = useTheme();

    return (
        <Box
            height={1}
            width={1}
            minHeight={{ xs: 'auto', md: 'calc(100vh - 64px)' }}
            display={'flex'}
            alignItems={'flex-start'}
            bgcolor={theme.palette.alternate.main}
            component={'section'}
            sx={{
                position: 'relative',
                backgroundColor: theme.palette.alternate.main,
                '&::after': {
                    position: 'absolute',
                    content: '""',
                    width: '30%',
                    zIndex: 1,
                    top: 0,
                    right: 0,
                    height: '100%',
                    backgroundSize: '18px 18px',
                    backgroundImage: `radial-gradient(${theme.palette.primary.light} 20%, transparent 20%)`,
                    opacity: 0.2,
                },
            }}
        >
            <Container
                maxWidth="lg"
                sx={{
                    textAlign: 'center',
                    px: 2,
                    py: { xs: 2 },
                    zIndex: 2
                }}
            >
                <FullWidthTabs />
            </Container>
        </Box>
    )
};

export default MyAccount;
