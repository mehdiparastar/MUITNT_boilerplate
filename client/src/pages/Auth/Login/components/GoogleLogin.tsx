import { Link } from '@mui/material';
import { useEffect } from 'react';

const google1 =
  "<iframe width='100%' height='1000px' scrolling='no' src='https://www.google.com/webhp?igu=1&gws_rd=ssl' sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'></iframe>";
const google =
  "<iframe width='100%' height='100%' scrolling='no' src='http://localhost:3001/auth/google-logins' sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'></iframe>";

export const GoogleLogin = () => {
  useEffect(() => {
    // window.open('http://localhost:3001/auth/google-logins', '_self');
  }, []);
  return <div dangerouslySetInnerHTML={{ __html: google ? google : '' }} />;
  return (
    <Link
      href="http://localhost:3001/auth/google-logins"
      target={'_blank'}
    >
      link
    </Link>
  );
};
