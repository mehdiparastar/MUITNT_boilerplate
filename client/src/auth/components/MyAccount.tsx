import { Container, useMediaQuery } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import useAuth from 'auth/hooks/useAuth';
import useAxiosPrivate from 'auth/hooks/useAxiosPrivate';
import { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { useEffect } from 'react';
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
        <Box sx={{ bgcolor: 'background.paper', width: 1, height: 1 }}>
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
                    Item Two
                </TabPanel>
                <TabPanel data-aos={isSm ? 'fade-left' : 'fade-up'} value={value} index={2} dir={theme.direction}>
                    Item Three
                </TabPanel>
            </Box>
        </Box>
    );
}

interface IMyAccountProps {
}

const MyAccount: React.FunctionComponent<IMyAccountProps> = (props) => {
    const axiosPrivate = useAxiosPrivate()
    const { enqueueSnackbar } = useSnackbar()
    const { setLoadingFetch, setUserProfile } = useAuth()
    const theme = useTheme();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getData = async () => {
            try {
                const response = await axiosPrivate.get('auth/profile', {
                    signal: controller.signal,
                });
                isMounted && setUserProfile(response.data)
            } catch (err) {
                const ex = err as AxiosError<{ msg: string }>
                isMounted && enqueueSnackbar(ex.response?.data?.msg || 'Unknown Error', { variant: 'error' });
            } finally {
                isMounted && setLoadingFetch(false);
                isMounted = false
            }
        };

        getData()

        return () => {
            isMounted = false;
            setLoadingFetch(false);
            controller.abort();
        };
    }, [axiosPrivate, setLoadingFetch, enqueueSnackbar, setUserProfile]);

    return <Box
        height={1}
        width={1}
        display={'flex'}
        alignItems={'center'}
        bgcolor={theme.palette.alternate.main}
        component={'section'}
    >
        <Container
            maxWidth="lg"
            sx={{
                textAlign: 'center',
                px: 2,
                py: { xs: 2 },
            }}
        >
            <FullWidthTabs />
        </Container>
    </Box>;
};

export default MyAccount;
