import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Dashboard from "../Screens/DashboardScreen";
import Login from "../Screens/LoginScreen";

import useAuth from "@/hooks/useAuth";
import { Routes } from "./Routes";

const Stack = createNativeStackNavigator();

export default function MainNavigation() {
  const { loading, session, authorized } = useAuth();

  if (loading) {
    return null;
  }

  const canAccessDashboard = !!session && authorized;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {canAccessDashboard ? (
        <Stack.Screen name={Routes.Dashboard} component={Dashboard} />
      ) : (
        <Stack.Screen name={Routes.Login} component={Login} />
      )}
    </Stack.Navigator>
  );
}
