import { View, Text } from 'react-native';
import React from 'react';
import styled from "styled-components/native";
import { CategoryData } from '../seed/CategoryData';
import CategoryList from './CategoryList';
import TopBar from './TopBar';

export default function ExploreCategories({navigation}) {
  const categories = CategoryData.filter(c=>c.name !== "All" && c.name !== "Others");

  const title = 'Explore All Categories';

  return (
    <Container>
      <TopBar navigation={navigation} title={title} enableSearch={true}/>
      <CategoryList categories={categories}/>
    </Container>
  )
};

const Container = styled.View`
background-color: rgba(0,0,0,0.05);
flex: 1;
`;
