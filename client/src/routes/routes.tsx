// pages
import { MainLayout } from 'layouts/MainLayout/MainLayout';
import Login from 'pages/Auth/Login/Login';
import ComingSoon from 'pages/ComingSoon/ComingSoon';
import NotFound from 'pages/NotFound/NotFound';

import About from '../pages/About/About';
import Home from '../pages/Home/Home';
import { Routes, Route } from 'react-router-dom';
import RequireAuth from 'auth/components/RequireAuth';
import Unauthorized from 'pages/Unauthorized/Unauthorized';
import Maintenance from 'pages/Maintenance/Maintenance';
import UsersManagement from 'apps/UsersManagement/UsersManagement';
import { UserRoles } from 'enum/userRoles.enum';
import PersistLogin from 'auth/components/PersistLogin';

export const RoutesList: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* public routes */}
        <Route path="" element={<Home />} />
        <Route path="auth" element={<Login />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="notfound" element={<NotFound />} />
        <Route path="maintenance" element={<Maintenance />} />
        <Route path="resume" element={<ComingSoon />} />
        <Route path="about" element={<About />} />

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[UserRoles.admin]} />}>
            <Route path="crud" element={<ComingSoon />} />
            <Route path="chat" element={<ComingSoon />} />
            <Route path="video-call" element={<ComingSoon />} />
            <Route path="voice-call" element={<ComingSoon />} />
            <Route path="share-file" element={<ComingSoon />} />
            <Route path="movie" element={<ComingSoon />} />
            <Route path="music" element={<ComingSoon />} />
            <Route path="maps" element={<ComingSoon />} />
            <Route path="trade-bot" element={<ComingSoon />} />
            <Route path="online-shop" element={<ComingSoon />} />
            <Route path="user-management" element={<UsersManagement />} />
            <Route path="bingo" element={<ComingSoon />} />
          </Route>
        </Route>
        {/* catch all */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
// import Maintenance from 'pages/Maintenance/Maintenance';
export const routes1: Array<IRoute> = [
  {
    key: '*',
    title: 'Not Found',
    path: '*',
    enabled: true,
    component: NotFound,
    isProtected: false,
    layout: MainLayout,
  },

  //#region PUBLIC PAGES
  {
    key: 'auth-route',
    title: 'Auth',
    path: '/auth',
    enabled: true,
    component: Login,
    isProtected: false,
    layout: MainLayout,
  },
  {
    key: 'home-route',
    title: 'Home',
    path: '/',
    enabled: true,
    component: Home,
    isProtected: false,
    layout: MainLayout,
  },
  {
    key: 'about-route',
    title: 'About',
    path: '/about',
    enabled: true,
    component: About,
    isProtected: false,
    layout: MainLayout,
  },
  {
    key: 'resume-route',
    title: 'Resume',
    path: '/resume',
    enabled: true,
    component: ComingSoon,
    isProtected: false,
    layout: MainLayout,
  },
  //#endregion

  //#region APPS
  {
    key: 'crud-route',
    title: 'CRUD',
    path: '/crud',
    enabled: true,
    component: ComingSoon,
    isProtected: false,
    layout: MainLayout,
  },
  {
    key: 'chat-route',
    title: 'Chat',
    path: '/chat',
    enabled: true,
    component: ComingSoon,
    isProtected: false,
    layout: MainLayout,
  },
  {
    key: 'video-call-route',
    title: 'Video Call',
    path: '/video-call',
    enabled: true,
    component: ComingSoon,
    isProtected: false,
    layout: MainLayout,
  },
  {
    key: 'voice-call-route',
    title: 'Voice Call',
    path: '/voice-call',
    enabled: true,
    component: ComingSoon,
    isProtected: false,
    layout: MainLayout,
  },
  {
    key: 'share-file-route',
    title: 'Share File',
    path: '/share-file',
    enabled: true,
    component: ComingSoon,
    isProtected: false,
    layout: MainLayout,
  },
  {
    key: 'movie-route',
    title: 'Movie',
    path: '/movie',
    enabled: true,
    component: ComingSoon,
    isProtected: false,
    layout: MainLayout,
  },
  {
    key: 'music-route',
    title: 'Music',
    path: '/music',
    enabled: true,
    component: ComingSoon,
    isProtected: false,
    layout: MainLayout,
  },
  {
    key: 'maps-route',
    title: 'Maps',
    path: '/maps',
    enabled: true,
    component: ComingSoon,
    isProtected: false,
    layout: MainLayout,
  },
  {
    key: 'trade-bot-route',
    title: 'Trade Bot',
    path: '/trade-bot',
    enabled: true,
    component: ComingSoon,
    isProtected: false,
    layout: MainLayout,
  },
  {
    key: 'online-shop-route',
    title: 'Online Shop',
    path: '/online-shop',
    enabled: true,
    component: ComingSoon,
    isProtected: false,
    layout: MainLayout,
  },
  {
    key: 'user-management-route',
    title: 'User Management',
    path: '/user-management',
    enabled: true,
    component: ComingSoon,
    isProtected: false,
    layout: MainLayout,
  },
  //#endregion

  //#region GAMES
  {
    key: 'bingo-route',
    title: 'BINGO',
    path: '/bingo',
    enabled: true,
    component: ComingSoon,
    isProtected: false,
    layout: MainLayout,
  },
  //#endregion
];
