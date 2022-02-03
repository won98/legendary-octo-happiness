import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import RoundIconBtn from '../component/RoundIconBtn';
import SearchBar from '../component/SearchBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Note from '../component/Note';
import useNotes from '../contexts/NoteProvider';

const NoteScreen = ({user, navigation}) => {
  const [greet, setGreet] = useState('');
  const [modalvisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [resultNotFound, setResultNotFound] = useState(false);

  const {notes, setNotes, findNotes} = useNotes('');

  const findGreet = () => {
    const hrs = new Date().getHours();
    if (hrs === 0 || hrs < 12) return setGreet('morning');
    if (hrs === 1 || hrs < 17) return setGreet('afternoon');
    getGreed('Evening');
  };

  useEffect(() => {
    findGreet();
  }, []);

  const handleOnSubmit = async (title, desc) => {
    const note = {id: Data.now(), title, desc, time: Date.now()};
    const updatedNOtes = [...notes, note];
    setNotes(updatedNOtes);
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNOtes));
  };
  const openNote = note => {
    navigation.navigate('NoteDetail', {note});
  };

  const handleOnSearchInput = async text => {
    setSearchQuery(text);
    if (!text.trim()) {
      setSearchQuery('');
      setResultNotFound(false);
      return await findNotes();
    }
    const filteredNote = notes.filter(note => {
      if (note.title.toLowerCase().includes(text.toLowerCase())) {
        return note;
      } else {
        setResultNotFound(true);
      }
    });

    if (filteredNote.length) {
      setNotes([...filteredNote]);
    }
  };
  const handleOnClear = async () => {
    setSearchQuery('');
    setResultNotFound(false);
    await findNotes();
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.header}>{`Good ${greet} ${user.name}`}</Text>
          {notes.length ? (
            <SearchBar
              value={searchQuery}
              onChangeText={handleOnSearchInput}
              containerStyle={{marginVertical: 15}}
              onClear={handleOnClear}
            />
          ) : null}

          {resultNotFound ? (
            <NotFound />
          ) : (
            <FlatList
              data={reverseNotes}
              numColumns={2}
              columnWrapperStyle={{
                justifyContent: 'space-between',
                marginBottom: 15,
              }}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <Note onPress={() => openNote(item)} item={item} />
              )}
            />
          )}

          {!notes.length ? (
            <View
              style={[
                StyleSheet.absoluteFillObject,
                styles.emptyHeadeContainer,
              ]}>
              <Text style={styles.emptyHeader}>Add Notes</Text>
            </View>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
      <RoundIconBtn
        onPress
        {...() => setModalVisible(true)}
        antIconName="plus"
        style={styles.addBtn}
      />
      <NoteInputModel
        visible={modalvisible}
        onClose
        {...() => setModalVisible(false)}
        onSubmit={handleOnSubmit}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    zIndex: 1,
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  container: {
    paddingHorizontal: 20,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    opacity: 0.2,
  },
  emptyHeader: {
    fontSize: 30,
  },
  emptyHeadeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  addBtn: {
    position: 'absolute',
    right: 15,
    bottom: 50,
    zIndex: 1,
  },
});

export const useNote = () => useContext(NoteContext);

export default NoteScreen;
