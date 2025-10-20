import { View, Text, Alert, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import { useClerk, useUser } from "@clerk/clerk-expo";
import { useEffect, useState } from 'react';
import { API_URL } from '../../constants/api';
import {favouritesStyles} from "../../assets/styles/favourites.styles"
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import RecipeCard from '../../components/RecipeCard';
import NoFavouritesFound from '../../components/NoFavouritesFound';
import LoadingSpinner from '../../components/LoadingSpinner';

const FavouritesScreen = () => {
  const { signOut}= useClerk();
  const { user } = useUser();
  const [favouriteRecipes, setFavoriteRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect (()=> {
    const loadFavourites = async() => {
      try {
        const response = await fetch(`${API_URL}/favourites/${user.id}`)
         if (!response.ok) throw new Error("Failed to fetch favorites");

         
        const favourites = await response.json();

        // transform the data to match the RecipeCard component.s expected format

        const transformedFavourites = favourites.map(favourites => ({
          ...favourites,
          id: favourites.recipeId
        }))

        setFavoriteRecipes(transformedFavourites);
        
      } catch (error) {
        console.log("Error loading favourites", error)
        Alert.alert("Error", "failed to load favourites");
        
      } finally {
        setLoading(false);
      }
    }

    loadFavourites()
  },[user.id]);

  const handleSignOut = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {text:"Cancel", style:"cancel"},
      {text:"Logout", style:"destructive",onPress:signOut},
    ])
  }

  if(loading) return <LoadingSpinner message='Loading your favourites...'/>

  return (
    <View style={favouritesStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={favouritesStyles.header}>
          <Text style={favouritesStyles.title}>Favorites</Text>
          <TouchableOpacity style={favouritesStyles.logoutButton} onPress={handleSignOut}>
            <Ionicons name="log-out-outline" size={22} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        <View style = {favouritesStyles.recipesSection}>
          <FlatList 
            data={favouriteRecipes}
            renderItem={({item}) => <RecipeCard recipe={item} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={favouritesStyles.row}
            contentContainerStyle={favouritesStyles.recipesGrid}
            scrollEnabled={false}
            ListEmptyComponent={<NoFavouritesFound />}
          
          />

        </View>

      </ScrollView>
    </View>
  )
}

export default FavouritesScreen