// pages
import Home from '../pages/Home/Home';
import About from '../pages/About/About';

// other
import { FC } from 'react';

// interface
interface Route {
  key: string;
  title: string;
  path: string;
  enabled: boolean;
  component: FC<{}>;
  isProtected: boolean;
}

export const routes: Array<Route> = [
  {
    key: 'home-route',
    title: 'Home',
    path: '/',
    enabled: true,
    component: Home,
    isProtected: false,
  },
  {
    key: 'about-route',
    title: 'About',
    path: '/about',
    enabled: true,
    component: About,
    isProtected: false,
  },
];
