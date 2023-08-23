import {StatusBar} from "expo-status-bar";
import AppStyles from "./AppStyles";
import {
  SafeAreaProvider,
} from "react-native-safe-area-context";
import useTheme from './theme'
import {NavigationContainer} from "@react-navigation/native";
import {createDrawerNavigator} from "@react-navigation/drawer";
import Listes from "./screens/Liste/Liste";
import Connexion from "./screens/Connexion/Connexion";

export default function App() {

  const App = () => {

    const styles = AppStyles();
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator>
          <Drawer.Screen name="Connexion" component={Connexion}/>
          <Drawer.Screen name="Materiel" component={Listes}/>
        </Drawer.Navigator>


    );
  };

  return (
      <NavigationContainer>
        <StatusBar style="auto"/>
        <SafeAreaProvider>
          <App></App>
        </SafeAreaProvider>
      </NavigationContainer>
  );
}