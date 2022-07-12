import React from 'react';
import { ScrollView} from 'react-native';
import styled from "styled-components/native";
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import RecentPosts from '../components/RecentPosts';

export default function HomeScreen({navigation}) {

  
  return (
    <Container>
      <Navbar navigation={navigation}/>
      <ScrollView>
        <Header />
        <RecentPosts />
      </ScrollView>
    </Container>
  )
};

const Container = styled.View`
    flex: 1;
`;
