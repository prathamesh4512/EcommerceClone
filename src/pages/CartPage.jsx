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
            <h1 className="pageTitle">Cart</h1>
            <List products={bag} />
          </div>
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
              Buy
            </button>
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
padding: 60px;
  text-align: left;
  /* display: grid; */
  display: flex;
  gap:3vw;
  justify-content: center;
  min-height: 80vh;
  .pageTitle {
    text-align: center;
    text-transform: uppercase;
    color: #0db7af;
    margin-bottom: 20px;
  }

  padding-top: 1rem;
  .bag-list {
    grid-column: 2/3;
  }
  .summary {
    align-self: flex-start;
    margin-top: 72px;
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
