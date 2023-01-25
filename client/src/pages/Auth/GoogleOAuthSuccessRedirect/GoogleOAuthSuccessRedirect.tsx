import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { setAuthTokens } from 'redux/features/auth/authSlice';
import { useAppDispatch } from 'redux/hooks';

type Props = {}

const GoogleOAuthSuccessRedirect = (props: Props) => {

    let { accessToken, refreshToken, from } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (from && accessToken && refreshToken) {
            dispatch(setAuthTokens({ accessToken, refreshToken }))
            navigate('/' + from, { replace: true });
        }
    }, [accessToken, dispatch, from, navigate, refreshToken])


    return (
        <div>Loading...</div>
    )
}

export default GoogleOAuthSuccessRedirect