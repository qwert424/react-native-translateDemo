import { StyleSheet, ScrollView, Text, Pressable } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import AntDesign from "@expo/vector-icons/AntDesign";
import { changeCurIndex } from "../store/langeageSlice";

// 语言切换页面
export default function LangeagePage({ navigation }) {
  // 获取仓库值
  const { lanList, curIndex } = useSelector((store) => store.language);

  // dispatch
  const dispatch = useDispatch();

  // 改变选择
  const changeIndex = (index) => {
    dispatch(changeCurIndex(index));
    // 跳转
    navigation.navigate("翻译");
  };

  return (
    <ScrollView style={styles.container}>
      {lanList.map((item, index) => {
        return (
          (curIndex === index && (
            <Pressable
              key={index}
              style={styles.itemContainer}
              onPress={() => changeIndex(index)}
            >
              <Text>{item.chs}</Text>
              <AntDesign name="check" size={16} color="black" />
            </Pressable>
          )) || (
            <Pressable
              key={index}
              style={styles.itemContainer}
              onPress={() => changeIndex(index)}
            >
              <Text>{item.chs}</Text>
            </Pressable>
          )
        );
      })}
    </ScrollView>
  );
}

// 样式
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
