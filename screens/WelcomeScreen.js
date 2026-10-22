import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';

// Source de la vidéo dans le dossier assets
// const videoSource = require('../assets/intro.mp4');

export default function WelcomeScreen({ navigation }) {
  // Configuration du lecteur vidéo : boucle (loop), muet, et lecture automatique
  // const player = useVideoPlayer(videoSource, (player) => {
  //   player.loop = true;
  //   player.muted = true;
  //   player.play();
  // });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Vidéo plein écran en arrière-plan */}
      {/* <VideoView
        player={player}
        style={StyleSheet.absoluteFillObject}
        contentFit="cover"
        nativeControls={false}
      /> */}

      {/* Voile sombre pour garantir la lisibilité du texte et du bouton */}
      <View style={styles.overlay} />

      {/* Contenu au premier plan */}
      <View style={styles.content}>
        {/* Logo et slogan */}
        <View style={styles.header}>
          <Text style={styles.logo}>DARHOME</Text>
          <Text style={styles.tagline}>L'immobilier en toute simplicité</Text>
        </View>

        {/* Bouton Commencer */}
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => navigation?.navigate('Login')}
        >
          <Text style={styles.buttonText}>Commencer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 100,
    paddingBottom: 48,
  },
  header: {
    alignItems: 'center',
  },
  logo: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 3,
  },
  tagline: {
    fontSize: 16,
    color: '#FAFAFA',
    marginTop: 8,
    opacity: 0.9,
  },
  button: {
    backgroundColor: '#B84A36', // Terracotta
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
