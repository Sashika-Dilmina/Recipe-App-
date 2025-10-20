import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors";
import { favouritesStyles } from "@/assets/styles/favourites.styles";

function NoFavouritesFound() {
  const router = useRouter();

  return (
    <View style={favouritesStyles.emptyState}>
      <View style={favouritesStyles.emptyIconContainer}>
        <Ionicons name="heart-outline" size={80} color={COLORS.textLight} />
      </View>
      <Text style={favouritesStyles.emptyTitle}>No favourites yet</Text>
      <TouchableOpacity style={favouritesStyles.exploreButton} onPress={() => router.push("/")}>
        <Ionicons name="search" size={18} color={COLORS.white} />
        <Text style={favouritesStyles.exploreButtonText}>Explore Recipes</Text>
      </TouchableOpacity>
    </View>
  );
}

export default NoFavouritesFound;