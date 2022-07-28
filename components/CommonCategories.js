import { View, Text } from 'react-native';
import React from 'react';
import styled from "styled-components/native";
import CategoryList from './CategoryList';

export default function CommonCategories({navigation, categories}) {
  return (
    <Container>
      <Header>Common Categories</Header>
      <Wrapper>
        {categories.map((cat)=>(
            <CategoryWrapper key={cat?.id}>
                <Category source={cat?.icon} resizeMode="cover">
                    <CategoryName>{cat?.name}</CategoryName>
                </Category>
            </CategoryWrapper>
        ))}
      </Wrapper>
      <MoreButton onPress={()=>navigation.navigate('Categories')}>
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

const Wrapper = styled.View`
flex-direction: row;
flex-wrap: wrap;
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