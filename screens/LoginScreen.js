import Entypo from "@expo/vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as AuthSession from "expo-auth-session";
import { LinearGradient } from "expo-linear-gradient";
import { Formik } from "formik";
import React, { useEffect } from "react";

import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const LoginScreen = () => {
  //!State
  const navigation = useNavigation();

  // Define discovery object outside of any function
  const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  };

  // Use the useAuthRequest hook at the top level of the component
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: "5c88658c75e54dfebd4ab39432212460",
      scopes: [
        "user-read-email",
        "playlist-modify-public",
        "user-read-recently-played",
      ],
      usePKCE: false,
      redirectUri: AuthSession.makeRedirectUri({
        scheme: "exp://" || "https://",
      }),
    },
    discovery
  );

  //!Function
  const exchangeCodeForToken = async (code) => {
    const tokenUrl = "https://accounts.spotify.com/api/token";
    const redirectUri = AuthSession.makeRedirectUri({
      scheme: "exp://" || "https://",
    });

    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          btoa(
            "5c88658c75e54dfebd4ab39432212460:e615d0212a96437a8f3def36b7aa35f4"
          ), // Base64 encode client_id:client_secret
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirectUri,
        client_id: "5c88658c75e54dfebd4ab39432212460",
        client_secret: "e615d0212a96437a8f3def36b7aa35f4",
      }).toString(),
    });

    const data = await response.json();

    if (response.ok) {
      const { access_token, refresh_token, expires_in } = data;

      // Save the token in AsyncStorage
      await AsyncStorage.setItem("access_token", access_token);
      await AsyncStorage.setItem("refresh_token", refresh_token);
      await AsyncStorage.setItem(
        "expiration_time",
        (new Date().getTime() + expires_in * 1000).toString()
      );

      navigation.navigate("Main");
    } else {
      console.log("Error exchanging code for token:", data);
    }
  };

  const checkToken = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    const expiration_time = await AsyncStorage.getItem("expiration_time");

    if (access_token && expiration_time) {
      const now = new Date().getTime();
      if (now < parseInt(expiration_time)) {
        // Token is still valid, navigate to Main
        console.log("Token is valid, navigating to Main");
        navigation.navigate("Main");
      } else {
        // Token has expired, clear it from storage
        console.log("Token has expired, removing token from storage");
        await AsyncStorage.removeItem("access_token");
        await AsyncStorage.removeItem("expiration_time");
      }
    } else {
      console.log("No access token found");
    }
  };

  useEffect(() => {
    checkToken();

    if (response?.type === "success" && response.params.code) {
      const { code } = response.params;
      console.log(response.params, "response");

      // Exchange the code for an access token
      exchangeCodeForToken(code);
    }
  }, [response]);

  //!Render
  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <ScrollView>
        <SafeAreaView>
          <View style={{ height: 80 }} />
          <Entypo
            style={{ textAlign: "center" }}
            name="spotify"
            size={80}
            color="white"
          />
          <Text style={styles.textHeader}>
            Millions of Songs Free on Spotify!
          </Text>
          <View style={{ height: 70 }} />
          <Pressable onPress={() => promptAsync()}>
            <Text style={styles.textSignIn}>Sign In with Spotify</Text>
          </Pressable>

          <Text style={styles.textOrUsing}>Or Using</Text>

          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <>
                <View style={styles.styleInput}>
                  <TextInput
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    placeholder="Email"
                  />
                </View>
                <View style={styles.styleInput}>
                  <TextInput
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    placeholder="Password"
                  />
                </View>
                <View>
                  <Pressable onPress={handleSubmit}>
                    <Text style={styles.styleButton}>Sign In</Text>
                  </Pressable>
                </View>
              </>
            )}
          </Formik>
          <View>
            <Pressable onPress={() => navigation.navigate("Signup")}>
              <Text style={styles.styleButton}>Sign Up</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  textHeader: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 40,
    textAlign: "center",
  },

  textSignIn: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
    backgroundColor: "#1DB954",
    borderRadius: 99,
    marginLeft: "auto",
    marginRight: "auto",
    width: 300,
    alignItems: "center",
    justifyContent: "center",
  },

  textOrUsing: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },

  styleInput: {
    backgroundColor: "white",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
    padding: 10,
    borderRadius: 99,
    color: "black",
    width: 300,
    textAlign: "center",
  },

  styleButton: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
    backgroundColor: "#1DB954",
    borderRadius: 99,
    marginLeft: "auto",
    marginRight: "auto",
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
});
