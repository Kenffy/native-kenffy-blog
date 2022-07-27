import { View, Text } from 'react-native';
import React from 'react';
import styled from "styled-components/native";
import { CategoryData } from '../seed/CategoryData';
import CategoryList from './CategoryList';

export default function ExploreCategories({navigation}) {
  const categories = CategoryData.filter(c=>c.name !== "All" && c.name !== "Others")
  return (
    <Container>
      <Header>Explore All Categories</Header>
      <CategoryList categories={categories}/>
    </Container>
  )
};

const Container = styled.ScrollView`
padding: 10px;
background-color: rgba(0,0,0,0.05);
flex: 1;
`;

const Header = styled.Text`
padding: 10px 0;
font-size: 24px;
font-weight: 900;
text-align: center;
color: #444;
text-transform: uppercase;
`;

const MoreButton = styled.TouchableOpacity`
align-self: center;
justify-content: center;
background-color: #444;
width: 150px;
padding: 10px;
border-radius: 5px;
margin-top: 15px;
`;

const ButtonText = styled.Text`
text-align: center;
text-transform: uppercase;
color: #fff;
`;