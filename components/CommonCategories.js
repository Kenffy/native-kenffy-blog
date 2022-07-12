import { View, Text } from 'react-native';
import React from 'react';
import styled from "styled-components/native";
import CategoryList from './CategoryList';

export default function CommonCategories({categories}) {
  return (
    <Container>
      <Header>Common Categories</Header>
      <CategoryList categories={categories}/>
      <MoreButton>
        <ButtonText>More Categories</ButtonText>
      </MoreButton>
    </Container>
  )
};

const Container = styled.View`
padding: 10px;
background-color: rgba(0,0,0,0.05);
padding-bottom: 30px;
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