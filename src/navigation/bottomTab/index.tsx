import React from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CurvedBottomBar } from "react-native-curved-bottom-bar";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../../styles/colors"; // Adjust import path as needed
import ForecastScreen from '../../screens/bottomTab/ClinicScreen';
import HistoryScreen from '../../screens/bottomTab/HistoryScreen';
import SettingScreen from '../../screens/bottomTab/SettingScreen';
import HomeScreen from '../../screens/bottomTab/HomeScreen';

export default function CustomTabBar({ navigation }) {
  const _renderIcon = (routeName, selectedTab) => {
    let icon = "";
    let title = "";

    switch (routeName) {
      case "Home":
        icon = "home";
        title = "Home";
        break;
      case "Forecast":
        icon = "cloud";
        title = "Forecast";
        break;
      case "History":
        icon = "time";
        title = "History";
        break;
      case "Setting":
        icon = "settings";
        title = "Settings";
        break;
      default:
        icon = "help";
        title = "Unknown";
    }

    return (
      <View style={styles.tabContainer}>
        <Ionicons
          name={icon}
          size={24}
          color={routeName === selectedTab ? colors.primary : colors.secondary}
        />
        <Text
          style={[
            styles.tabTitle,
            {
              color: routeName === selectedTab ? colors.primary : colors.secondary,
            },
          ]}
        >
          {title}
        </Text>
      </View>
    );
  };

  const renderTabBar = ({ routeName, selectedTab, navigate }) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabbarItem}
      >
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  // If you want a custom center button, you can use this
  // Otherwise, you can remove the renderCircle prop
  const renderCenterButton = ({ selectedTab, navigate }) => (
    <Animated.View style={styles.btnCircleUp}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          // You can navigate to any screen or perform any action
          // For example, navigate to History or show a modal
          navigate("History");
          // Or show an alert/action sheet
          // Alert.alert("Center Button", "Center button pressed!");
        }}
      >
        <Ionicons name="add" size={24} color={colors.white} />
        {/* Or use your custom SVG */}
        {/* <YourCenterSvg width={24} height={24} fill={colors.white} /> */}
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <CurvedBottomBar.Navigator
      type="DOWN"
      style={styles.bottomBar}
      shadowStyle={styles.shadow}
      height={70}
      circleWidth={60}
      bgColor={colors.white}
      initialRouteName="Home"
      borderTopLeftRight
      renderCircle={renderCenterButton} // Remove this if you don't want center button
      tabBar={renderTabBar}
      screenOptions={{
        headerShown: false,
      }}
    >
      <CurvedBottomBar.Screen
        name="Home"
        position="LEFT"
        component={HomeScreen}
      />
      <CurvedBottomBar.Screen
        name="Forecast"
        position="LEFT"
        component={ForecastScreen}
      />
      <CurvedBottomBar.Screen
        name="Setting"
        position="RIGHT"
        component={SettingScreen}
      />
      <CurvedBottomBar.Screen
        name="History"
        position="RIGHT"
        component={HistoryScreen}
      />
    </CurvedBottomBar.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  shadow: {
    shadowColor: "#DDDDDD",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomBar: {},
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    bottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  tabContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabTitle: {
    fontSize: 12,
    marginTop: 4,
    textAlign: "center",
  },
  tabbarItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});