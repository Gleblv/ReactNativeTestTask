import React from 'react';
import { Modal, Image, View, TextInput, StyleSheet, Pressable, Text } from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAppDispatch } from '../hooks/reduxHooks';
import { addProduct } from '../redux/slices/productsSlice';

import type { Product } from '../redux/slices/productsSlice';

type ModalProps = {
  isVisible: boolean;
  closeModal: () => void;
};

const ModalView: React.FC<ModalProps> = ({ isVisible, closeModal }) => {
  const dispatch = useAppDispatch();

  const [titleInput, setTitleInput] = React.useState<string>('');
  const [descriptionInput, setDescriptionInput] = React.useState<string>('');
  const [priceInput, setPriceInput] = React.useState<string>('');
  const [imgInput, setImgInput] = React.useState<string>('');

  const onCreatePress = () => {
    if (titleInput && descriptionInput && priceInput && imgInput) {
      const product: Product = {
        id: uuidv4(),
        title: titleInput,
        description: descriptionInput,
        price: Number(priceInput),
        images: [imgInput],
      };

      axios({
        method: 'post',
        url: 'https://dummyjson.com/products/add',
        headers: { 'Content-Type': 'application/json' },
        data: product,
      })
        .then((res) => res.data)
        .then(async () => {
          const storageProductsData = await AsyncStorage.getItem('products');
          let storageProducts = storageProductsData ? JSON.parse(storageProductsData) : [];

          storageProducts.push(product);

          await AsyncStorage.setItem('products', JSON.stringify(storageProducts));
        })
        .then(() => dispatch(addProduct(product)))
        .then(() => alert('Data saved successfully'))
        .catch(async (err) => {
          await AsyncStorage.clear();

          console.log(err);
          alert('Failed to save data');
        });

      closeModal();
    }
  };

  return (
    <Modal
      visible={isVisible}
      onRequestClose={() => closeModal()}
      style={styles.modalContainer}
      transparent={true}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.modalView}>
          <Pressable onPress={() => closeModal()}>
            <Image
              style={styles.modalClose}
              source={{ uri: 'https://img.icons8.com/?size=100&id=46&format=png&color=000000' }}
            />
          </Pressable>
          <View>
            <TextInput
              style={styles.modalInput}
              placeholder="Product title"
              onChangeText={setTitleInput}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Product description"
              onChangeText={setDescriptionInput}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Product price"
              keyboardType="numeric"
              onChangeText={setPriceInput}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Product img (url)"
              onChangeText={setImgInput}
            />
            <Pressable onPress={onCreatePress}>
              <Text style={styles.modalButton}>Create</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  modalView: {
    width: 300,
    height: 500,
    alignContent: 'center',
    borderWidth: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: 'white',
    padding: 20,
  },
  modalClose: {
    width: 20,
    height: 20,
    marginLeft: 'auto',
    marginBottom: 20,
  },
  modalInput: {
    fontSize: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    padding: 5,
    color: 'black',
  },
  modalButton: {
    paddingVertical: 10,
    borderWidth: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    width: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
  },
});

export default ModalView;
