import { Button, Modal } from "antd";
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

            <div className="selectSize">
      <p>Select Size</p>
      {showSizeError && <span>Please select a size</span>}
      <div className="sizes">
        {[38, 40, 42, 44].map((size, index) => {
          return (
            <div key={index} className={size === selectedSize ? "circle outline" : "circle"} onClick={() => setSelectedSize(size)}>
              {size}
            </div>
          );
        })}
      </div>
    </div>
          </div>
        </div>
        {/* <SelectSize sizes={[38, 40, 42, 44]} selectedSize={(size) => setSelectedSize(size)} showSizeError={showSizeError} /> */}
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
  @media screen and (max-width: 500px) {
    margin-top: 16px;
  }
}

.customModal {
  img {
    width: 200px;
    @media screen and (max-width: 500px) {
      display: block;
    margin: auto;
    height: 220px;
    object-fit: contain;
  }
  }
  .info {
    display: flex;
    @media screen and (max-width: 500px) {
    display: block;
  }
    .contentPrice {
      padding-left: 16px;
      .row1 {
        padding-top: 0.5rem;
        display: flex;
        align-items: center;
        font-size: 14px;
        .price {
          font-weight: 700;
          line-height: 1;
          margin: 0;
        }
        .originalPrice {
          padding-left: 8px;
          text-decoration: line-through;
          color: #535665;
        }
        .discount {
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

.selectSize{
  margin-top: 10px;
}


  .sizes {
    display: flex;
    flex-wrap: wrap;
    gap:12px;
    margin-top: 6px;
  }
  p {
    font-weight: 600;
    text-transform: uppercase;
    color: black;
  }
  .circle {
    padding: 6px 8px;
    margin-right: 1rem;
    border: 1px solid #bfc0c6;
    border-radius: 50px;
    cursor: pointer;
    &:hover {
      border: 1px solid #ff3e6c;
    }
    @media screen and (max-width: 1000px) {
      padding: 6px 8px;
          }

  }
  .outline {
    border: 1px solid #ff3e6c;
    color: #ff3e6c;
  }
  span {
    color: #ff3e6c;
  }

`
