import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

type ProductProps = {
  title: string;
  description: string;
  price: number;
  imgUrl: string[];
};

const Product: React.FC<ProductProps> = ({ title, description, price, imgUrl }) => {
  return (
    <View style={styles.productContainer}>
      <View style={styles.productDescr}>
        <Text style={styles.productTitle}>{title}</Text>
        <Text>{description}</Text>
      </View>
      <Text style={styles.productPrice}>{price}</Text>
      <Image
        source={{
          uri: imgUrl[0],
        }}
        style={styles.productImage}></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    borderWidth: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  productTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  productDescr: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 'auto',
    maxWidth: 200,
  },
  productPrice: {
    marginRight: 50,
    fontSize: 20,
  },
  productImage: {
    width: 50,
    height: 50,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
});

export default Product;
