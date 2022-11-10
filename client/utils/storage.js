import EncryptedStorage from 'react-native-encrypted-storage';

export default storage = {
  get: async (key) => {
    try {
      const value = await EncryptedStorage.getItem(key);

      if (!value) throw new Error('Value with key ' + key + ' not found!');

      return value;
    } catch (err) {
      console.log('Error on storage-get: ', err);
    }
  },

  set: async (key, value) => {
    try {
      await EncryptedStorage.setItem(key, value);
    } catch (err) {
      console.log('Error on storage-set: ', err);
    }
  },

  remove: async (key) => {
    try {
      await EncryptedStorage.removeItem(key);
    } catch (err) {
      console.log('Error on storage-set: ', err);
    }
  }
}