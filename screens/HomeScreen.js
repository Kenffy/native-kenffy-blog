import React from 'react';
import { View, Text } from 'react-native';
import styled from "styled-components/native";
import Header from '../components/Header';
import Navbar from '../components/Navbar';

export default function HomeScreen({navigation}) {

  
  return (
    <Container>
      <Navbar navigation={navigation}/>
      <Header />
      <View>
        <Text>HomeScreen</Text>
      </View>
    </Container>
  )
};

const Container = styled.View`
    flex: 1;
`;
