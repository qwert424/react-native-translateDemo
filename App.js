import { StyleSheet, Image } from 'react-native';
// 引入路由
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// 导入页面
import HomePage from './views/HomePage';
import HistoryPage from './views/HistoryPage';
import LanguagePage from './views/LanguagePage';

// 引入静态资源
import HomeIcon from "./assets/icon1.png";
import HistoryIcon from "./assets/icon2.png";
import SelHomeIcon from "./assets/icon1Sel.png"
import SelHistoryIcon from "./assets/icon2Sel.png"

// 导入仓库
import { store } from './store/store'
import { Provider } from 'react-redux'

// 导航器
const TopTab = createMaterialTopTabNavigator();
const BottomTab = createBottomTabNavigator();

// app 封装仓库和路由
export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <BottomTab.Navigator screenOptions={({ route }) => ({
          // 底部样式
          tabBarLabelStyle: { fontSize: 12 },
          tabBarItemStyle: { width: 900 },
          tabBarIcon: ({ focused }) => {
            let iconSource;
            if (route.name === "首页") {
              iconSource = focused ? SelHomeIcon : HomeIcon;
            } else if (route.name === "历史") {
              iconSource = focused ? SelHistoryIcon : HistoryIcon;
            }
            return <Image source={iconSource} style={{ width: 20, height: 20 }} />
          },
          // 字体
          tabBarActiveTintColor: "#4b3c96",
          tabBarInactiveTintColor: "#ccc",
          // 头部样式
          headerStyle: {
            backgroundColor: "#4b3c96",
            height: 50
          },
          headerTintColor: "#fff"
        })}>
          <BottomTab.Screen name="首页"  >
            {() => (
              <TopTab.Navigator>
                <TopTab.Screen name="翻译" component={HomePage} />
                <TopTab.Screen name="语言" component={LanguagePage} />
              </TopTab.Navigator>
            )
            }
          </BottomTab.Screen>
          <BottomTab.Screen name="历史" component={HistoryPage} ></BottomTab.Screen>
        </BottomTab.Navigator>
      </NavigationContainer >
    </Provider>
  );
}



// 样式
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
