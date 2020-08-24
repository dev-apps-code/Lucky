import AsyncStorage from '@react-native-community/async-storage';

export async function store(data) {
  let {key, value} = data;
  console.log('Storing...', key);
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    // Error saving data
  }
}

export async function retrieve(key, callback) {
  console.log('Retrieving... Key:', key);

  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // We have data!!
      callback(value);
    } else {
      callback(null);
    }
  } catch (error) {
    // Error retrieving data
  }
}

export async function remove(key, callback) {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (exception) {
    return false;
  }
}
