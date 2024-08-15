import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useSelector, useDispatch } from "react-redux";
import { deleteAll, deleteItem } from "../store/historySlice";

// 历史翻译页面
export default function HistoryPage() {
  // 获取仓库值
  const { historyList } = useSelector((store) => store.history);
  // dispatch
  const dispatch = useDispatch();

  // 清空全部
  const ifdeleteAllHistory = () => {
    if (!historyList.length) {
      Alert.alert("提醒", "您没有历史记录!");
      return;
    }
    Alert.alert("提醒", "确定要清空全部历史记录吗？", [
      {
        text: "取消",
        style: "cancel",
      },
      { text: "确定", onPress: () => dispatch(deleteAll()) },
    ]);
  };
  // 删除个别记录
  const ifdeleteItem = (index) => {
    Alert.alert("提醒", "确定要删除该条记录吗？", [
      {
        text: "取消",
        style: "cancel",
      },
      { text: "确定", onPress: () => dispatch(deleteItem(index)) },
    ]);
  };
  return (
    <View style={styles.container}>
      {/* 上半部分 清除区域*/}
      <Pressable style={styles.topView} onPress={ifdeleteAllHistory}>
        <Text>清除历史记录</Text>
        <EvilIcons name="trash" size={20} color="black" />
      </Pressable>
      {/* 下半部分 展示区域 */}
      <ScrollView>
        {historyList.map((item, index) => {
          return (
            <Pressable
              key={index}
              style={styles.itemContainer}
              onPress={() => ifdeleteItem(index)}
            >
              {/* 此处可以添加一个ellipsizeMode、numberOfLines使得效果展示更好 */}
              <Text>
                <Text style={{ fontWeight: "900", fontSize: 16 }}>输入: </Text>
                {item.txt}
              </Text>
              <Text>
                <Text style={{ fontWeight: "900", fontSize: 16 }}>翻译: </Text>
                {item.res}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

// 样式
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    justifyContent: "space-between",
  },
});
