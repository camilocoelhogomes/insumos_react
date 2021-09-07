import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
    typography: {
        h2: {
            fontSize: '60px',
            fontWeight: 400,
        },
        h3: {
            fontSize: '48px',
            fontWeight: 300,
        }
    },
    palette: {
        primary: {
            main: '#0E4DA4'
        },
        secondary: {
            main: '#1BB55C'
        }
    }
});

export default theme;