import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#000000",
        tabBarInactiveTintColor: "#a9a9a9",
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        headerStyle: styles.header,
        headerTintColor: "#000000",
        headerTitleStyle: styles.headerTitle,
        header: () => (
          <View style={styles.headerContainer}>
            <View style={styles.header} />
            <View style={styles.yellowCircle} />
          </View>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
          title: "Add",
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="folder-open" size={size} color={color} />
          ),
          title: "Library",
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#add8e5",
    borderTopWidth: 1,
    borderTopColor: "#d1d1d1",
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
  headerContainer: {
    position: "relative",
    height: 180,
    backgroundColor: "transparent",
  },
  header: {
    backgroundColor: "#89c7e7",
    height: 120,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  yellowCircle: {
    width: 220,
    height: 140,
    borderRadius: 100,
    backgroundColor: "#FFD301",
    position: "absolute",
    top: -40,
    right: 0,
  },
  headerTitle: {
    fontWeight: "bold",
  },
});
