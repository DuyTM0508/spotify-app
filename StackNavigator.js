import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SignUpScreen from "./screens/SignUpScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          shadowOpacity: 4,
          elevation: 4,
          shadowOffset: {
            width: 0,
            height: -4,
          },
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          tabBarLabelStyle: { color: "white" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={24} color="white" />
            ) : (
              <Octicons name="home" size={24} color="black" />
            ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          headerShown: false,
          tabBarLabelStyle: { color: "white" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="person-sharp" size={24} color="white" />
            ) : (
              <Ionicons name="person-outline" size={24} color="black" />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Signup"
          component={SignUpScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
