import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';

let STORAGE_KEY = 'ONE'

export default function App () {
  const [notes, setNotes] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [noteText, setNoteText] = useState('');

  const clients = [
    { id: 1, name: 'Client 1' },
    { id: 2, name: 'Client 2' },
    { id: 3, name: 'Client 3' },
  ];

  const categories = [
    { id: 1, name: 'Goal Evidence' },
    { id: 2, name: 'Support Coordination' },
    { id: 3, name: 'Active Duty' },
  ];

  // Get the saved note and store in an array
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((value) => {
      setNotes(value)
    })
  }, []);

  //saving data to local storage
  useEffect(() => {
    const setDataToLocal = JSON.stringify(notes)
    AsyncStorage.setItem(STORAGE_KEY, setDataToLocal)
  }, [setDataToLocal]);

  const addNote = () => {

    setNotes([...notes, { text: noteText, client: selectedClient, category: selectedCategory }]);
    setNoteText('');
    setSelectedClient('');
    setSelectedCategory('');
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
      <Text style={styles.header}>Note Taking App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter note here"
        value={noteText}
        onChangeText={setNoteText}
      />
      <View style={styles.dropdownContainer}>
        <Text>Client:</Text>
        <View style={styles.dropdown}>
          {clients.map((client) => (
            <TouchableOpacity
              key={client.id}
              onPress={() => setSelectedClient(client.name)}
            >
              <Text style={selectedClient === client.name ? styles.selected : null}>
                {client.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.dropdownContainer}>
        <Text>Category:</Text>
        <View style={styles.dropdown}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => setSelectedCategory(category.name)}
            >
              <Text style={selectedCategory === category.name ? styles.selected : null}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={addNote}>
        <Text style={styles.buttonText}>Add Note</Text>
      </TouchableOpacity>
      {notes.length > 0 ? (
        <FlatList
          data={notes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.noteContainer}>
              <Text>{item}</Text>
            </View>)}
        />) : null
      }
      </View>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 20,
    color: "black"
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  dropdownContainer: {
    borderColor: "gray"
  },
  dropdown: {
    position: "absolute",
    width: "100%",
    backgroundColor: "white",
    color: "black"
  },
  selected: {
    color: 'red'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  noteContainer: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  }
});
