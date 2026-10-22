import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- Données d'exemple (Faciles à modifier ou à connecter à une API plus tard) ---
const PROPERTIES = [
  {
    id: '1',
    category: 'Appartement',
    typeTag: 'Duplex contemporain',
    badge: '✓ Certifié DARHOME',
    title: 'Superbe Duplex avec Terrasse',
    location: 'Gauthier, Casablanca',
    rooms: '3 Ch.',
    baths: '2 Sdb.',
    surface: '150 m²',
    price: '14 000 DH',
    period: '/ mois',
    rating: '4.9',
    reviews: '38',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '2',
    category: 'Riad',
    typeTag: 'Riad de charme',
    badge: '✓ Piscine & Hammam',
    title: 'Riad Rénové avec Piscine & Patio',
    location: 'Médina, Marrakech',
    rooms: '4 Ch.',
    baths: '4 Sdb.',
    surface: '210 m²',
    price: '22 000 DH',
    period: '/ mois',
    rating: '4.95',
    reviews: '52',
    image:
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '3',
    category: 'Appartement',
    typeTag: 'Appartement Moderne',
    badge: '✓ Garage inclus',
    title: 'Bel Appartement Moderne avec Balcon',
    location: 'Agdal, Rabat',
    rooms: '2 Ch.',
    baths: '1 Sdb.',
    surface: '95 m²',
    price: '8 500 DH',
    period: '/ mois',
    rating: '4.88',
    reviews: '24',
    image:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop',
  },
];

const CATEGORIES = [
  { id: 'all', label: 'Tous', icon: '⬛' },
  { id: 'Appartement', label: 'Appartement', icon: '🏢' },
  { id: 'Villa', label: 'Villa', icon: '🏡' },
  { id: 'Riad', label: 'Riad', icon: '🏰' },
  { id: 'Studio', label: 'Studio', icon: '🛋️' },
];

