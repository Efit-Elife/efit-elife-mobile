import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchQuery,
  addToSearchHistory,
  selectSearchQuery,
  selectSearchHistory,
} from "../store/foodSlice";
import { RootState } from "@/store";
import { useDebouncedSearch } from "@/hooks/useDebounce";

interface EdamamSearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const EdamamSearchBar: React.FC<EdamamSearchBarProps> = ({
  onSearch,
  placeholder = "Search for foods...",
}) => {
  const dispatch = useDispatch();
  const storedSearchQuery = useSelector((state: RootState) =>
    selectSearchQuery(state)
  );
  const searchHistory = useSelector((state: RootState) =>
    selectSearchHistory(state)
  );
  const [showHistory, setShowHistory] = useState(false);

  // Use debounced search to prevent excessive API calls
  const { searchValue, debouncedSearchValue, setSearchValue } =
    useDebouncedSearch("", 500);

  // Sync with Redux store
  useEffect(() => {
    if (storedSearchQuery !== searchValue) {
      setSearchValue(storedSearchQuery);
    }
  }, [storedSearchQuery, setSearchValue, searchValue]);

  // Trigger search when debounced value changes
  useEffect(() => {
    if (
      debouncedSearchValue.trim() &&
      debouncedSearchValue !== storedSearchQuery
    ) {
      dispatch(addToSearchHistory(debouncedSearchValue.trim()));
      onSearch(debouncedSearchValue.trim());
      setShowHistory(false);
    } else if (!debouncedSearchValue.trim()) {
      onSearch(""); // Clear search results
    }
  }, [debouncedSearchValue, onSearch, dispatch, storedSearchQuery]);

  const handleSearch = () => {
    if (searchValue.trim()) {
      dispatch(addToSearchHistory(searchValue.trim()));
      dispatch(setSearchQuery(searchValue.trim()));
      onSearch(searchValue.trim());
      setShowHistory(false);
    }
  };

  const handleHistoryItemPress = (historyQuery: string) => {
    setSearchValue(historyQuery);
    dispatch(setSearchQuery(historyQuery));
    onSearch(historyQuery);
    setShowHistory(false);
  };

  const handleInputChange = (text: string) => {
    setSearchValue(text);
    dispatch(setSearchQuery(text));
    setShowHistory(text.length > 0 && searchHistory.length > 0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchValue}
          onChangeText={handleInputChange}
          placeholder={placeholder}
          placeholderTextColor="#666"
          returnKeyType="search"
          onSubmitEditing={handleSearch}
          onFocus={() =>
            setShowHistory(searchValue.length > 0 && searchHistory.length > 0)
          }
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearch}
          disabled={!searchValue.trim()}
        >
          <Text
            style={[
              styles.searchButtonText,
              !searchValue.trim() && styles.searchButtonTextDisabled,
            ]}
          >
            Search
          </Text>
        </TouchableOpacity>
      </View>

      {showHistory ? (
        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>Recent Searches</Text>
          {searchHistory.slice(0, 5).map((historyItem, index) => (
            <TouchableOpacity
              key={index}
              style={styles.historyItem}
              onPress={() => handleHistoryItemPress(historyItem)}
            >
              <Text style={styles.historyItemText}>{historyItem}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000393",
    paddingHorizontal: 16,
    paddingTop: 16,
    zIndex: 1000,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
    color: "#333",
  },
  searchButton: {
    backgroundColor: "#4285F4",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  searchButtonTextDisabled: {
    color: "#999",
  },
  historyContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginTop: 8,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  historyTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
    paddingHorizontal: 16,
    paddingBottom: 8,
    textTransform: "uppercase",
  },
  historyItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  historyItemText: {
    fontSize: 14,
    color: "#333",
  },
});
