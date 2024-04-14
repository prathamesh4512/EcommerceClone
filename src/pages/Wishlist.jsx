import CardList from "../modules/CardList";
import Layout from "../modules/Layout";
import React from "react";
import { useSelector } from "react-redux";
import Empty from "../components/Empty";
import styled from "styled-components";
import { Drawer } from "antd";

const Wishlist= () => {
  const wishList = useSelector((state) => state.bag.wishList);
  return (
    <Layout>
      {wishList.length > 0 ? (
        <Wrapper>
          <div className="title">
            <h1>My WishList</h1> 
            {/* <span>{wishList.length} Items</span> */}
          </div>
          <CardList data={wishList} forWishlist isSimilar={true}/>
        </Wrapper>
      ) : (
        <Empty name="Your Wishlist is empty" />
      )}
    </Layout>
  );
};
export default Wishlist;

const Wrapper = styled.div`
margin-top: 16px;
  padding: 16px 9%;
.title {
  display: flex;
  align-items: flex-end;
  font-size: 16px;
  margin-bottom: 0;
  color: #282c3f;

  h1 {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 0;
  }
  span {
    padding-left: 8px;
    padding-bottom: 1px;
    font-weight: lighter;
  }
}
`
