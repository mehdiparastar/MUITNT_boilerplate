// pages
import Crud from 'apps/Crud/Crud';
import UsersManagement from 'apps/UsersManagement/UsersManagement';
import ApprovePReqs from 'pages/Auth/ApprovePReqs';
import MyAccount from 'pages/Auth/MyAccount';
import RequireAuth from 'pages/Auth/RequireAuth';
import { allRolesList, UserRoles } from 'enum/userRoles.enum';
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
import GoogleOAuthSuccessRedirect from 'pages/Auth/GoogleOAuthSuccessRedirect/GoogleOAuthSuccessRedirect';

export const RoutesList: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="google-oauth-success-redirect">
          <Route path=":accessToken/:refreshToken/:from" element={<GoogleOAuthSuccessRedirect />} />
        </Route>
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

        <Route element={<RequireAuth allowedRoles={[UserRoles.crudAppUserLL]} />}>
          <Route
            path="crud"
            element={<Crud />}
          />
        </Route>

        <Route element={<RequireAuth allowedRoles={[UserRoles.admin]} />}>
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
        {/* catch all */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};


