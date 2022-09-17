import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ResumeIcon from '@mui/icons-material/CoPresent';
import CRUDIcon from '@mui/icons-material/AppRegistration';
import ChatIcon from '@mui/icons-material/Chat';
import VideoCall from '@mui/icons-material/OndemandVideo';
import VoiceCallIcon from '@mui/icons-material/RecordVoiceOver';
import ShareFileIcon from '@mui/icons-material/FilePresent';
import MovieIcon from '@mui/icons-material/LocalMovies';
import MusicIcon from '@mui/icons-material/LibraryMusic';
import MapIcon from '@mui/icons-material/MyLocation';
import TradeBotIcon from '@mui/icons-material/SmartToy';
import OnlineShopIcon from '@mui/icons-material/ShoppingCartCheckout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

export const navigationPages: navPage[] = [
  {
    title: 'public pages',
    key: 'public-pages',
    pages: [
      { title: 'Home', href: '/', icon: <HomeIcon sx={{ pr: 0.5 }} /> },
      { title: 'About', href: '/about', icon: <InfoIcon sx={{ pr: 0.5 }} /> },
      {
        title: 'Resume',
        href: '/resume',
        icon: <ResumeIcon sx={{ pr: 0.5 }} />,
      },
    ],
  },
  {
    title: 'apps',
    key: 'apps',
    pages: [
      { title: 'CRUD', href: '/crud', icon: <CRUDIcon sx={{ pr: 0.5 }} /> },
      { title: 'Chat', href: '/chat', icon: <ChatIcon sx={{ pr: 0.5 }} /> },
      {
        title: 'Video Call',
        href: '/video-call',
        icon: <VideoCall sx={{ pr: 0.5 }} />,
      },
      {
        title: 'Voice Call',
        href: '/voice-call',
        icon: <VoiceCallIcon sx={{ pr: 0.5 }} />,
      },
      {
        title: 'Share File',
        href: '/share-file',
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
