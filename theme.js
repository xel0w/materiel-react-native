import {useColorScheme} from "react-native";

const colors = {
    white: '#fff',
    black: '#000',
    greyBlue: '#467386',
    grey: '#aaa'
}

export const colorsTheme={
    "light":{
        backgroundColor: colors.white,
        textColor: colors.black,
        primary: colors.greyBlue
    },
    "dark":{
        backgroundColor: colors.black,
        textColor: colors.white,
        primary: colors.greyBlue
    }
}

export default ()=>{
    const theme = useColorScheme();
    return colorsTheme[theme];
}