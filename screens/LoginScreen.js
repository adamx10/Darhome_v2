import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen({ navigation }) {
  // --- États du formulaire (States) ---
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // --- Fonction de connexion ---
  const handleLogin = () => {
    console.log('Connexion avec :', email, password);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Barre du haut : Logo & Notification */}
        <View style={styles.topBar}>
          <View style={styles.brandRow}>
            <Text style={styles.brandIcon}>🏠</Text>
            <Text style={styles.brandText}>DARHOME</Text>
          </View>
          <TouchableOpacity style={styles.iconCircle}>
            <Text style={styles.bellIcon}>🔔</Text>
          </TouchableOpacity>
        </View>

        {/* 2. Titre & Sous-titre */}
        <View style={styles.header}>
          <Text style={styles.title}>Bienvenue chez vous</Text>
          <Text style={styles.subtitle}>
            Votre nouveau chez-vous au Maroc commence ici
          </Text>
        </View>

        {/* 3. Onglets : Connexion / Créer un compte */}
        <View style={styles.tabContainer}>
          <TouchableOpacity style={[styles.tabButton, styles.activeTab]}>
            <Text style={styles.activeTabText}>Connexion</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => navigation?.navigate('Register')}
          >
            <Text style={styles.inactiveTabText}>Créer un compte</Text>
          </TouchableOpacity>
        </View>

        {/* 4. Formulaire de connexion */}
        <View style={styles.form}>
          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Adresse email *</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputIcon}>✉️</Text>
              <TextInput
                style={styles.input}
                placeholder="mehdi@exemple.ma"
                placeholderTextColor="#A0A0A0"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Mot de passe */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mot de passe *</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputIcon}>🔒</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••••••"
                placeholderTextColor="#A0A0A0"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Se souvenir de moi & Mot de passe oublié */}
          <View style={styles.rowBetween}>
            <TouchableOpacity
              style={styles.checkboxRow}
              activeOpacity={0.8}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
                {rememberMe && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.checkboxLabel}>Se souvenir de moi</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>
            </TouchableOpacity>
          </View>

          {/* Bouton Se connecter */}
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.85}
            onPress={handleLogin}
          >
            <Text style={styles.primaryButtonText}>Se connecter →</Text>
          </TouchableOpacity>

          {/* Séparateur "Ou continuer avec" */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Ou continuer avec</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Boutons de connexion Sociale */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
              <Text style={styles.googleIcon}>G</Text>
              <Text style={styles.socialText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
              <Text style={styles.appleIcon}></Text>
              <Text style={styles.socialText}>Apple</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 5. Lien vers inscription */}
        <View style={styles.footerLinkRow}>
          <Text style={styles.footerGrayText}>Pas de compte ? </Text>
          <TouchableOpacity onPress={() => navigation?.navigate('Register')}>
            <Text style={styles.footerOrangeText}>Créer un compte</Text>
          </TouchableOpacity>
        </View>

        {/* 6. Badge de confiance et sécurité */}
        <View style={styles.securityBadge}>
          <Text style={styles.securityText}>
            🛡️ Transactions sécurisées • Réseau vérifié au Maroc
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
  },
  // --- Barre du haut ---
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandIcon: {
    fontSize: 20,
    marginRight: 6,
  },
  brandText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#B84A36', // Terracotta
    letterSpacing: 1.5,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellIcon: {
    fontSize: 16,
  },
  // --- Titres ---
  header: {
    alignItems: 'center',
    marginBottom: 22,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: '#777777',
    textAlign: 'center',
  },
  // --- Onglets (Tabs) ---
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#EFEFEF',
    borderRadius: 24,
    padding: 4,
    marginBottom: 24,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  activeTabText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1C1C1E',
  },
  inactiveTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#777777',
  },
  // --- Formulaire ---
  form: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2C2C2E',
    marginBottom: 7,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  inputIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#1C1C1E',
  },
  eyeIcon: {
    fontSize: 16,
    padding: 4,
  },
  // --- Checkbox & Forgot Password ---
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
    marginBottom: 20,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1.5,
    borderColor: '#C0C0C0',
    borderRadius: 4,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkboxActive: {
    backgroundColor: '#B84A36',
    borderColor: '#B84A36',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 13,
    color: '#555555',
  },
  forgotPassword: {
    fontSize: 13,
    color: '#B84A36',
    fontWeight: '600',
  },
  // --- Bouton principal ---
  primaryButton: {
    backgroundColor: '#B84A36',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#B84A36',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 3,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  // --- Séparateur ---
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E5E5',
  },
  dividerText: {
    marginHorizontal: 10,
    fontSize: 12,
    color: '#8E8E93',
  },
  // --- Boutons Sociaux ---
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 12,
    paddingVertical: 12,
  },
  googleIcon: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EA4335',
    marginRight: 8,
  },
  appleIcon: {
    fontSize: 18,
    color: '#000000',
    marginRight: 8,
  },
  socialText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  // --- Bas de page ---
  footerLinkRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 26,
    marginBottom: 16,
  },
  footerGrayText: {
    fontSize: 13,
    color: '#666666',
  },
  footerOrangeText: {
    fontSize: 13,
    color: '#B84A36',
    fontWeight: 'bold',
  },
  securityBadge: {
    alignItems: 'center',
    marginTop: 8,
  },
  securityText: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'center',
  },
});
