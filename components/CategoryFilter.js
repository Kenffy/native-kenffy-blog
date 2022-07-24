import { CategoryData } from '../seed/CategoryData';
import styled from "styled-components/native";
import { useState } from 'react';

export default function CategoryFilter() {

    const [currId, setCurrId] = useState(CategoryData[0].id);

    const renderItem = ({ item }) => {

        return(
            <Category onPress={() => setCurrId(item?.id)} isSelected={item?.id === currId}>
                <CategoryName isSelected={item?.id === currId}>{item?.name}</CategoryName>
            </Category>
        )
    };
  return (
    <Container>
      <List
      horizontal={true}
        data={CategoryData}
        renderItem={renderItem}
        keyExtractor={item => item?.id}
      />
    </Container>
  )
};

const Container = styled.View`
background-color: #fff;
`;

const List = styled.FlatList`
padding: 10px;
`;

const Category = styled.TouchableOpacity`
background-color: ${props=> props.isSelected? 'teal':'whitesmoke'};
padding: 6px 15px;
margin-right: 10px;
border-radius: 15px;
align-items: center;
justify-content: center;
`;

const CategoryName = styled.Text`
font-size: 15px;
color: ${props=> props.isSelected? '#fff':'#444'};
text-align: center;
align-items: center;
justify-content: center;
`;