import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {ListingItemNavigationProp} from '../types/navigation';
// import { MdLocationOn, MdFavorite, MdFavoriteBorder } from "react-icons/md";
// import { Listing } from "../types"; // Assume Listing is a TypeScript type for your listing data

interface ListingItemProps {
  listing: any;
  onFavoriteToggle: (listingId: string) => void;
  isFavorite?: boolean;
}

export default function ListingItem({
  listing,
  onFavoriteToggle,
  isFavorite = false,
}: ListingItemProps) {
  const [isFavorited, setIsFavorited] = useState(isFavorite);
  const navigation = useNavigation<ListingItemNavigationProp>();

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
    onFavoriteToggle(listing._id);
  };

  const handlePress = () => {
    navigation.navigate('ListingDetail', {listingId: listing._id});
  };
  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Image source={{uri: listing.imageUrls[0]}} style={styles.image} />

      <View
        style={[
          styles.typeContainer,
          listing.type === 'rent' ? styles.rentType : styles.saleType,
        ]}>
        <Text
          style={[
            styles.typeText,
            listing.type === 'rent' ? styles.rentText : styles.saleText,
          ]}>
          {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{listing.name}</Text>

        <View style={styles.locationContainer}>
          {/* <MdLocationOn style={styles.icon} /> */}
          <Text style={styles.locationText}>{listing.address}</Text>
        </View>

        <Text style={styles.price}>
          ${listing.price.toLocaleString('en-US')}
          {listing.type === 'rent' && ' / month'}
        </Text>

        <View style={styles.detailsContainer}>
          <Text style={styles.detailText}>
            {listing.bedrooms > 1
              ? `${listing.bedrooms} beds`
              : `${listing.bedrooms} bed`}
          </Text>
          <Text style={styles.detailText}>
            {listing.bathrooms > 1
              ? `${listing.bathrooms} baths`
              : `${listing.bathrooms} bath`}
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleFavoriteClick}
          style={styles.favoriteButton}>
          {/* {isFavorited ? <MdFavorite size={24} color="red" /> : <MdFavoriteBorder size={24} color="red" />} */}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 180,
  },
  typeContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderBottomRightRadius: 8,
  },
  rentType: {
    backgroundColor: '#34D399',
  },
  saleType: {
    backgroundColor: '#F87171',
  },
  typeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rentText: {
    color: 'black',
  },
  saleText: {
    color: 'white',
  },
  contentContainer: {
    padding: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  icon: {
    marginRight: 6,
  },
  locationText: {
    fontSize: 14,
    color: '#6B7280',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B5563',
    marginVertical: 4,
  },
  detailsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  detailText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
});
