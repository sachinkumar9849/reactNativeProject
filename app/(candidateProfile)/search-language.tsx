import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install expo vector icons

const SearchLanguage = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('Croatian');
  
  const languages = [
    'English',
    'Croatian',
    'French',
    'German',
    'Spanish',
    'Italian',
    'Japanese',
    'Russian',
    'Chinese',
    'Portuguese',
    'Dutch',
    'Korean',
    'Arabic',
  ];
  
  const filteredLanguages = searchQuery
    ? languages.filter(lang => 
        lang.toLowerCase().includes(searchQuery.toLowerCase()))
    : languages;
    
  const renderLanguageItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.languageItem} 
      onPress={() => setSelectedLanguage(item)}
    >
      <Text style={styles.languageText}>{item}</Text>
      <View style={[
        styles.radioButton, 
        selectedLanguage === item && styles.radioButtonSelected
      ]}>
        {selectedLanguage === item && (
          <View style={styles.radioButtonInner} />
        )}
      </View>
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="close-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search for language</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#777" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Ex: English |"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
        />
      </View>
      
      <Text style={styles.sectionTitle}>Select languages</Text>
      
      <FlatList
        data={filteredLanguages}
        renderItem={renderLanguageItem}
        keyExtractor={item => item}
        style={styles.list}
      />
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.nextButton}
          onPress={() => navigation.navigate('NextScreen', { language: selectedLanguage })}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 6,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    height: 46,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#555',
    marginHorizontal: 16,
    marginVertical: 12,
  },
  list: {
    flex: 1,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  languageText: {
    fontSize: 16,
  },
  radioButton: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: '#3366CC',
  },
  radioButtonInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#3366CC',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  nextButton: {
    backgroundColor: '#3366CC',
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SearchLanguage;