import React from 'react';
import { NavLink } from 'react-router-dom';

export const MUINavLink = React.forwardRef<any, any>((props, ref) => (
    <NavLink
        ref={ref}
        to={props.to}
        className={({ isActive }) => `${props.className} ${isActive ? props.activeClassName : ''}`}
    >
        {props.children}
    </NavLink>
));