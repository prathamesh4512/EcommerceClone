import { CaretDownOutlined, CheckOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";
import React, { useEffect } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { addInWishlist, removeInBag, updateInBag} from "../store/bag/reducer";
import { setTotalAmount } from "../store/common/reducer";


const ListItem = ({ product }) => {
  const dispatch = useDispatch();
  const { quantity = 1 } = useSelector((state) => state.bag.bag).find((item) => item.id === product.id);
  const selectedSizeString = product.selectedSize?.toString();
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  useEffect(() => {
    dispatch(setTotalAmount(quantity * product.price));
  }, [quantity]);

  const menu = (
    <Menu
      defaultSelectedKeys={[selectedSizeString]}
      onClick={(e) => {
        dispatch(
          updateInBag({
            ...product,
            selectedSize: parseInt(e.key),
          })
        );
      }}
    >
      <Menu.Item key={"38"}>
        <button>38</button>
      </Menu.Item>
      <Menu.Item key={"40"}>
        <button>40</button>
      </Menu.Item>
      <Menu.Item key={"42"}>
        <button>42</button>
      </Menu.Item>
      <Menu.Item key={"44"}>
        <button>44</button>
      </Menu.Item>
    </Menu>
  );

  const quantityMenu = (
    <Menu
      defaultSelectedKeys={[selectedSizeString]}
      onClick={(e) => {
        dispatch(
          updateInBag({
            ...product,
            quantity: parseInt(e.key),
          })
        );
      }}
    >
      <Menu.Item key={"1"}>
        <button>1</button>
      </Menu.Item>
      <Menu.Item key={"2"}>
        <button>2</button>
      </Menu.Item>
      <Menu.Item key={"3"}>
        <button>3</button>
      </Menu.Item>
      <Menu.Item key={"4"}>
        <button>4</button>
      </Menu.Item>
    </Menu>
  );
  
  return product.brandName ? (
    <Wrapper>
      <div className="main">
        <Link to={`/clothing/${product.id}`} className="image">
          <img src={product.images[0]} alt={product.productName} />
        </Link>
        <div className="info">
          <div className="columns">
            <div className="column1">
              <h1 className="brandName">{product.brandName}</h1>
              <p className="productName">{product.productName}</p>
              <p className="soldBy">Sold By: Omnitech Retail</p>
            </div>
            <div className="column2">
              <div className="price">Rs. {quantity * product.price}</div>
              <div className="discount">
                <p className="orignalPrice">{quantity * product.originalPrice}</p>
                <p className="discountRange"> {product.discountPercent}% OFF</p>
              </div>
            </div>
          </div>
          <div className="dropdowns">
            <div>
              <Dropdown overlay={menu} placement="bottomLeft">
                <Button>
                  <span style={{ fontWeight: "bolder", paddingRight: "4px" }}>Size: </span> {product.selectedSize} <CaretDownOutlined />
                </Button>
              </Dropdown>
            </div>
            <div>
              <Dropdown overlay={quantityMenu} placement="bottomLeft">
                <Button>
                  <span style={{ fontWeight: "bolder", paddingRight: "4px" }}>Qty: </span> {quantity} <CaretDownOutlined />
                </Button>
              </Dropdown>
            </div>
          </div>

          <div className="checks">
            <div>
              <CheckOutlined /> Delivery by {dayjs(tomorrow).format("D MMMM")}
            </div>
            <div>
              <CheckOutlined /> Eligible for Try & Buy
            </div>
          </div>
        </div>
      </div>
      <div className="buttons">
        <button className="remove" onClick={() => dispatch(removeInBag(product.id))}>
          remove
        </button>
        <button
          className="add-wishlist"
          onClick={() => {
            dispatch(removeInBag(product.id));
            dispatch(addInWishlist(product));
          }}
        >
          Move to Wishlist
        </button>
      </div>
    </Wrapper>
  ) : (
    <></>
  );
};

export default ListItem;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* width: 32rem; */
  margin-bottom: 16px;
  border-radius: 4px;
  border: 1px solid #eaeaec;
  padding: 1rem;
  .main {
    display: flex;
    @media screen and (max-width: 500px) {
    flex-direction: column;
    justify-content: center;
    gap:10px;
  }
  }
  .image{
    display: flex;
    align-items: center;
  }
  img {
    width: 150px;
    margin-right: 1rem;
    @media screen and (max-width: 500px) {
    margin: auto;
  }
  }
  .info {
    /* width: 100%; */
    .dropdowns {
      padding-top: 1rem;
      display: flex;

      & > div {
        padding-right: 1rem;
      }
    }
  }
  .brandName {
    font-weight: 700;
    margin: 0;
    @media screen and (max-width: 500px) {
    font-size: 14px!important;
  }
  }

  .productName{
    @media screen and (max-width: 500px) {
    font-size: 12px!important;
  }
  }

  .soldBy {
    font-size: 10px;
    opacity: 0.9;
  }

  .columns {
    display: flex;
    justify-content: space-between;
    gap:20px;
  }

  .checks {
    margin-top: 28px;
    @media screen and (max-width: 500px) {
    margin-top:8px;
    font-size: 14px;
  }
    svg {
      path {
        fill: #0db7af;
      }
    }
    & > div {
      padding-top: 8px;
    }
  }
  .column2 {
    .price {
      font-size: 14px;
      font-weight: 700;
    }
    .discount {
      display: flex;

      .orignalPrice {
        text-decoration: line-through;
      }
      .discountRange {
        font-size: 14px;
        padding-left: 8px;
        color: #ff905a;
        font-weight: 700;
      }
    }
  }

  .buttons {
    width: 90%;
    display: grid;
    margin-top: 16px;
    grid-template-columns: 1fr 1fr;
    align-self: center;
    button {
      text-transform: uppercase;
      padding: 16px;
      @media screen and (max-width: 500px) {
padding: 8px;
font-size: 12px;
  }
      border: 1px solid #eaeaec;
    }
  }

`
