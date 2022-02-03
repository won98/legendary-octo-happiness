import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
const SearchBar = () => {
  return (
    <View style={(styles.container, value, onChangeText, onClear)}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.SearchBar}
        placeholder="Search here"
      />
      {value ? (
        <Icon
          name="close"
          size={20}
          color={colors.PRIMARY}
          onPress={onClear}
          style={styles.clearIcon}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  SearchBar: {
    borderWidth: 0.5,
    borderColor: '#C8A2C8',
    height: 40,
    borderRadius: 40,
    paddingLeft: 15,
  },
  clearIcon: {
    position: 'absolute',
    right: 10,
  },
});

export default SearchBar;
