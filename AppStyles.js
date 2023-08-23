import { StyleSheet } from "react-native";
import useTheme from "./theme";
import {
    useSafeAreaInsets,
} from "react-native-safe-area-context";

export default () => {

    const theme = useTheme();

    const insets = useSafeAreaInsets();

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.backgroundColor,
            alignItems: "center",
            justifyContent: "center",
        },
        safeArea: {
            paddingBottom: insets.bottom,
            paddingTop: insets.top,
            paddingRight: insets.right,
            paddingLeft: insets.left,
        },
        text: {
            color: theme.textColor,
        },
        status:{
            backgroundColor: theme.backgroundColor
        },
        button:{
            backgroundColor: theme.primary,
            height: 60,
            borderRadius: 15,
            padding: 15,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            elevation: 4,
            text:{
                color: theme.textColor,
                fontWeight: "bold",
                fontSize: 20,
            }
        }
    });

}