import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  Button,
} from 'react-native';
import RoundIconBtn from '../component/RoundIconBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Intro = ({onFinish}) => {
  const [name, setName] = useState('');
  const handleOnChangeText = text => setName(text);

  const handleSubmit = async () => {
    const user = {name: name};
    await AsyncStorage.setItem('user', JSON.stringify(user));
    if (onFinish) onFinish();
  };

  console.log(name);
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 40,
          margin: 10,
          alignSelf: 'flex-start',
          paddingLeft: 25,
        }}>
        hello
      </Text>
      <TextInput
        value={name}
        onChangeText={handleOnChangeText}
        placeholder="이름을 입력하세요"
        style={styles.TextInput}
      />
      {name.trim().length > 3 ? (
        <RoundIconBtn antIconName="arrowright" onPress={handleSubmit} />
      ) : null}
    </View>
  );
};

const width = Dimensions.get('window').width - 50;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextInput: {
    borderWidth: 2,
    borderColor: '#C8A2C8',
    width,
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: 20,
    color: '#A9A9A9',
    marginBottom: 15,
  },
});

export default Intro;
