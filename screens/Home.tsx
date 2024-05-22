import React from 'react';
import { FlatList, View } from 'react-native';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { fetchProducts } from '../redux/slices/productsSlice';

import Product from '../components/Product';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const { products, skip } = useAppSelector((state) => state.products);

  const fetchMoreProducts = () => {
    dispatch(fetchProducts(skip));
  };

  React.useEffect(() => {
    dispatch(fetchProducts(0));
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FlatList
        data={products}
        onEndReached={fetchMoreProducts}
        onEndReachedThreshold={0}
        renderItem={({ item }) => (
          <Product
            title={item.title}
            description={item.description}
            price={item.price}
            imgUrl={item.images}
          />
        )}
      />
    </View>
  );
};

export default Home;
