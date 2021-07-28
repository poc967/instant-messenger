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
        {!props.editEnabled ? (
          <Data>{props.userData.firstName}</Data>
        ) : (
          <input
            value={props.userData.username}
            onChange={props.handleChange}
            name="firstName"
          />
        )}
      </Wrapper>
      <Wrapper>
        <Key>Last Name</Key>
        {!props.editEnabled ? (
          <Data>{props.userData.lastName}</Data>
        ) : (
          <input
            value={props.userData.username}
            onChange={props.handleChange}
            name="lastName"
          />
        )}
      </Wrapper>
      <Wrapper>
        <Key>Email</Key>
        {!props.editEnabled ? (
          <Data>{props.userData.email}</Data>
        ) : (
          <input
            value={props.userData.email}
            onChange={props.handleChange}
            name="email"
          />
        )}
      </Wrapper>
    </Main>
  );
};

export default ProfileData;
