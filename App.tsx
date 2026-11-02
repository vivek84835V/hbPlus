import AuthProvider from "@/context/AuthProvider";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from "./src/navigations/MainNavigaton";

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
    </AuthProvider>
  );
}
