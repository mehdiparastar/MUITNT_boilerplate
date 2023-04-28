// pages
import Chat from 'apps/Chat/Chat';
import ChatRoomRequests from 'apps/Chat/components/ChatRoomRequests';
import ChatRoomSettings from 'apps/Chat/components/ChatRoomSettings';
import Conversation from 'apps/Chat/components/Conversation';
import CreateChatRoom from 'apps/Chat/components/CreateChatRoom';
import JoinChatRoom from 'apps/Chat/components/JoinChatRoom';
import Crud from 'apps/Crud/Crud';
import Files from 'apps/Files/Files';
import UsersManagement from 'apps/UsersManagement/UsersManagement';
import { allRolesList, UserRoles } from 'enum/userRoles.enum';
import { ChatLayout } from 'layouts/ChatLayout/ChatLayout';
import { MainLayout } from 'layouts/MainLayout/MainLayout';
import ApprovePReqs from 'pages/Auth/ApprovePReqs';
import GoogleOAuthSuccessRedirect from 'pages/Auth/GoogleOAuthSuccessRedirect/GoogleOAuthSuccessRedirect';
import Login from 'pages/Auth/Login/Login';
import MyAccount from 'pages/Auth/MyAccount';
import Register from 'pages/Auth/Register/Register';
import RequireAuth from 'pages/Auth/RequireAuth';
import ComingSoon from 'pages/ComingSoon/ComingSoon';
import Maintenance from 'pages/Maintenance/Maintenance';
import NotFound from 'pages/NotFound/NotFound';
import Unauthorized from 'pages/Unauthorized/Unauthorized';
import { Route, Routes } from 'react-router-dom';
import About from '../pages/About/About';
import Home from '../pages/Home/Home';
import Movie from 'apps/Movie/Movie';

export const RoutesList: React.FC = () => {
  return (
    <Routes>
      <Route path="chat" element={<ChatLayout />}>
        <Route path="" element={<RequireAuth allowedRoles={[UserRoles.chatAppUserLL]} />}>
          <Route path="" element={<Chat />} />
          <Route path=":roomId" element={<Conversation />} />
          <Route path='create' element={<CreateChatRoom />} />
          <Route path='join' element={<JoinChatRoom />} />
          <Route path='requests' element={<ChatRoomRequests />} />
          <Route path='settings' element={<ChatRoomSettings />} />
        </Route>
      </Route>

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

        <Route path="crud" element={<RequireAuth allowedRoles={[UserRoles.crudAppUserLL]} />}>
          <Route path="" element={<Crud />} />
        </Route>

        <Route path="movie" element={<RequireAuth allowedRoles={[UserRoles.movieAppUserLL]} />}>
          <Route path="" element={<Movie />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[UserRoles.admin]} />}>
          <Route path="files" element={<Files />} />
          <Route path="video-call" element={<ComingSoon />} />
          <Route path="voice-call" element={<ComingSoon />} />
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


