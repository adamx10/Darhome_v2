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

export default function RegisterScreen({ navigation }) {
  // --- États (States) simples pour débutant ---
  // Rôle sélectionné : 'tenant' (Locataire) ou 'owner' (Propriétaire)
  const [userType, setUserType] = useState('tenant');

  // Champs de saisie
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [cin, setCin] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Fichiers CIN (simulés par un booléen simple pour débutant)
  const [hasRecto, setHasRecto] = useState(false);
  const [hasVerso, setHasVerso] = useState(false);

  // Cases à cocher (Checkboxes)
  const [isOwnerCertified, setIsOwnerCertified] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // --- Fonction d'inscription ---
  const handleRegister = () => {
    console.log('Inscription :', {
      userType,
      fullName,
      birthDate,
      cin,
      phone,
      email,
      password,
    });
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
          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => navigation?.navigate('Login')}
          >
            <Text style={styles.inactiveTabText}>Connexion</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tabButton, styles.activeTab]}>
            <Text style={styles.activeTabText}>Créer un compte</Text>
          </TouchableOpacity>
        </View>

        {/* 4. Sélecteur de rôle : VOUS ÊTES : */}
        <Text style={styles.sectionLabel}>VOUS ÊTES :</Text>
        <View style={styles.roleRow}>
          {/* Option 1 : Je cherche à louer (Locataire) */}
          <TouchableOpacity
            style={[
              styles.roleCard,
              userType === 'tenant' && styles.roleCardActive,
            ]}
            activeOpacity={0.85}
            onPress={() => setUserType('tenant')}
          >
            <View style={styles.roleCardTop}>
              <Text style={styles.roleIcon}>🔑</Text>
              <View
                style={[
                  styles.radioCircle,
                  userType === 'tenant' && styles.radioCircleActive,
                ]}
              >
                {userType === 'tenant' && <View style={styles.radioDot} />}
              </View>
            </View>
            <Text style={styles.roleTitle}>Je cherche à louer</Text>
            <Text style={styles.roleSubtitle}>Locataire / Visiteur</Text>
          </TouchableOpacity>

          {/* Option 2 : Je veux publier (Propriétaire / Bailleur) */}
          <TouchableOpacity
            style={[
              styles.roleCard,
              userType === 'owner' && styles.roleCardActive,
            ]}
            activeOpacity={0.85}
            onPress={() => setUserType('owner')}
          >
            <View style={styles.roleCardTop}>
              <Text style={styles.roleIcon}>🏠</Text>
              <View
                style={[
                  styles.radioCircle,
                  userType === 'owner' && styles.radioCircleActive,
                ]}
              >
                {userType === 'owner' && <View style={styles.radioDot} />}
              </View>
            </View>
            <Text style={styles.roleTitle}>Je veux publier</Text>
            <Text style={styles.roleSubtitle}>Bailleur / Propriétaire vérifié</Text>
          </TouchableOpacity>
        </View>

        {/* 5. Champs du formulaire */}
        <View style={styles.form}>
          {/* Nom complet */}
          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>
                {userType === 'owner'
                  ? 'Nom complet (Nom & Prénom) *'
                  : 'Nom complet *'}
              </Text>
              {userType === 'owner' && (
                <Text style={styles.labelBadge}>Conforme CIN</Text>
              )}
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputIcon}>👤</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Mehdi El Alami"
                placeholderTextColor="#A0A0A0"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>
          </View>

          {/* Champs spécifiques au Propriétaire : Date de naissance & CIN */}
          {userType === 'owner' && (
            <>
              {/* Date de naissance */}
              <View style={styles.inputGroup}>
                <View style={styles.labelRow}>
                  <Text style={styles.label}>Âge & Date de naissance *</Text>
                  <Text style={styles.greenBadge}>✓ 18 ans requis</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputIcon}>📅</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="15/04/1991"
                    placeholderTextColor="#A0A0A0"
                    value={birthDate}
                    onChangeText={setBirthDate}
                    keyboardType="numeric"
                  />
                </View>
                <Text style={styles.helperText}>
                  ℹ️ Minimum 18 ans requis pour publier une annonce légalement
                </Text>
              </View>

              {/* Numéro de CIN */}
              <View style={styles.inputGroup}>
                <View style={styles.labelRow}>
                  <Text style={styles.label}>Numéro de CIN *</Text>
                  <Text style={styles.labelBadge}>Carte Nationale d'Identité</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputIcon}>🪪</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ex: AB123456"
                    placeholderTextColor="#A0A0A0"
                    value={cin}
                    onChangeText={setCin}
                    autoCapitalize="characters"
                  />
                </View>
              </View>
            </>
          )}

          {/* Numéro de téléphone avec drapeau marocain */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Numéro de téléphone *</Text>
            <View style={styles.inputWrapper}>
              <View style={styles.countryCodeBadge}>
                <Text style={styles.flagText}>🇲🇦</Text>
                <Text style={styles.countryCodeText}>+212</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="6 12 34 56 78"
                placeholderTextColor="#A0A0A0"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Adresse email */}
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

          {/* Encadré Vérification CIN (Uniquement pour Propriétaire) */}
          {userType === 'owner' && (
            <View style={styles.cinBox}>
              <View style={styles.cinBoxHeader}>
                <Text style={styles.cinBoxTitle}>🪪 Vérification d'Identité (CIN)</Text>
                <View style={styles.requiredBadge}>
                  <Text style={styles.requiredBadgeText}>Obligatoire</Text>
                </View>
              </View>
              <Text style={styles.cinBoxDesc}>
                Téléversez une copie claire de votre Carte Nationale d'Identité marocaine
                pour certification de votre statut de bailleur.
              </Text>

              {/* 2 Boîtes d'upload Recto / Verso */}
              <View style={styles.uploadRow}>
                <TouchableOpacity
                  style={[styles.uploadCard, hasRecto && styles.uploadCardDone]}
                  onPress={() => setHasRecto(!hasRecto)}
                >
                  <Text style={styles.uploadIcon}>📷</Text>
                  <Text style={styles.uploadTitle}>Recto de la CIN</Text>
                  <Text style={styles.uploadSub}>Face avant</Text>
                  <Text style={styles.uploadReq}>
                    {hasRecto ? '✓ Ajouté' : 'Obligatoire *'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.uploadCard, hasVerso && styles.uploadCardDone]}
                  onPress={() => setHasVerso(!hasVerso)}
                >
                  <Text style={styles.uploadIcon}>🖼️</Text>
                  <Text style={styles.uploadTitle}>Verso de la CIN</Text>
                  <Text style={styles.uploadSub}>Face arrière</Text>
                  <Text style={styles.uploadReq}>
                    {hasVerso ? '✓ Ajouté' : 'Obligatoire *'}
                  </Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.cinLegalText}>
                🔒 Format JPG, PNG ou PDF • Document net et lisible • Conformité légale CNDP
              </Text>
            </View>
          )}

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
            <Text style={styles.helperText}>
              Min. 8 caractères dont 1 chiffre et 1 symbole
            </Text>
          </View>

          {/* Checkboxes de conformité */}
          {userType === 'owner' && (
            <TouchableOpacity
              style={styles.checkboxRow}
              activeOpacity={0.8}
              onPress={() => setIsOwnerCertified(!isOwnerCertified)}
            >
              <View
                style={[
                  styles.checkbox,
                  isOwnerCertified && styles.checkboxActive,
                ]}
              >
                {isOwnerCertified && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.checkboxLabel}>
                Je certifie sur l'honneur avoir plus de 18 ans et être le propriétaire légal
                ou mandataire dûment habilité du bien immobilier proposé.
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.checkboxRow}
            activeOpacity={0.8}
            onPress={() => setAcceptedTerms(!acceptedTerms)}
          >
            <View
              style={[
                styles.checkbox,
                acceptedTerms && styles.checkboxActive,
              ]}
            >
              {acceptedTerms && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>
              J'accepte les{' '}
              <Text style={styles.boldUnderline}>Conditions Générales</Text> et la{' '}
              <Text style={styles.boldUnderline}>Politique de Confidentialité</Text> de
              DARHOME.
            </Text>
          </TouchableOpacity>

          {/* Bouton d'action principal */}
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.85}
            onPress={handleRegister}
          >
            <Text style={styles.primaryButtonText}>
              {userType === 'owner'
                ? "Continuer l'inscription Propriétaire →"
                : 'Créer mon compte DARHOME →'}
            </Text>
          </TouchableOpacity>

          {/* Séparateur */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Ou continuer avec</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Boutons Sociaux */}
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

        {/* 6. Lien de redirection vers connexion */}
        <View style={styles.footerLinkRow}>
          <Text style={styles.footerGrayText}>Vous avez déjà un compte ? </Text>
          <TouchableOpacity onPress={() => navigation?.navigate('Login')}>
            <Text style={styles.footerOrangeText}>Se connecter</Text>
          </TouchableOpacity>
        </View>

        {/* 7. Badge de confiance et sécurité */}
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
    paddingBottom: 36,
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
    marginBottom: 20,
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
  // --- Sélecteur de rôle ---
  sectionLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#8E8E93',
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  roleRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 22,
  },
  roleCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
    borderRadius: 14,
    padding: 14,
  },
  roleCardActive: {
    borderColor: '#B84A36',
    backgroundColor: '#FFF9F7',
  },
  roleCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  roleIcon: {
    fontSize: 20,
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: '#C0C0C0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleActive: {
    borderColor: '#B84A36',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#B84A36',
  },
  roleTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 3,
  },
  roleSubtitle: {
    fontSize: 11,
    color: '#8E8E93',
  },
  // --- Formulaire ---
  form: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 15,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2C2C2E',
  },
  labelBadge: {
    fontSize: 11,
    color: '#8E8E93',
  },
  greenBadge: {
    fontSize: 11,
    color: '#2E7D32',
    fontWeight: '600',
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
  countryCodeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
    paddingRight: 8,
    borderRightWidth: 1,
    borderRightColor: '#E5E5E5',
  },
  flagText: {
    fontSize: 16,
    marginRight: 4,
  },
  countryCodeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  eyeIcon: {
    fontSize: 16,
    padding: 4,
  },
  helperText: {
    fontSize: 11,
    color: '#8E8E93',
    marginTop: 5,
  },
  // --- Boîte CIN (Propriétaire) ---
  cinBox: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F0D4CD',
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
  },
  cinBoxHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  cinBoxTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#B84A36',
  },
  requiredBadge: {
    backgroundColor: '#FDEFE9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  requiredBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#B84A36',
  },
  cinBoxDesc: {
    fontSize: 12,
    color: '#666666',
    lineHeight: 16,
    marginBottom: 12,
  },
  uploadRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  uploadCard: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#D4D4D4',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  uploadCardDone: {
    borderColor: '#2E7D32',
    backgroundColor: '#F1F8F2',
  },
  uploadIcon: {
    fontSize: 22,
    marginBottom: 4,
  },
  uploadTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1C1C1E',
  },
  uploadSub: {
    fontSize: 10,
    color: '#8E8E93',
    marginTop: 2,
  },
  uploadReq: {
    fontSize: 10,
    color: '#B84A36',
    fontWeight: '600',
    marginTop: 4,
  },
  cinLegalText: {
    fontSize: 10,
    color: '#8E8E93',
    textAlign: 'center',
  },
  // --- Checkbox ---
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1.5,
    borderColor: '#C0C0C0',
    borderRadius: 4,
    marginRight: 10,
    marginTop: 2,
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
    flex: 1,
    fontSize: 12,
    color: '#444444',
    lineHeight: 16,
  },
  boldUnderline: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  // --- Bouton principal ---
  primaryButton: {
    backgroundColor: '#B84A36',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 6,
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
    marginTop: 24,
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
    marginTop: 6,
  },
  securityText: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'center',
  },
});
