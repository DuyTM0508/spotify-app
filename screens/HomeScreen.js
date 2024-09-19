import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";
import axios from "axios";

const HomeScreen = () => {
  const [userProfile, setUserProfile] = useState("");
  const [recentlyPlayed, setRecentlyPlayed] = useState("");

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

  const getRecentLyPlayer = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    try {
      const response = await fetch(
        "https://api.spotify.com/v1/me/player/recently-played",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      const data = response.items;
      setRecentlyPlayed(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRecentLyPlayer();
  }, []);
  console.log(recentlyPlayed, "recentlyPlayed");

  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <ScrollView style={{ marginTop: 50 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                resizeMode: "cover",
              }}
              source={require("../images/user.jpg")}
            />
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
          <MaterialCommunityIcons
            name="lightning-bolt-outline"
            size={24}
            color="white"
          />
        </View>

        <View
          style={{
            marginHorizontal: 12,
            marginVertical: 5,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginTop: 15,
          }}
        >
          <Pressable
            style={{
              backgroundColor: "#282828",
              padding: 10,
              borderRadius: 30,
            }}
          >
            <Text style={{ fontSize: 15, color: "white" }}>Music</Text>
          </Pressable>

          <Pressable
            style={{
              backgroundColor: "#282828",
              padding: 10,
              borderRadius: 30,
            }}
          >
            <Text style={{ fontSize: 15, color: "white" }}>
              Podcasts & Shows
            </Text>
          </Pressable>
        </View>

        <View style={{ height: 10 }} />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Pressable
            style={{
              marginBottom: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flex: 1,
              marginHorizontal: 10,
              marginVertical: 8,
              backgroundColor: "#282828",
              borderRadius: 4,
              elevation: 3,
            }}
          >
            <LinearGradient colors={["#33006f", "#ffff"]}>
              <Pressable
                style={{
                  width: 55,
                  justifyContent: "center",
                  alignItems: "center",
                  height: 55,
                }}
              >
                <Octicons name="heart-fill" size={24} color="white" />
              </Pressable>
            </LinearGradient>

            <Text style={{ color: "white", fontSize: 13, fontWeight: "bold" }}>
              Liked Songs
            </Text>
          </Pressable>

          <View
            style={{
              marginBottom: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flex: 1,
              marginHorizontal: 10,
              marginVertical: 8,
              backgroundColor: "#282828",
              borderRadius: 4,
              elevation: 3,
            }}
          >
            <Image
              style={{ width: 55, height: 55 }}
              source={{ uri: "https://i.pravatar.cc/300" }}
            />
            <View>
              <Text style={{ color: "#fff", fontSize: 13, fontWeight: "bold" }}>
                Hiphop Tamhiza
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
