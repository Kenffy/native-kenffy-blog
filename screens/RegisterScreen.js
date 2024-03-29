import React, { useState } from 'react';
import styled from "styled-components/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { registerAsync, socialLoginAsync } from '../services/firebaseServices';

export default function RegisterScreen({navigation}) {
  const registerbg = require('../assets/images/register-bg.jpeg');

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [username, setUsername] = useState(null);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState(null);

  const clearData = ()=>{
    setEmail(null);
    setPassword(null);
    setUsername(null);
    setError(null);
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(!username && !email && !password){
      return;
    };

    if(!agree){
      setError("Please agree the Terms of Services and Privacy Policy");
      return;
    }
    try {
      await registerAsync({email, password, username});
      clearData();
      navigation.navigate('SIGN IN');
    } catch (err) {
      var message = err.code.split('/')[1].replace('-', ' ');
      message = message.replace('-', ' ')
      setError(message);
      //console.log(err)
    } 
  }

  const  handleSocialLogin = async(provider)=> {
    if(!agree){
      setError("Please agree the Terms of Services and Privacy Policy");
      return;
    }
    await socialLoginAsync(provider);
  }

  return (
    <Container source={registerbg}>
      <Wrapper>
        <Header>Sign Up</Header>
        {error && <ErrorMesssage>{error}</ErrorMesssage>}
        <GoogleButton onPress={() => handleSocialLogin('google')}>
          <Ionicons name="logo-google" size={14} style={{color: '#fff'}}/>
          <ButtonText>Sign up with Google</ButtonText>
        </GoogleButton>
        <FacebookButton onPress={() => handleSocialLogin('facebook')}>
          <Ionicons name="logo-facebook" size={14} style={{color: '#fff'}}/>
          <ButtonText>Sign up with Facebook</ButtonText>
        </FacebookButton>

        <Separator>
          <Label>OR</Label>
        </Separator>

        <Input onChangeText={txt=>setUsername(txt)}
        placeholder='Username'/>
        <Input onChangeText={txt=>setEmail(txt)}
        placeholder='Email'/>
        <Input onChangeText={txt=>setPassword(txt)}
        secureTextEntry={true}
        placeholder='Password'/>
        <TermsWrapper>
          <TermLink style={{marginRight: 5}} onPress={()=>setAgree(!agree)}>
            {agree?
            <Ionicons name="checkbox-outline" size={16} style={{color: '#444'}}/>
            :
            <Ionicons name="square-outline" size={16} style={{color: '#444'}}/>
            }
          </TermLink>
          <Text>I agree to the the</Text>
          <TermLink>
            <TermsText> Terms of Services</TermsText>
          </TermLink>
          <Text> and</Text>
          <TermLink>
            <TermsText> Privacy Policy</TermsText>
          </TermLink>
        </TermsWrapper>
        <LoginButton onPress={handleSubmit}>
          <ButtonText>Sign up</ButtonText>
        </LoginButton>
        <TermsWrapper>
          <Text>Already an account?</Text>
          <TermLink onPress={()=>navigation.navigate('SIGN IN')}>
            <TermsText> Sign In</TermsText>
          </TermLink>
        </TermsWrapper>
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
padding: 20px 15px;
`;


const Header = styled.Text`
margin-top: 10px;
font-size: 30px;
font-weight: 600;
color: teal;
text-align: center;
margin-bottom: 20px;
`;

const ErrorMesssage = styled.Text`
margin-bottom: 10px;
font-size: 14px;
color: red;
text-align: center;
`;

const GoogleButton = styled.TouchableOpacity`
background-color: #db3236;
padding: 10px;
margin-bottom: 10px;
border-radius: 5px;
flex-direction: row;
align-items: center;
justify-content: center;
`;

const FacebookButton = styled.TouchableOpacity`
background-color: #3b5998;
padding: 10px;
margin-bottom: 10px;
border-radius: 5px;
flex-direction: row;
align-items: center;
justify-content: center;
`;

const LoginButton = styled.TouchableOpacity`
background-color: teal;
padding: 10px;
margin-bottom: 10px;
border-radius: 5px;
`;

const ButtonText = styled.Text`
font-size: 14px;
font-weight: 600;
text-align: center;
text-transform: uppercase;
color: white;
margin-left: 10px;
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
border: 2px solid rgba(0,0,0,0.2);
margin-bottom: 10px;
`;

const TermsWrapper = styled.View`
flex-direction: row;
flex-wrap: wrap;
margin: 10px 0px;
`;

const TermLink = styled.TouchableOpacity`
align-content: center;
`;

const Text = styled.Text`
font-size: 12px;
color: #444;
`;

const TermsText = styled.Text`
font-weight: bold;
font-size: 12px;
color: teal;
`;
