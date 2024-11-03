import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';

interface Review {
  user: string;
  rating: number;
  comment: string;
}

interface Listing {
  _id: string;
  name: string;
  type: string;
  description: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  furnished: boolean;
  parking: boolean;
  owner: string;
  imageUrls: string[];
  location: {
    latitude: number;
    longitude: number;
  };
}

export const ListingDetail: React.FC = () => {
  const [listing, setListing] = useState<Listing | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  const route = useRoute<any>();
  const listingId = route.params?.listingId;

  useEffect(() => {
    const fetchData = async () => {
      console.log('listingId==', listingId);
      try {
        const res = await fetch(
          `http://10.0.2.2:3000/api/listing/get/${listingId}`,
        );
        const data = await res.json();
        console.log('data===', data);
        if (!data.success) {
          console.log(data.message);
          return;
        }

        setListing(data);

        const reviewsRes = await fetch(`/api/listing/${listingId}/reviews`);
        const reviewsData = await reviewsRes.json();
        setReviews(reviewsData);
      } catch (error) {
        console.log('error===', error);
        console.error('Error fetching listing:', error);
      }
    };

    fetchData();
  }, [listingId]);

//   if (!listing) {
//     return <Text>Loading...</Text>;
//   }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.details}>
        <Text style={styles.type}>{listing?.type}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: '#f9fafb'},
  image: {width: 300, height: 200, borderRadius: 8, marginRight: 10},
  details: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
  },
  type: {
    fontSize: 14,
    color: '#34D399',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  name: {fontSize: 24, fontWeight: 'bold', color: '#1F2937'},
  description: {marginTop: 8, fontSize: 14, color: '#6B7280'},
  locationContainer: {flexDirection: 'row', alignItems: 'center', marginTop: 8},
  location: {fontSize: 16, color: '#6B7280'},
  price: {fontSize: 18, fontWeight: '600', color: '#4B5563', marginTop: 8},
  detailsContainer: {flexDirection: 'row', marginTop: 8},
  detailText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginRight: 12,
  },
  map: {width: '100%', height: 200, borderRadius: 8, marginVertical: 16},
  reviewsContainer: {marginVertical: 16},
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  review: {
    padding: 12,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    marginBottom: 8,
  },
  reviewRating: {color: '#F59E0B', marginBottom: 4},
  reviewUser: {fontWeight: '600', color: '#4B5563'},
  reviewComment: {fontSize: 14, color: '#6B7280'},
  reviewForm: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: 16,
  },
  formTitle: {fontSize: 18, fontWeight: 'bold', marginBottom: 8},
  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    marginBottom: 8,
  },
  submitButton: {
    backgroundColor: '#3B82F6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {color: 'white', fontWeight: 'bold'},
});
