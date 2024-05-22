import React from 'react';
import { Button, FlatList, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { fetchProducts, setProducts } from '../redux/slices/productsSlice';

import type { HomeProps } from './Navigation';

import Product from '../components/Product';
import ModalView from '../components/ModalView';

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const [modalIsVisible, setModalIsVisible] = React.useState<boolean>(false);

  const { products, skip } = useAppSelector((state) => state.products);

  const firstFetchProducts = async () => {
    try {
      const storageProductsData = await AsyncStorage.getItem('products');
      let storageProducts = storageProductsData && JSON.parse(storageProductsData);

      await dispatch(fetchProducts(0));

      storageProducts && dispatch(setProducts(storageProducts));

      alert('Data fetched successfully');
    } catch (err) {
      console.log(err);
      alert('Data fetched failed');
    }
  };

  const fetchMoreProducts = () => {
    dispatch(fetchProducts(skip));
  };

  const closeModal = () => {
    setModalIsVisible(false);
  };

  React.useEffect(() => {
    firstFetchProducts();
  }, []);

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={() => setModalIsVisible(true)} title="Add" />,
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FlatList
        data={products}
        onEndReached={fetchMoreProducts}
        onEndReachedThreshold={0}
        keyExtractor={() => uuidv4()}
        renderItem={({ item }) => (
          <Product
            title={item.title}
            description={item.description}
            price={item.price}
            imgUrl={item.images}
          />
        )}
      />
      <ModalView isVisible={modalIsVisible} closeModal={closeModal} />
    </View>
  );
};

export default Home;
