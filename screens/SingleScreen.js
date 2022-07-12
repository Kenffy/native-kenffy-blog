import { View, Text } from 'react-native';
import React from 'react';
import styled from "styled-components/native";

export default function SingleScreen({navigation, route}) {
  return (
    <View>
      <Text>{route?.params.id}</Text>
    </View>
  )
}

const Container = styled.View`
    flex: 1;
`;