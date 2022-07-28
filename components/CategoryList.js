import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';
import styled from "styled-components/native";

export default function CategoryList({categories}) {

  const renderItem = ({ item }) => (
    <CategoryWrapper>
      <Category source={item?.icon} resizeMode="cover">
        <CategoryName>{item?.name}</CategoryName>
      </Category>
    </CategoryWrapper>
  );
  return (
    <Container>
      <List
        data={categories}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={item => item?.id}
      />
    </Container>
  )
};


const Container = styled.View`
flex: 1;
`;

const List = styled.FlatList`
padding: 10px;
padding-bottom: 10px;
`;

const CategoryWrapper = styled.TouchableOpacity`
margin: 6px auto;
width: 47%;
overflow: hidden;
background-color: #fff;
background-position: center;
background-repeat: no-repeat;
background-size: cover;
border-radius: 10px;
height: 120px;
border: 1px solid rgba(0,0,0,0.1);
box-shadow:0 .5rem 1.5rem rgba(0,0,0,0.5);
`;

const Category = styled.ImageBackground`
flex: 1;
justify-content: center;
`;

const CategoryName = styled.Text`
background-color: rgba(0,120,120,0.5);
width: 100%;
text-align: center;
padding: 10px;
color: #fff;
font-weight: bold;
font-size: 16px;
`;