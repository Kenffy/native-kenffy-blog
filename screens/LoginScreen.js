import { View, Text, ImageBackground} from 'react-native';
import React from 'react';
import styled from "styled-components/native";

export default function LoginScreen() {
  const loginbg = require('../assets/images/login-bg.jpeg');
  return (
    <Container source={loginbg}>
      <Wrapper>
        <Header>Sign In</Header>
        <GoogleButton>
          <ButtonText>Sign in with Google</ButtonText>
        </GoogleButton>
        <FacebookButton>
          <ButtonText>Sign in with Facebook</ButtonText>
        </FacebookButton>

        <Separator>
          <Label>OR</Label>
        </Separator>

        <Input 
        placeholder='Email'/>
        <Input 
        secureTextEntry={true}
        placeholder='Password'/>
        <LoginButton>
          <ButtonText>Sign in</ButtonText>
        </LoginButton>
      </Wrapper>
    </Container>
  )
};

const Container = styled.ImageBackground`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.View`
width: 80%;
border-radius: 5px;
background-color: white;
justify-content: center;
padding: 10px 15px;
`;

const Header = styled.Text`
font-size: 22px;
font-weight: 500;
color: teal;
text-align: center;
margin-bottom: 20px;
`;

const GoogleButton = styled.TouchableOpacity`
background-color: red;
padding: 10px;
margin-bottom: 10px;
border-radius: 5px;
`;

const FacebookButton = styled.TouchableOpacity`
background-color: blue;
padding: 10px;
margin-bottom: 10px;
border-radius: 5px;
`;

const LoginButton = styled.TouchableOpacity`
background-color: teal;
padding: 10px;
margin-bottom: 10px;
border-radius: 5px;
`;

const ButtonText = styled.Text`
font-size: 14px;
font-weight: 500;
text-align: center;
text-transform: uppercase;
color: white;
width: 100%;
`;

const Separator = styled.View`
display: flex;
align-items: center;
justify-content: center;
margin-bottom: 10px;
`;

const Label = styled.Text`
padding: 10px;
font-size: 12px;
border-radius: 50px;
align-items: center;
text-align: center;
justify-content: center;
background-color: rgba(0,0,0,0.15);
`;

const Input = styled.TextInput`
padding: 6px 10px;
border-radius: 5px;
color: #444;
font-size: 14px;
border: 1px solid rgba(0,0,0,0.15);
margin-bottom: 10px;
`;