export default function HomeScreen({ navigation }) {
  // --- États simples (States) ---
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [favorites, setFavorites] = useState({});
  const [activeTab, setActiveTab] = useState('explore');

  // Fonction pour ajouter/retirer des favoris
  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ 
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Filtrer les annonces par catégorie et par recherche
  const filteredProperties = PROPERTIES.filter((item) => {
    const matchesCategory =
      selectedCategory === 'Tous' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />

      {/* 1. Header (Logo + Notification + Langue) */}
      <View style={styles.headerBar}>
        <View style={styles.brandRow}>
          <Text style={styles.brandIcon}>🏠</Text>
          <Text style={styles.brandText}>DARHOME</Text>
        </View>

        <View style={styles.headerRight}>
          {/* Bouton Notification avec petit point rouge */}
          <TouchableOpacity style={styles.iconCircle}>
            <Text style={styles.iconText}>🔔</Text>
            <View style={styles.notificationDot} />
          </TouchableOpacity>

          {/* Sélecteur de langue FR */}
          <TouchableOpacity style={styles.langPill}>
            <Text style={styles.langText}>FR</Text>
            <Text style={styles.langArrow}>⌄</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* 2. Barre de Recherche "DESTINATION" */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputRow}>
            <Text style={styles.searchIcon}>🔍</Text>
            <View style={styles.searchTextWrapper}>
              <Text style={styles.destinationLabel}>DESTINATION</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="Casablanca, Marrakech, Tanger..."
                placeholderTextColor="#999999"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          {/* Bouton Filtres terracotta */}
          <TouchableOpacity style={styles.filterButton} activeOpacity={0.8}>
            <Text style={styles.filterIcon}>🎛️</Text>
          </TouchableOpacity>
        </View>

        {/* 3. Filtres horizontaux par catégories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesRow}
        >
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.label;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[styles.categoryPill, isActive && styles.categoryPillActive]}
                onPress={() => setSelectedCategory(cat.label)}
                activeOpacity={0.8}
              >
                <Text style={styles.categoryIcon}>{cat.icon}</Text>
                <Text
                  style={[styles.categoryText, isActive && styles.categoryTextActive]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* 4. Titre de la section */}
        <View style={styles.sectionHeader}>
          <View>
            <View style={styles.titleRow}>
              <Text style={styles.sectionTitle}>Propriétés à la location</Text>
              <View style={styles.countBadge}>
                <Text style={styles.countText}>{filteredProperties.length} annonces</Text>
              </View>
            </View>
            <Text style={styles.sectionSubtitle}>Vérifiées et prêtes à habiter</Text>
          </View>
        </View>

        {/* 5. Liste des cartes d'annonces */}
        {filteredProperties.map((item) => {
          const isFav = favorites[item.id];
          return (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              activeOpacity={0.9}
            >
              {/* Image et Badges par-dessus */}
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.cardImage} />

                {/* Badge en haut à gauche (Type) */}
                <View style={styles.typeBadge}>
                  <Text style={styles.typeBadgeText}>{item.typeTag}</Text>
                </View>

                {/* Bouton Favori en haut à droite */}
                <TouchableOpacity
                  style={styles.favoriteCircle}
                  onPress={() => toggleFavorite(item.id)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.favoriteIcon}>{isFav ? '❤️' : '🤍'}</Text>
                </TouchableOpacity>

                {/* Badge de certification en bas à gauche */}
                <View style={styles.certifBadge}>
                  <Text style={styles.certifText}>{item.badge}</Text>
                </View>
              </View>

              {/* Détails de la propriété */}
              <View style={styles.cardContent}>
                {/* Localisation */}
                <View style={styles.locationRow}>
                  <Text style={styles.locationPin}>📍</Text>
                  <Text style={styles.locationText}>{item.location}</Text>
                </View>

                {/* Titre */}
                <Text style={styles.cardTitle} numberOfLines={1}>
                  {item.title}
                </Text>

                {/* Caractéristiques (Chambres, Salles de bain, Surface) */}
                <View style={styles.specsRow}>
                  <Text style={styles.specItem}>🛏️ {item.rooms}</Text>
                  <Text style={styles.dot}>•</Text>
                  <Text style={styles.specItem}>🚿 {item.baths}</Text>
                  <Text style={styles.dot}>•</Text>
                  <Text style={styles.specItem}>📐 {item.surface}</Text>
                </View>

                {/* Ligne Prix & Note */}
                <View style={styles.priceRow}>
                  <View style={styles.priceContainer}>
                    <Text style={styles.priceValue}>{item.price}</Text>
                    <Text style={styles.pricePeriod}> {item.period}</Text>
                  </View>

                  <View style={styles.ratingBadge}>
                    <Text style={styles.starIcon}>⭐</Text>
                    <Text style={styles.ratingValue}>{item.rating}</Text>
                    <Text style={styles.ratingReviews}> ({item.reviews})</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* 6. Barre de navigation en bas (Bottom Tab Bar) */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => setActiveTab('explore')}
        >
          <Text style={[styles.tabIcon, activeTab === 'explore' && styles.tabIconActive]}>
            🔍
          </Text>
          <Text
            style={[styles.tabLabel, activeTab === 'explore' && styles.tabLabelActive]}
          >
            Explorer
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => setActiveTab('favorites')}
        >
          <Text style={[styles.tabIcon, activeTab === 'favorites' && styles.tabIconActive]}>
            🤍
          </Text>
          <Text
            style={[styles.tabLabel, activeTab === 'favorites' && styles.tabLabelActive]}
          >
            Favoris
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => setActiveTab('messages')}
        >
          <Text style={[styles.tabIcon, activeTab === 'messages' && styles.tabIconActive]}>
            💬
          </Text>
          <Text
            style={[styles.tabLabel, activeTab === 'messages' && styles.tabLabelActive]}
          >
            Messages
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => setActiveTab('profile')}
        >
          <Text style={[styles.tabIcon, activeTab === 'profile' && styles.tabIconActive]}>
            👤
          </Text>
          <Text
            style={[styles.tabLabel, activeTab === 'profile' && styles.tabLabelActive]}
          >
            Profil
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  // --- Header du haut ---
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandIcon: {
    fontSize: 22,
    marginRight: 6,
  },
  brandText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#B84A36', // Terracotta
    letterSpacing: 1.5,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  iconText: {
    fontSize: 16,
  },
  notificationDot: {
    position: 'absolute',
    top: 7,
    right: 8,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#E53935',
  },
  langPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  langText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333333',
  },
  langArrow: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 4,
  },
  // --- Barre de recherche ---
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 16,
    paddingLeft: 14,
    paddingRight: 6,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  searchInputRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  searchTextWrapper: {
    flex: 1,
  },
  destinationLabel: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#8E8E93',
    letterSpacing: 0.8,
  },
  searchInput: {
    fontSize: 13,
    color: '#1C1C1E',
    paddingVertical: 2,
  },
  filterButton: {
    backgroundColor: '#B84A36',
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterIcon: {
    fontSize: 18,
  },
  // --- Filtres Horizontaux (Catégories) ---
  categoriesRow: {
    paddingHorizontal: 20,
    gap: 8,
    marginBottom: 20,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
  },
  categoryPillActive: {
    backgroundColor: '#1C1C1E',
    borderColor: '#1C1C1E',
  },
  categoryIcon: {
    fontSize: 13,
    marginRight: 6,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333333',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  // --- Section Titre ---
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C1C1E',
  },
  countBadge: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  countText: {
    fontSize: 11,
    color: '#666666',
    fontWeight: '500',
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#8E8E93',
  },
  // --- Cartes des Propriétés ---
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  typeBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
  },
  typeBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  favoriteCircle: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  favoriteIcon: {
    fontSize: 16,
  },
  certifBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  certifText: {
    color: '#2E7D32',
    fontSize: 11,
    fontWeight: 'bold',
  },
  cardContent: {
    padding: 14,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationPin: {
    fontSize: 12,
    marginRight: 4,
  },
  locationText: {
    fontSize: 12,
    color: '#B84A36',
    fontWeight: '600',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  specsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  specItem: {
    fontSize: 12,
    color: '#666666',
  },
  dot: {
    marginHorizontal: 8,
    color: '#CCCCCC',
    fontSize: 12,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
    paddingTop: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#B84A36',
  },
  pricePeriod: {
    fontSize: 12,
    color: '#8E8E93',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9F5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFE0D1',
  },
  starIcon: {
    fontSize: 11,
    marginRight: 3,
  },
  ratingValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1C1C1E',
  },
  ratingReviews: {
    fontSize: 11,
    color: '#8E8E93',
  },
  // --- Barre de Navigation en bas ---
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingVertical: 8,
  },
  bottomTab: {
    alignItems: 'center',
    paddingVertical: 4,
    flex: 1,
  },
  tabIcon: {
    fontSize: 18,
    marginBottom: 3,
    color: '#8E8E93',
  },
  tabIconActive: {
    color: '#B84A36',
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: '#8E8E93',
  },
  tabLabelActive: {
    color: '#B84A36',
    fontWeight: 'bold',
  },
});

