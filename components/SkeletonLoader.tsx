import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

interface SkeletonLoaderProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: any;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ 
  width = '100%', 
  height = 20, 
  borderRadius = 4,
  style
}) => {
  const opacity = React.useRef(new Animated.Value(0.3)).current;

  React.useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();

    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: '#e0e0e0',
          opacity,
        },
        style,
      ]}
    />
  );
};

export const FoodItemSkeleton: React.FC = () => (
  <View style={styles.skeletonItem}>
    <SkeletonLoader width={80} height={80} borderRadius={8} />
    <View style={styles.skeletonInfo}>
      <SkeletonLoader width="80%" height={16} style={{ marginBottom: 8 }} />
      <SkeletonLoader width="60%" height={12} style={{ marginBottom: 12 }} />
      <View style={styles.skeletonNutrition}>
        <SkeletonLoader width={40} height={14} />
        <SkeletonLoader width={40} height={14} />
        <SkeletonLoader width={40} height={14} />
        <SkeletonLoader width={40} height={14} />
      </View>
    </View>
  </View>
);

export const FoodListSkeleton: React.FC<{ count?: number }> = ({ count = 5 }) => (
  <View style={styles.skeletonContainer}>
    {Array.from({ length: count }).map((_, index) => (
      <FoodItemSkeleton key={index} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  skeletonContainer: {
    flex: 1,
  },
  skeletonItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  skeletonInfo: {
    flex: 1,
    marginLeft: 16,
  },
  skeletonNutrition: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default SkeletonLoader;
