import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Dimensions,
  Pressable,
  Alert,
  Keyboard,
} from "react-native";
import { useState, useEffect } from "react";
import { translateApi } from "../api/translateAPi";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../store/historySlice";

// 获取设备宽度
const windowWidth = Dimensions.get("window").width;

// app 封装仓库和路由
export default function HomePage({ navigation }) {
  // dispatch
  const dispatch = useDispatch();

  // 用户输入
  const [inputVul, setInputVul] = useState("");
  const [oldinputVul, setOldInputVul] = useState("");
  // 锁
  const [lock, setLock] = useState(false);
  // 输出展示
  const [outputVul, setOutputVul] = useState("");
  // 获取仓库值
  const { lanList, curIndex } = useSelector((store) => store.language);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      setInputVul("");
      setOutputVul("");
      setOldInputVul("");
    });

    return unsubscribe;
  });

  // 翻译
  const translateNow = async () => {
    // 键盘事件
    Keyboard.dismiss();
    // 条件判断
    if (lock || oldinputVul === inputVul) {
      return;
    }
    if (!inputVul.trim()) {
      Alert.alert("提示", "请输入要翻译的内容");
      setOutputVul("");
      setOldInputVul("");
      return;
    }
    setLock(true);
    setOldInputVul(inputVul);
    // 翻译Api
    const resp = await translateApi(
      inputVul,
      undefined,
      lanList[curIndex].lang
    );
    setOutputVul(resp);
    setLock(false);
    dispatch(addItem({ txt: inputVul, res: resp }));
  };

  return (
    <View style={styles.container}>
      {/* 导航栏目 */}
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.navView}>
        <Text style={{ color: "#aaa" }}>翻译成</Text>
        <AntDesign name="right" size={11} color="#aaa" />
        <Text style={{ color: "#aaa" }}>{lanList[curIndex].chs}</Text>
      </View>
      {/* 上半部分 输入区域*/}
      <TextInput
        style={styles.textInputView}
        multiline={true}
        numberOfLines={10}
        onChangeText={(text) => setInputVul(text.trim())}
        defaultValue={inputVul}
        placeholder="请输入要翻译的内容"
        underlineColorAndroid="#bbb"
        placeholderTextColor="#bbb"
      />

      {/* 下半部分 翻译区域 */}
      <Pressable
        onPress={translateNow}
        style={[
          styles.translateView,
          {
            justifyContent: outputVul === "" ? "center" : "flex-start",
            alignItems: outputVul === "" ? "center" : "flex-start",
          },
        ]}
      >
        <Text>
          {outputVul === "" ? (
            <Text style={styles.translateTip}>请点击此处翻译!</Text>
          ) : (
            outputVul
          )}
        </Text>
      </Pressable>
    </View>
  );
}

// 样式
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navView: {
    flex: 0.1,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    paddingLeft: 10,
  },
  textInputView: {
    flex: 0.7,
    width: windowWidth,
    padding: 15,
    textAlignVertical: "top",
    backgroundColor: "#fff",
  },
  translateView: {
    flex: 0.7,
    width: windowWidth,
    padding: 15,
    backgroundColor: "#fff",
  },
  translateTip: {
    color: "#ccc",
  },
});
