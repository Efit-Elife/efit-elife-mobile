import React, { useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { SimplifiedFoodItem, EdamamModelConverter, EdamamApiResponse } from '@/types/edamam-api';
import { InfiniteData } from '@tanstack/react-query';
import { FoodListSkeleton } from '@/components/SkeletonLoader';

interface LazyFoodListProps {
  data: InfiniteData<EdamamApiResponse> | undefined;
  onFoodPress: (food: SimplifiedFoodItem) => void;
  loading?: boolean;
  error?: string | null;
  onLoadMore?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
}

const LazyFoodItem: React.FC<{ 
  item: SimplifiedFoodItem; 
  onPress: (food: SimplifiedFoodItem) => void;
}> = React.memo(({ item, onPress }) => (
  <TouchableOpacity style={styles.foodItem} onPress={() => onPress(item)}>
    {item.image ? (
      <Image 
        source={{ uri: item.image }} 
        style={styles.foodImage}
        defaultSource={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==' }}
      />
    ) : (
      <View style={styles.placeholderImage}>
        <Text style={styles.placeholderText}>🍽️</Text>
      </View>
    )}
    
    <View style={styles.foodInfo}>
      <Text style={styles.foodName} numberOfLines={2}>
        {item.name}
      </Text>
      <Text style={styles.foodCategory}>{item.category}</Text>
      
      <View style={styles.nutritionRow}>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionValue}>{item.calories}</Text>
          <Text style={styles.nutritionLabel}>cal</Text>
        </View>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionValue}>{item.protein}g</Text>
          <Text style={styles.nutritionLabel}>protein</Text>
        </View>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionValue}>{item.carbs}g</Text>
          <Text style={styles.nutritionLabel}>carbs</Text>
        </View>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionValue}>{item.fat}g</Text>
          <Text style={styles.nutritionLabel}>fat</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
));

const LoadMoreButton: React.FC<{
  onPress: () => void;
  loading: boolean;
}> = ({ onPress, loading }) => (
  <TouchableOpacity 
    style={styles.loadMoreButton} 
    onPress={onPress}
    disabled={loading}
  >
    {loading ? (
      <ActivityIndicator size="small" color="#4285F4" />
    ) : (
      <Text style={styles.loadMoreText}>Load More Foods</Text>
    )}
  </TouchableOpacity>
);

export const LazyFoodList: React.FC<LazyFoodListProps> = ({ 
  data,
  onFoodPress, 
  loading = false, 
  error = null,
  onLoadMore,
  hasNextPage = false,
  isFetchingNextPage = false
}) => {
  // Flatten the infinite data into a single array
  const foods = useMemo(() => {
    if (!data?.pages) return [];
    
    return data.pages.flatMap(page => 
      page.hints.map(hint => EdamamModelConverter.toSimplifiedFoodItem(hint))
    );
  }, [data]);

  const renderItem = useCallback(({ item }: { item: SimplifiedFoodItem }) => (
    <LazyFoodItem item={item} onPress={onFoodPress} />
  ), [onFoodPress]);

  const renderFooter = useCallback(() => {
    if (!hasNextPage && foods.length > 0) {
      return (
        <View style={styles.endMessage}>
          <Text style={styles.endMessageText}>No more foods to load</Text>
        </View>
      );
    }

    if (hasNextPage && onLoadMore) {
      return (
        <LoadMoreButton 
          onPress={onLoadMore} 
          loading={isFetchingNextPage} 
        />
      );
    }

    return null;
  }, [hasNextPage, onLoadMore, isFetchingNextPage, foods.length]);

  const keyExtractor = useCallback((item: SimplifiedFoodItem) => item.id, []);
  if (loading && foods.length === 0) {
    return <FoodListSkeleton count={8} />;
  }
  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => console.log('Retry pressed')}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (foods.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No foods found</Text>
        <Text style={styles.emptySubtext}>Try a different search term or category</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={foods}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ListFooterComponent={renderFooter}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={10}
      initialNumToRender={8}
      getItemLayout={(data, index) => ({
        length: 120, // Approximate item height
        offset: 120 * index,
        index,
      })}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage && onLoadMore) {
          onLoadMore();
        }
      }}
      onEndReachedThreshold={0.5}
    />
  );
};

const styles = StyleSheet.create({
  foodItem: {
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
    height: 104, // Fixed height for getItemLayout
  },
  foodImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  placeholderImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 32,
  },
  foodInfo: {
    flex: 1,
    marginLeft: 16,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  foodCategory: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nutritionItem: {
    alignItems: 'center',
  },
  nutritionValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4285F4',
  },
  nutritionLabel: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#DC2626',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#4285F4',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  loadMoreButton: {
    margin: 16,
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  loadMoreText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4285F4',
  },
  endMessage: {
    padding: 20,
    alignItems: 'center',
  },
  endMessageText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
});
