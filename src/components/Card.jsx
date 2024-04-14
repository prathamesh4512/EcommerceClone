import React, { useState } from "react";
import { Carousel } from "antd";
import { CloseOutlined, CopyOutlined, HeartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import CustomModal from "./CustomModal";
import styled , {css} from "styled-components";
import { useDispatch } from "react-redux";
import { addInWishlist, removeInWishList } from "../store/bag/reducer";
import { setShowSimilar } from "../store/common/reducer";


const Card=({
  images,
  color,
  brandName,
  productName,
  price,
  originalPrice,
  discountPercent,
  id,
  wishListed,
  forWishlist = false,
  isSimilar = false,
}) => {
  const [autoPlay, setAutoPlay] = useState(false);
  const [insideWishList, setInsideWishList] = useState(wishListed);
  const [showModal, setShowModal] = useState(false);


  const dispatch = useDispatch();

  const toggleAddToWishList = () => {
    setInsideWishList(!insideWishList);
    if (insideWishList) {
      dispatch(removeInWishList(id));
    } else {
      dispatch(
        addInWishlist({
          images,
          brandName,
          productName,
          price,
          originalPrice,
          discountPercent,
          id,
        })
      );
    }
  };
  return (
    <CardWrapper isWishListed={forWishlist} onMouseOver={() => setAutoPlay(true)} onMouseLeave={() => setAutoPlay(false)}>
      <Link to={"/clothing/" + id} className="imageContainer">
        <Carousel autoplay={autoPlay} dots={autoPlay} autoplaySpeed={2000}>
          {images.map((item, index) => {
            return <img key={index} src={item} alt="" />;
          })}
        </Carousel>
      </Link>
      {!isSimilar && <div
        className="similar"
        onClick={() => {
          dispatch(
            setShowSimilar({
              query: color.join(" "),
              id,
            })
          );
        }}
      >
        <button>
          <CopyOutlined />
        </button>
      </div>}
      {forWishlist && (
        <div
          className="removeFromWishlist"
          onClick={() => {
            dispatch(removeInWishList(id));
          }}
        >
          <button>
            <CloseOutlined />
          </button>
        </div>
      )}
      {!forWishlist && (
        <div className="wishlist">
          <button onClick={toggleAddToWishList} className={insideWishList ? "buttonActive" : ""}>
            <HeartOutlined /> {insideWishList ? "Wishlisted" :"Wishlist"}
          </button>
        </div>
      )}
      <Link to={"/clothing/" + id}>
        <div className="content">
          {!forWishlist && <p className="brand">{brandName}</p>}
          <p className="product">{productName}</p>
          <div className="priceContainer">
            <span className="price">Rs. {price}</span>
            <span className="originalPrice">Rs. {originalPrice}</span>
            <span className="discount">{discountPercent}%</span>
          </div>
        </div>
      </Link>
      {forWishlist && (
        <div className="moveToBag">
          <button
            onClick={() => {
              setShowModal(true);
            }}
          >
            Move To bag
          </button>
        </div>
      )}
      <CustomModal
        handleModalVisible={setShowModal}
        isModalVisible={showModal}
        product={{ images, color, brandName, productName, price, originalPrice, discountPercent, id }}
      />
    </CardWrapper>
  );
};
export default Card;


const CardWrapper = styled.div`
  width: 232px;
  height: 400px;
  border-radius: 2px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  /* margin-bottom: 32px;
  margin-left: 1.8vw; */
  margin: auto;

  p {
    margin: 0;
  }
  .content {
    padding:0px 8px;
    color:#282c3f;
    text-align: left;
    line-height: 150%;
    padding-bottom: 6px;
  }
 
  .ant-carousel .slick-dots-bottom {
    bottom: ${props=>props.isWishListed ? "":"55px"};
  }
  .wishlist {
    visibility: hidden;
    position: absolute;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    bottom: 80px;
    background-color: white;
    height: 48px;
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      text-transform: uppercase;
      border: 1px solid #d4d5d9;
      padding: 4px 8px;
      width: 90%;
      svg {
        width: 16px;
        height: 16px;
        margin-right: 8px;
      }
    }
    .buttonActive {
      color: #ff3f6c ;
      svg {
        path {
          fill: #ff3f6c ;
        }
      }
    }
  }

  .similar {
    visibility: hidden;
    position: absolute;
    bottom: 40%;
    right: 8%;
    z-index: 11;
    background-color: white;
    border-radius: 100%;
    width: fit-content;
    svg {
      path {
        fill:#ff3f6c ;
      }
    }
    transition: all 0.1s ease-in-out;

    &:hover {
      width: fit-content;
      border-radius: 16px;
      display: flex;
      align-items: center;
      padding: 2px 12px;
      &::after {
        content: "View Similar";
        font-size: 12px;
      }
    }
  }

  .removeFromWishlist {
    position: absolute;
    top: 16px;
    right: 10px;
    background-color: #e9e9eb;
    border-radius: 50%;

    /* display: flex;
    align-items: center; */
    button{
      width: 24px;
    height: 22px;
    }
    svg{
      width: 12px;
      height: 12px;
      path{
        fill: #282c3f;
      }
    }
  }

  .brand {
    font-weight: 700;
    font-size: 14px;
  }
  .product {
    font-size: 12px;
    padding-top: 4px;
  }
  .priceContainer {
    padding-top: 4px;
  }
  .price {
    font-weight: 12px;
    font-weight: 700;
    padding-right: 8px;
  }

  .originalPrice {
    text-decoration: line-through;
    padding-right: 8px;
  }
  .discount {
    color: #ff3f6c;
  }

  &:hover {
    .wishlist,
    .similar {
      visibility: visible;
    }

    box-shadow: 0 8px 16px 0 rgb(0 0 0 / 5%);
  }

  ${props=>props.isWishListed && css`
  height: 418px;
  outline: 1px solid #e9e9eb;

  .moveToBag {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 4px;
    padding: 10px 0;
    outline: 1px solid #e9e9eb;
    button {
      color: #ff3e6c;
      font-weight: 700;
      text-transform: uppercase;
    }
  }
  `}
`

