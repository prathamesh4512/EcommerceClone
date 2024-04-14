import { Button, Modal } from "antd";
import SelectSize from "./SelectSize";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addInBag, removeInWishList } from "../store/bag/reducer";
import styled from "styled-components";


const CustomModal = ({ isModalVisible, handleModalVisible, product }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [showSizeError, setShowSizeError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setShowSizeError(false);
  }, [selectedSize]);

  return (
    <Wrapper
      width={450}
      title="Select Size"
      open={isModalVisible}
      onCancel={() => handleModalVisible(false)}
      footer={
        <button
        onClick={() => {
          if (!selectedSize) {
            setShowSizeError(true);
          } else {
            dispatch(
              addInBag({
                ...product,
                selectedSize,
              })
            );
            dispatch(removeInWishList(product.id));
            handleModalVisible(false);
          }
        }}
        className="bag-done"
      >
        Done
      </button>
      }
    >
      <div className="customModal">
        <div className="info">
          <img src={product.images[0]} alt="" />
          <div className="contentPrice contentPriceAlt">
            <p className="brandName">{product.brandName}</p>
            <p className="productName">{product.productName}</p>
            <div className="row1">
              <p className="price">RS. {product.price}</p>
              <p className="originalPrice">{product.originalPrice}</p>
              <p className="discount">{`(${product.discountPercent}% OFF)`}</p>
            </div>
            <div className="row2">
              Seller: <span>Omnitech Retail</span>
            </div>
          </div>
        </div>
        <SelectSize sizes={[38, 40, 42, 44]} selectedSize={(size) => setSelectedSize(size)} showSizeError={showSizeError} />
      </div>
    </Wrapper>
  );
};
export default CustomModal;

const Wrapper = styled(Modal)`
  
  .bag-done {
  background-color: #ff3e6c;
  color: white;
  padding: 10px 16px;
  border-radius: 4px;
  width: 100%;
}

.customModal {
  img {
    width: 6vw;
  }
  .info {
    display: flex;
    .contentPrice {
      padding-left: 16px;
      .row1 {
        padding-top: 0.5rem;
        display: flex;
        align-items: center;
        .price {
          font-size: 20px;
          font-weight: 700;
          line-height: 1;
          margin: 0;
        }
        .originalPrice {
          font-size: 18px;
          padding-left: 8px;
          text-decoration: line-through;
          color: #535665;
        }
        .discount {
          font-size: 18px;
          padding-left: 8px;

          color: #ff905a;
          font-weight: 700;
        }
      }
    }
    .brandName {
      padding-top: 8px;
      font-weight: 700;
      font-size: 16px;
    }
  }
}

`
