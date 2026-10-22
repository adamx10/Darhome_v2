import axios from 'axios';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// ----------------------------------------------------------------------
// 💡 DÉTECTION AUTOMATIQUE DE L'IP DU BACKEND (Pour Débutant) :
//
// 1. En Expo Go (sur vrai téléphone) : Constants.expoConfig?.hostUri
//    contient automatiquement l'adresse IP de ton PC (ex: '192.168.1.15:8081').
// 2. Sur Émulateur Android : 'http://10.0.2.2:3000/api'.
// 3. Sur Simulateur iOS ou Web : 'http://localhost:3000/api'.
// ----------------------------------------------------------------------

const getApiBaseUrl = () => {
  // Détection automatique de l'IP du PC via Expo Go
  const hostUri = Constants.expoConfig?.hostUri;
  if (hostUri) {
    const ip = hostUri.split(':')[0];
    // Si c'est une vraie adresse IP locale (ex: 192.168.x.x ou 10.x.x.x)
    if (ip && !ip.includes('exp.direct') && !ip.includes('tunnel')) {
      return `http://${ip}:3000/api`;
    }
  }

  // Émulateur Android Studio (QEMU)
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:3000/api';
  }

  // Simulateur iOS ou Web
  return 'http://localhost:3000/api';
};

export const API_BASE_URL = getApiBaseUrl();

// Création de l'instance Axios
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 secondes d'attente maximum
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
