import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import { Animated, Pressable, StyleSheet, Text } from "react-native";
import DragList from "react-native-draglist";

const MyDraggableList = ({ items }: any) => {
  const [data, setData] = useState(items);

  const onReordered = (newOrder: any) => {
    setData(newOrder); // update state after reorder
  };

  const renderItem = ({ item, onDragStart, onDragEnd, isActive }: any) => {
    return (
      <Pressable
        onLongPress={() => {
          onDragStart();
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }}
        onPressOut={() => {
          onDragEnd();
        }}
      >
        <Animated.View
          style={[styles.item, isActive && { transform: [{ scale: 1.05 }] }]}
        >
          <Text style={styles.text}>{item.label}</Text>
        </Animated.View>
      </Pressable>
    );
  };

  return (
    <DragList
      data={data}
      keyExtractor={(item: any) => item.id}
      renderItem={renderItem}
      onReordered={onReordered}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 16,
    marginVertical: 4,
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  text: { fontSize: 16 },
});

export default MyDraggableList;
