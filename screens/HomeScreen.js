import React from 'react';
import { View, Text } from 'react-native';
import styled from "styled-components/native";
import Header from '../components/Header';

export default function HomeScreen() {

  
  return (
    <Container>
      <Header />
      <View>
        <Text>HomeScreen</Text>
      </View>
    </Container>
  )
};

const Container = styled.SafeAreaView`
    flex: 1;
`;
