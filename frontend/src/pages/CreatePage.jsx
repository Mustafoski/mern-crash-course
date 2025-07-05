import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  useToast,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useProductStore } from '../store/product';

const CreatePage = () => {
  const [newProduct, setNewProduct] = React.useState({
    name: '',
    price: '',
    image: '',
  });
  const toast = useToast();

  const { createProduct } = useProductStore();
  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toast({
        title: 'Error',
        description: message,
        status: 'error',
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
      });
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container maxW='container.sm'>
      <VStack spacing={8}>
        <Heading as='h1' size='2xl' textAlign='center' mb={8}>
          Create New Product
        </Heading>

        <Box
          w='full'
          bg={useColorModeValue('white', 'gray.800')}
          p={6}
          rounded='lg'
          shadow='md'
        >
          <VStack spacing={4}>
            <Input
              placeholder='Product Name'
              name='name'
              value={newProduct.name}
              onChange={handleChange}
            />
            <Input
              placeholder='Product Price'
              name='price'
              type='number'
              value={newProduct.price}
              onChange={handleChange}
            />
            <Input
              placeholder='Product Image URL'
              name='image'
              value={newProduct.image}
              onChange={handleChange}
            />
            <Button colorScheme='blue' w='full' onClick={handleAddProduct}>
              Add Product{' '}
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
