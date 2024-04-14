import styled from "styled-components";
import ListItem from "../components/ListItem";
import React, { useState } from "react";


const List = ({ products }) => {
  return (
    <Wrapper>
      {products.map((item) => {
        return <ListItem product={item} key={item.id} />;
      })}
    </Wrapper>
  );
};
export default List;

const Wrapper = styled.div`
    width: fit-content;

`
