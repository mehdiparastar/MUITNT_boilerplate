// pages
import UsersManagement from 'apps/UsersManagement/UsersManagement';
import ApprovePReqs from 'auth/components/ApprovePReqs';
import MyAccount from 'auth/components/MyAccount';
import PersistLogin from 'auth/components/PersistLogin';
import RequireAuth from 'auth/components/RequireAuth';
import { allRolesList, UserRoles } from 'enum/userRoles.enum';
import { assess } from 'helperFunctions/componentAssess';
import { MainLayout } from 'layouts/MainLayout/MainLayout';
import Login from 'pages/Auth/Login/Login';
import Register from 'pages/Auth/Register/Register';
import ComingSoon from 'pages/ComingSoon/ComingSoon';
import Maintenance from 'pages/Maintenance/Maintenance';
import NotFound from 'pages/NotFound/NotFound';
import Unauthorized from 'pages/Unauthorized/Unauthorized';
import { Route, Routes } from 'react-router-dom';
import About from '../pages/About/About';
import Home from '../pages/Home/Home';

export const RoutesList: React.FC = () => {
  assess && console.log('assess')
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route element={<PersistLogin />}>
          {/* public routes */}
          <Route path="" element={<Home />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="notfound" element={<NotFound />} />
          <Route path="maintenance" element={<Maintenance />} />
          <Route path="resume" element={<ComingSoon />} />
          <Route path="about" element={<About />} />
          <Route path="auth" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route element={<RequireAuth allowedRoles={allRolesList} />}>
            <Route path='my-account' element={<MyAccount />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[UserRoles.superUser]} />}>
            <Route path='approve-permission-requests' element={<ApprovePReqs />} />
          </Route>
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
