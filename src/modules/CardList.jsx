import React from "react";
import styled from "styled-components";
import EmptyState from "../components/Empty";
import { useSelector } from "react-redux";
import Card from "../components/Card";

const CardList = ({ data, forWishlist,isSimilar }) => {
  const wishlist = useSelector((state) => state.bag.wishList);
  return data.length > 0 ? (
    <Wrapper className="cardList">
      {data.map((item) => {
        let wishListed = false;
        wishlist.forEach((wishListItem) => {
          wishListed = wishListItem.id === item.id;
        });
        return (
          <Card
            {...item}
            wishListed={wishListed}
            forWishlist={forWishlist}
            key={item.id}
            isSimilar={isSimilar}
          />
        );
      })}
    </Wrapper>
  ) : (
    <EmptyState name="No similar products" drawer={isSimilar} showHome={forWishlist}/>
  );
};

export default CardList;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
  row-gap: 3rem;
  height: fit-content;
  padding: 24px;
`;
