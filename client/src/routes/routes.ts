// pages
import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import { MainLayout } from 'layouts/MainLayout/MainLayout';
import NotFound from 'pages/NotFound/NotFound';

export const routes: Array<Route> = [
  {
    key: '*',
    title: 'Not Found',
    path: '*',
    enabled: true,
    component: NotFound,
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
];
