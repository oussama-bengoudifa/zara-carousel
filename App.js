import * as React from "react";
import {
  Image,
  View,
  StatusBar,
  Dimensions,
  StyleSheet,
  Animated,
  Text,
  SafeAreaView,
} from "react-native";

import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("screen");

const ITEM_WIDTH = width;
const ITEM_HEIGHT = height * 0.75;

const DOT_SIZE = 8;

const images = [
  "https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_1_1_1.jpg?ts=1606727905128",
  "https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_1_1.jpg?ts=1606727908993",
  "https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_2_1.jpg?ts=1606727889015",
  "https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_3_1.jpg?ts=1606727896369",
  "https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_4_1.jpg?ts=1606727898445",
];

const product = {
  title: "SOFT MINI CROSSBODY BAG WITH KISS LOCK",
  description: [
    "Mini crossbody bag available in various colours. Featuring two compartments. Handles and detachable crossbody shoulder strap. Lined interior. Clasp with two metal pieces.",
    'Height x Length x Width: 14 x 21.5 x 4.5 cm. / 5.5 x 8.4 x 1.7"',
  ],
  price: "29.99£",
};

export default () => {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <StatusBar hidden />
        <View
          style={{
            height: ITEM_HEIGHT,
            overflow: "hidden",
          }}
        >
          <Animated.FlatList
            data={images}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} alt="image" style={styles.image} />
            )}
            showsVerticalScrollIndicator={false}
            bounces={false}
            snapToInterval={ITEM_HEIGHT}
            decelerationRate="fast"
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      y: scrollY,
                    },
                  },
                },
              ],
              {
                useNativeDriver: true,
              }
            )}
          />
          <View style={styles.pagination}>
            {images.map((_, index) => (
              <View key={index} style={[styles.dot]}></View>
            ))}
            <Animated.View
              style={[
                styles.dotIndicator,
                {
                  transform: [
                    {
                      translateY: Animated.divide(
                        scrollY,
                        ITEM_HEIGHT
                      ).interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, DOT_SIZE * 2],
                      }),
                    },
                  ],
                },
              ]}
            ></Animated.View>
          </View>
        </View>
        <BottomSheet snapPoints={[height - ITEM_HEIGHT, height - 100]}>
          <BottomSheetScrollView
            style={{
              backgroundColor: "white",
            }}
            contentContainerStyle={{
              padding: 20,
            }}
          >
            <Text
              style={{
                fontWeight: "800",
                fontSize: 16,
                textTransform: "uppercase",
              }}
            >
              {product.title}
            </Text>
            <Text
              style={{
                fontSize: 16,
              }}
            >
              {product.price}
            </Text>

            {[...Array(10)].map((_, index) => (
              <View
                style={{
                  marginVertical: 20,
                }}
                key={index}
              >
                {product.description.map((text, index) => (
                  <Text
                    style={{
                      marginBottom: 10,
                      lineHeight: 22,
                    }}
                    key={index}
                  >
                    {text}
                  </Text>
                ))}
              </View>
            ))}
          </BottomSheetScrollView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    resizeMode: "cover",
  },
  pagination: {
    position: "absolute",
    top: ITEM_HEIGHT / 2,
    left: 20,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE,
    backgroundColor: "#333",
    marginBottom: DOT_SIZE,
  },
  dotIndicator: {
    width: DOT_SIZE * 2,
    height: DOT_SIZE * 2,
    borderRadius: DOT_SIZE * 2,
    borderWidth: 1,
    borderColor: "#333",
    position: "absolute",
    left: -DOT_SIZE / 2,
    top: -DOT_SIZE / 2,
  },
});
