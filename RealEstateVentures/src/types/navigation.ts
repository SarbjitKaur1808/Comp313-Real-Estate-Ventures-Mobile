import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Marketplace: undefined;
  ContactUs: undefined;
  SignIn: undefined;
  ListingDetail: { listingId: string };
};

export type ListingItemNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ListingDetail'
>;
