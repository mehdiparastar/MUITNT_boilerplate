import { Link } from '@mui/material';
import { useEffect } from 'react';
import NewWindow from 'react-new-window'

const google1 =
  "<iframe width='100%' height='1000px' scrolling='no' src='https://www.google.com/webhp?igu=1&gws_rd=ssl' sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'></iframe>";
const google = (
  <>
    <iframe
      width="100%"
      height="1000px"
      scrolling="no"
      // src="http://localhost:3000"
      src="http://localhost:3001/auth/google-logins"
      // src="https://accounts.google.com/gsi/button?type=standard&theme=filled_blue&size=large&text=undefined&shape=circle&logo_alignment=undefined&width=100%25&locale=undefined&client_id=572561624813-vqsgnhjlqeuo86mtl7jjd85cruhrsr13.apps.googleusercontent.com&iframe_id=gsi_819583_217487&as=qrkrCFKapYAYi8zF97uCzA"
      sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals"
      allowFullScreen={true}
      referrerPolicy={'same-origin'}
    ></iframe>
  </>
);
let win: Window | null
export const GoogleLogin1 = () => {
  useEffect(() => {
    // win = window.open(
    //   'https://www.cra.ir',
    //   // 'http://localhost:3001/auth/google-logins',
    //   'tttt',
    //   'toolbar=no,width=500,height=200,directories=no,menubar=no,SCROLLBARS=yes',
    // );
    // const x = win?.addEventListener('click', e => { console.log('e') })

    // console.log(x)
  }, []);

  // return <>
  //   <iframe name="loginIframe"></iframe>
  //   <a target="_top" href='http://localhost:3001/auth/google-logins'>
  //     {/* <input type="submit" value="Login"> */}link
  //   </a>
  // </>
  return google;
  // return <div dangerouslySetInnerHTML={{ __html: google ? google : '' }} />;
  return (
    <>
      <form target="tttt"></form>
      {/* 
        <NewWindow
          url="http://localhost:3001/auth/google-logins"
          name='tttt'
          onOpen={e => console.log(e)}
        >
          2525
        </NewWindow> 
      */}
    </>
    // <Link
    //   href="http://localhost:3001/auth/google-logins"
    //   target={'_blank'}
    // >
    //   link
    // </Link>
  );
};
