import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const [userProfile, setUserProfile] = useState(null); // Initialize with null instead of an empty array

  const getProfile = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      const data = await response.json();
      setUserProfile(data);
    } catch (error) {
      console.error(error);
    }
  };

  const greetingMessage = () => {
    const current_time = new Date().getHours();
    if (current_time < 12) {
      return "Good Morning";
    } else if (current_time < 18) {
      return "Good Afternoon";
    }
    return "Good Evening";
  };

  const message = greetingMessage();

  useEffect(() => {
    getProfile();
  }, []);

  console.log(userProfile);

  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <ScrollView style={{ marginTop: 50 }}>
        <View>
          <View>
            {userProfile &&
            userProfile.images &&
            userProfile.images.length > 0 ? (
              <Image
                source={{ uri: userProfile.images[0].url }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  resizeMode: "cover",
                }}
              />
            ) : (
              <Text style={{ color: "white" }}>No Profile Image</Text>
            )}
            <Text
              style={{
                marginLeft: 10,
                fontSize: 20,
                fontWeight: "bold",
                color: "white",
              }}
            >
              {message}
            </Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
