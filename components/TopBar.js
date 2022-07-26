import styled from "styled-components/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from "react";

export default function TopBar({navigation,title, enableSearch}) {

  const [onSearch, setOnSearch] = useState(false);

  return (
    <Container>
        <Button onPress={()=>navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={25} style={{color: 'teal'}}/>
        </Button>
        {!onSearch && <Title>{title}</Title>}
        {enableSearch&&
        <SearchWrapper search={onSearch}>
          {onSearch &&<SearchInput placeholder='Search...'/>}
          <Button onPress={()=>setOnSearch(!onSearch)}>
            {onSearch?
            <Ionicons name="close" size={25} style={{color: '#444'}}/>
            :
            <Ionicons name="search" size={25} style={{color: '#444'}}/>
            }
          </Button>
        </SearchWrapper>
        }
    </Container>
  )
};

const Container = styled.View`
flex-direction: row;
align-items: center;
justify-content: space-between;
background-color: #fff;
height: 60px;
padding: 0 10px;
border-bottom-width: 1px;
border-bottom-color: rgba(0,0,0,0.1);
box-shadow:0 .5rem 1.5rem rgba(0,0,0,.5);
`;

const Button = styled.TouchableOpacity`
height: 35px;
width: 35px;
align-self: center;
justify-content: center;
align-items: center;
`;

const Title = styled.Text`
text-align: center;
text-transform: uppercase;
font-size: 16px;
color: #444;
font-weight: bold;
`;

const SearchWrapper = styled.View`
flex-direction: row;
align-items: center;
justify-content: space-between;
border-width: ${props=> props.search? '1px': '0px'};
border-color: #777;
border-radius: 3px;
`;

const SearchInput = styled.TextInput`
width: 75%;
font-size: 14px;
color: #444;
padding: 0px 10px;
`;