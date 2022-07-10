import React from 'react';
import { View, Text } from 'react-native';
import styled from "styled-components/native";

export default function HomeScreen() {
  return (
    <Container>
        <View>
          <Text>HomeScreen</Text>
        </View>
    </Container>
  )
};

const Container = styled.SafeAreaView`
    flex: 1;
`;
