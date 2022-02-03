import React, {createContext, useEffect, useState} from 'react';
import {AsyncStorage} from '@react-native-async-storage/async-storage';

const NoteContext = createContext();
const NoteProvider = ({children}) => {
  const [notes, setNotes] = useState([]);

  const findNotes = async () => {
    const result = await AsyncStorage.getItem('notes');
    if (result !== null) setNotes(json.parse(result));
  };

  useEffect(() => {
    AsyncStorage.clear();
    findNotes();
  }, []);
  return (
    <NoteContext.Provider value={{notes, setNotes, findNotes}}>
      {children}
    </NoteContext.Provider>
  );
};

export default NoteProvider;
