import React from 'react';
import { View, Text } from 'react-native';
import styled from "styled-components/native";

export default function ProfileScreen() {
  return (
    <Container>
        <View>
          <Text>ProfileScreen</Text>
        </View>
    </Container>
  )
};


const Container = styled.SafeAreaView`
    flex: 1;
`;

