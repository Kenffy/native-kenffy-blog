import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
  width: 40px;
  height: 40px;
  position: relative;
`;

const User = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border-color: #1777f2;
  border-width: ${(props) => (props.story ? "2px" : 0)};
`;

const UserActive = styled.View`
  width: 15px;
  height: 15px;
  border-radius: 8px;
  background: rgb(0, 160,160);
  position: absolute;
  bottom: -2px;
  right: -2px;
  border-width: 2px;
  border-color: #ffffff;
`;

const Avatar = ({ source, online, story }) => {
  return (
    <Container>
      <User source={{ uri: source }} story={story} />
      {online === "true" && <UserActive />}
    </Container>
  );
};

export default Avatar;
