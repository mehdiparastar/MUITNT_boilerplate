import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import IransansXWoff from "../assets/fonts/IRANSansX-Regular.woff";
import IransansXWoff2 from "../assets/fonts/IRANSansX-Regular.woff2";
import IransansXBoldWoff from "../assets/fonts/IRANSansX-Bold.woff";
import IransansXBoldWoff2 from "../assets/fonts/IRANSansX-Bold.woff2";
// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      light: '#63b8ff',
      main: '#0989e3',
      dark: '#005db0',
      contrastText: '#000',
    },
    secondary: {
      main: '#4db6ac',
      light: '#82e9de',
      dark: '#00867d',
      contrastText: '#000',
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (themeParam) => `        
      @font-face {
        font-family: 'IRANSansX';
        font-style: normal;
        font-weight: 400;
        src: url(${IransansXWoff}) format('woff'), url(${IransansXWoff2}) format('woff2');
      }      
      
      @font-face {
        font-family: 'IRANSansX';
        font-style: normal;
        font-weight: 700;
        src: url(${IransansXBoldWoff}) format('woff'), url(${IransansXBoldWoff2}) format('woff2');
      }  

        * {
            box-sizing: border-box;
          }

        html {
          font-size: 10px;
          text-rendering: geometricPrecision;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        }

        html,
        body {
          height: 100%;
          width: 100%;
          margin: 0;
          padding: 0;
        }

        body {
          background-color: #000;
        
          color: #fff;
          font-family: "Inter", sans-serif;
        
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        
          overflow-y: scroll;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: "Space Grotesk", sans-serif;
          font-weight: 600;
          color: rgba(0, 0, 0, 0.86);
        }

        h1,
        h2,
        h3 {
          margin-top: 3.2rem;
          margin-bottom: 1.6rem;
        }

        h4,
        h5,
        h6 {
          margin-top: 1.6rem;
          margin-bottom: 1.6rem;
        }

        h1 {
          font-size: 3.2rem;
        }

        h2 {
          font-size: 2.8rem;
        }

        h3 {
          font-size: 2.4rem;
        }

        h4 {
          font-size: 2rem;
        }

        h5 {
          font-size: 1.6rem;
        }

        h6 {
          font-size: 1.4rem;
        }

        p {
          margin: 0 0 1.6rem;
        }

        strong {
          font-weight: 500;
        }

        small {
          font-size: 1.2rem;
        }

        blockquote {
          padding: 1.6rem 3.2rem;
          margin: 0 0 3.2rem;

          border-left: 8px solid #eee;

          font-size: 1.6rem;
          font-style: italic;
        }

        body,
        button,
        input,
        select,
        textarea {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        button,
        input,
        select,
        textarea {
          font-family: inherit;
          font-size: inherit;
          line-height: inherit;
        }

        a {
          color: var(--white);
          text-decoration: none;
        }

        figure {
          margin: 0;
        }
        img {
          vertical-align: middle;
        }

        code,
        pre {
          font-family: "Fira Code", source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
          width: 100%;
        }

        code {
          color: #1bc99f;
        }
        
      `,
    },
  },
});

export default theme;
