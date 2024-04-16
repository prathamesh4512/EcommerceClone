import React from "react";
import Layout from "../modules/Layout";
import List from "../modules/List";
import { message, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { clearBag } from "../store/bag/reducer";
import Empty from "../components/Empty";
import styled from "styled-components";

const CartPage = ({}) => {
  const bag = useSelector((state) => state.bag.bag);
  let totalAmount = 0;
  const dispatch = useDispatch();
  bag.forEach((item) => {
    const quantity = typeof item.quantity === "number" ? item.quantity : 1;
    totalAmount += item.price * quantity;
  });

  return (
    <Layout>
      {bag.length > 0 ? (
        <Wrapper>
          <div className="bag-list">
            <div className="top_section">
            <h1 className="pageTitle">Cart</h1>
            <div className="summary">
            <h1>
              Total Amount: <span>{totalAmount}</span>
            </h1>
            <button
              onClick={() => {
                message.success("Successfully Purchased");
                dispatch(clearBag());
              }}
            >
              Checkout
            </button>
          </div>
            </div>
            <List products={bag} />
          </div>
          
        </Wrapper>
      ) : (
        <Empty name="Your Bag is Empty" />
      )}
    </Layout>
  );
};
export default CartPage;

const Wrapper = styled.div`
  text-align: left;
  width: fit-content;
  margin: auto;
margin-top: 20px;
padding: 0 20px;

  .top_section{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
    padding: 0 10px;
    h1{
      font-size:28px;
      @media screen and (max-width: 800px) {
      font-size: 22px;
    }
    }
  }
  .pageTitle {
    text-align: center;
    text-transform: uppercase;
    color: #0db7af;
  }

  .brandName{
    font-size: 18px;
  }
  .productName{
    font-size: 14px;
  }
  padding-top: 1rem;

  .summary {
    align-self: flex-start;
    h1 {
      span {
        font-weight: bolder;
      }
    }

    button {
      background-color: #ff3e6c;;
      color: white;
      padding: 10px 16px;
      transition: all 0.3s ease-in;
      border-radius: 4px;
      width: 100%;
      margin-top: 8px;
      font-size: 16px;
      font-weight: bolder;
      &:hover {
        opacity: 0.9;
      }
      &:active {
        transform: scale(0.9);
      }
    }
    .ant-btn > span {
      color: white;
    }
  }
`
