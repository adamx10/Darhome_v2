import { create } from 'zustand';
import api from '../services/api';

// Fonction d'aide pour formater clairement les erreurs pour un débutant
const getErrorMessage = (err, defaultFallback) => {
  // 1. Si le backend Express a renvoyé un message précis (ex: "Email déjà existant")
  if (err.response?.data?.message) {
    return err.response.data.message;
  }
  // 2. Si le backend n'est pas allumé ou inaccessible par le réseau
  if (err.message?.includes('Network Error') || err.code === 'ERR_NETWORK' || err.code === 'ECONNREFUSED') {
    return "Impossible de joindre le serveur. T'akéd que 'npm start' khddam f dossier backend w que le PC w le téléphone f nafs le Wi-Fi.";
  }
  if (err.code === 'ECONNABORTED') {
    return "Délai d'attente dépassé (Timeout). Le serveur met trop de temps à répondre.";
  }
  return err.message || defaultFallback;
};

// --- Store Zustand pour l'authentification ---
export const useAuthStore = create((set, get) => ({
  // 1. Données globales (State)
  user: null,        // Profil : { id, nom, email, telephone, role }
  token: null,       // Jeton JWT
  isLoading: false,  // Pour afficher un indicateur de chargement
  error: null,       // Message d'erreur clair

  // 2. Action de Connexion (Login)
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/auth/login', { email, password });
      const { user, token } = response.data;

      // Attacher le token aux futures requêtes Axios
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      set({ user, token, isLoading: false, error: null });
      return { success: true, user };
    } catch (err) {
      const message = getErrorMessage(err, 'Connexion échouée. Vérifiez vos identifiants.');
      set({ error: message, isLoading: false });
      return { success: false, message };
    }
  },

  // 3. Action d'Inscription (Register)
  register: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/auth/register', userData);
      set({ isLoading: false, error: null });
      return { success: true, message: response.data?.message };
    } catch (err) {
      const message = getErrorMessage(err, "Erreur lors de l'inscription.");
      set({ error: message, isLoading: false });
      return { success: false, message };
    }
  },

  // 4. Action de Déconnexion (Logout)
  logout: () => {
    delete api.defaults.headers.common['Authorization'];
    set({ user: null, token: null, error: null });
  },

  // Réinitialiser les erreurs
  clearError: () => set({ error: null }),
}));
