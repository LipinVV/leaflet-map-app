import {createTheme, PaletteOptions} from "@mui/material";

interface Palette extends PaletteOptions {
    white: string,
    blue: string,
    dark: string,
    green: string,
    yellow: string,
    gray: string,
}

const palette: Palette = {
    white: '#ffffff',
    blue: '#4ea6d8',
    dark: '#050811',
    green: '#06d6a0',
    yellow: '#FFD700',
    gray: '#92a9b7',
}

declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        button_confirm: true;
        button_delete: true;
    }
}

const button_confirm: any = {
    props: {
        variant: 'button_confirm'
    },
    style: {
        backgroundColor: palette.blue,
        cursor: 'pointer',
        color: palette.white,
        height: '100%',
        textTransform: 'capitalize',
        lineHeight: '30px',
        fontSize: '15px',
        ":hover": {
            backgroundColor: palette.green,
            fontSize: '20px',
            color: palette.dark
        },
        "&:disabled": {
            backgroundColor: palette.gray,
        }
    }
}

const button_delete = {
    props: {
        variant: 'button_delete'
    },
    style: {
        backgroundColor: palette.yellow,
        cursor: 'pointer',
        color: 'black',
        height: '100%',
        textTransform: 'capitalize',
        fontSize: '15px',
        ":hover": {
            backgroundColor: palette.green,
        }
    }
}

export const theme = createTheme({
    components: {
        MuiButton: {
            variants: [
                button_confirm,
                button_delete
            ]
        }
    },
    palette: palette
});