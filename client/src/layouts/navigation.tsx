import CRUDIcon from '@mui/icons-material/AppRegistration';
import ChatIcon from '@mui/icons-material/Chat';
import ResumeIcon from '@mui/icons-material/CoPresent';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ShareFileIcon from '@mui/icons-material/FilePresent';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import MusicIcon from '@mui/icons-material/LibraryMusic';
import NotAccessibleIcon from '@mui/icons-material/NotAccessible';
import EngineeringIcon from '@mui/icons-material/Engineering';
import NotFoundIcon from '@mui/icons-material/BrowserNotSupported';
import MovieIcon from '@mui/icons-material/LocalMovies';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MapIcon from '@mui/icons-material/MyLocation';
import RTMPCall from '@mui/icons-material/OndemandVideo';
import VoiceCallIcon from '@mui/icons-material/RecordVoiceOver';
import OnlineShopIcon from '@mui/icons-material/ShoppingCartCheckout';
import TradeBotIcon from '@mui/icons-material/SmartToy';

export const navigationPages: navPage[] = [
  {
    title: 'public pages',
    key: 'public-pages',
    pages: [
      {
        title: 'Auth',
        href: '/auth',
        icon: <LoginIcon sx={{ pr: 0.5 }} />,
      },
      {
        title: 'Register',
        href: '/register',
        icon: <PersonAddIcon sx={{ pr: 0.5 }} />,
      },
      { title: 'Home', href: '/', icon: <HomeIcon sx={{ pr: 0.5 }} /> },
      { title: 'About', href: '/about', icon: <InfoIcon sx={{ pr: 0.5 }} /> },
      {
        title: 'Resume',
        href: '/resume',
        icon: <ResumeIcon sx={{ pr: 0.5 }} />,
      },
      { title: 'NotFound', href: '/notfound', icon: <NotFoundIcon sx={{ pr: 0.5 }} /> },
      { title: 'UnAuthorized', href: '/unauthorized', icon: <NotAccessibleIcon sx={{ pr: 0.5 }} /> },
      { title: 'Maintenance', href: '/maintenance', icon: <EngineeringIcon sx={{ pr: 0.5 }} /> },
    ],
  },
  {
    title: 'apps',
    key: 'apps',
    pages: [
      { title: 'CRUD', href: '/crud', icon: <CRUDIcon sx={{ pr: 0.5 }} /> },
      { title: 'Chat', href: '/chat', icon: <ChatIcon sx={{ pr: 0.5 }} /> },
      {
        title: 'RTMP Call',
        href: '/rtmp-call',
        icon: <RTMPCall sx={{ pr: 0.5 }} />,
      },
      {
        title: 'Voice Call',
        href: '/voice-call',
        icon: <VoiceCallIcon sx={{ pr: 0.5 }} />,
      },
      {
        title: 'Files',
        href: '/files',
        icon: <ShareFileIcon sx={{ pr: 0.5 }} />,
      },
      { title: 'Movie', href: '/movie', icon: <MovieIcon sx={{ pr: 0.5 }} /> },
      { title: 'Music', href: '/music', icon: <MusicIcon sx={{ pr: 0.5 }} /> },
      { title: 'Maps', href: '/maps', icon: <MapIcon sx={{ pr: 0.5 }} /> },
      {
        title: 'Trade Bot',
        href: '/trade-bot',
        icon: <TradeBotIcon sx={{ pr: 0.5 }} />,
      },
      {
        title: 'Online Shop',
        href: '/online-shop',
        icon: <OnlineShopIcon sx={{ pr: 0.5 }} />,
      },
      {
        title: 'User Management',
        href: '/user-management',
        icon: <ManageAccountsIcon sx={{ pr: 0.5 }} />,
      },
    ],
  },
  {
    title: 'games',
    key: 'games',
    pages: [
      { title: 'Bingo', href: '/bingo', icon: <HomeIcon sx={{ pr: 0.5 }} /> },
    ],
  },
];
