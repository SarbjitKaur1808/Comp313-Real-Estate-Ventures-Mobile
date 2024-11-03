import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListingItem from '../components/ListingItem';

interface Listing {
  _id: string;
  name: string;
}

export function Marketplace() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState<Listing[]>([]);
  const [showMore, setShowMore] = useState(false);
  const [favorites, setFavorites] = useState<Listing[]>([]);
  const [filters, setFilters] = useState({
    type: 'all',
    furnished: 'all',
    parking: 'all',
    sort: 'createdAt',
    order: 'desc',
  });

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const savedFavorites = await AsyncStorage.getItem('favorites');
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites));
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };

    loadFavorites();
  }, []);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      try {
        const res = await fetch(`http://10.0.2.2:3000/api/listing/get`);
        const data = await res.json();
        if (Array.isArray(data)) {
          if (data.length > 8) setShowMore(true);
          setListings(data.slice(0, 8));
        } else {
          console.error('Unexpected response format:', data);
        }
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [filters]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const onShowMoreClick = async () => {
    const startIndex = listings.length;
    const searchQuery = new URLSearchParams({
      ...filters,
      startIndex: startIndex.toString(),
    }).toString();
    try {
      const res = await fetch(`http://10.0.2.2:3000/api/listing/get`);
      const data = await res.json();
      if (Array.isArray(data)) {
        if (data.length < 8) setShowMore(false);
        setListings([...listings, ...data]);
      } else {
        console.error('Unexpected response format:', data);
      }
    } catch (error) {
      console.error('Error fetching more listings:', error);
    }
  };

  const handleFavoriteToggle = async (listing: Listing) => {
    const updatedFavorites = favorites.some(fav => fav._id === listing._id)
      ? favorites.filter(fav => fav._id !== listing._id)
      : [...favorites, listing];

    setFavorites(updatedFavorites);
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleSidebar} style={styles.filterButton}>
        {isSidebarOpen ? (
          <Text style={styles.filterButtonText}>Close Filters</Text>
        ) : (
          <Text style={styles.filterButtonText}>Open Filters</Text>
        )}
      </TouchableOpacity>

      {isSidebarOpen && (
        <View style={styles.sidebar}>
          <Text style={styles.sidebarTitle}>Filters</Text>
          <TouchableOpacity
            onPress={() => setFilters({...filters, type: 'sale'})}>
            <Text style={styles.filterOption}>For Sale</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFilters({...filters, type: 'rent'})}>
            <Text style={styles.filterOption}>For Rent</Text>
          </TouchableOpacity>
        </View>
      )}
      <ScrollView contentContainerStyle={styles.listingContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : listings.length === 0 ? (
          <Text style={styles.noListingText}>No listings found!</Text>
        ) : (
          listings.map(listing => (
            <ListingItem
              key={listing._id}
              listing={listing}
              onFavoriteToggle={() => handleFavoriteToggle(listing)}
              isFavorite={favorites.some(fav => fav._id === listing._id)}
            />
          ))
        )}
          {showMore && (
          <TouchableOpacity onPress={onShowMoreClick} style={styles.showMoreButton}>
            <Text style={styles.showMoreText}>Show more</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A202C",
  },
  filterButton: {
    padding: 10,
    backgroundColor: '#4299E1',
    alignSelf: 'center',
    borderRadius: 5,
    marginVertical: 10,
  },
  filterButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  sidebar: {
    backgroundColor: '#2D3748',
    padding: 15,
    width: '100%',
  },
  sidebarTitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  filterOption: {
    color: '#A0AEC0',
    marginVertical: 5,
  },
  listingContainer: {
    padding: 10,
    alignItems: 'center',
  },
  noListingText: {
    fontSize: 18,
    color: '#A0AEC0',
    marginVertical: 10,
  },
  showMoreButton: {
    padding: 10,
    backgroundColor: '#48BB78',
    borderRadius: 5,
    marginVertical: 10,
  },
  showMoreText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
