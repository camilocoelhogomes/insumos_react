import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
    typography: {
        h2: {
            fontSize: '25.6px',
            fontWeight: 600,
            fontFamily: 'Inter',
        },
        h3: {
            fontSize: '48px',
            fontWeight: 300,
        }
    },
    palette: {
        primary: {
            main: '#F75F43'
        },
        secondary: {
            main: '#F0754F'
        }
    }
});

export default theme;