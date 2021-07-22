import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  width: 90%;
  grid-template-columns: 1fr 1fr;
  margin: auto;
  margin-bottom: 0.6rem;
`;

const Main = styled.div`
  padding: 1rem;
  background-color: white;
  margin-top: 1rem;
`;

const Data = styled.span`
  text-align: center;
  font-weight: 200;
`;

const Key = styled.span`
  font-weight: 600;
`;

const ProfileData = (props) => {
  return (
    <Main>
      <Wrapper>
        <Key>Username</Key>
        <Data>{props.userData.username}</Data>
      </Wrapper>
      <Wrapper>
        <Key>First Name</Key>
        <Data>{props.userData.firstName}</Data>
      </Wrapper>
      <Wrapper>
        <Key>Last Name</Key>
        <Data>{props.userData.lastName}</Data>
      </Wrapper>
      <Wrapper>
        <Key>Email</Key>
        <Data>{props.userData.email}</Data>
      </Wrapper>
    </Main>
  );
};

export default ProfileData;
