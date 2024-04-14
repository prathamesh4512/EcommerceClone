import {
  ArrowRightOutlined,
  CommentOutlined,
  HeartOutlined,
  ShoppingFilled,
} from "@ant-design/icons";
import { Breadcrumb } from "antd";
import SelectSize from "../components/SelectSize";
import Layout from "../modules/Layout";
import React, { useEffect, useState } from "react";
// import Lightbox from "react-image-lightbox";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  addInBag,
  addInWishlist,
  removeInWishList,
} from "../store/bag/reducer";
import styled from "styled-components";

const ShirtDetails = ({}) => {
  const { id } = useParams();
  const product = useSelector((state) => state.bag.allProducts).find(
    (item) => item.id === id
  );
  const inWishList =
    useSelector((state) => state.bag.wishList).findIndex(
      (item) => item.id === id
    ) >= 0;
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showSizeError, setShowSizeError] = useState(false);
  const [addedToBag, setAddedToBag] = useState(false);
  const [insideWishList, setInsideWishList] = useState(inWishList);
  const dispatch = useDispatch();

  useEffect(() => {
    setShowSizeError(false);
  }, [selectedSize]);

  const toggleAddToWishList = () => {
    setInsideWishList(!insideWishList);
    if (insideWishList) {
      dispatch(removeInWishList(id));
    } else {
      dispatch(addInWishlist(product));
    }
  };
  return (
    <Layout>
      <Wrapper>
        <div className="row1">
          <Breadcrumb
            className="breadcrumb"
            items={[
              {
                title: <Link to="/">Home</Link>,
              },
              {
                title: <Link to="/">Clothing</Link>,
              },
              {
                title: (
                  <span className="breadcrumbItem">{product.productName}</span>
                ),
              },
            ]}
          />
        </div>
        <div className="main">
          <div className="images">
            {product.images.map((image, index) => {
              return (
                <div
                  key={index}
                  className="image"
                  // onClick={() => {
                  //   setIsOpen(true);
                  //   setPhotoIndex(index);
                  // }}
                >
                  <img src={image} className="imageTag" alt="" />
                </div>
              );
            })}
          </div>
          <div className="content">
            <div className="name">
              <h1>{product.brandName}</h1>
              <h2>{product.productName}</h2>
            </div>
            <button className="reviews">
              <CommentOutlined />
              {product.numberOfReviews} Reviews
            </button>
            <div className="border"></div>
            <div className="contentPrice">
              <div className="row1">
                <p className="price">RS. {product.price}</p>
                <p className="originalPrice">{product.originalPrice}</p>
                <p className="discount">{`(${product.discountPercent}% OFF)`}</p>
              </div>
              <div className="row2">inclusive of all taxes</div>
            </div>
            <SelectSize
              sizes={[38, 40, 42, 44, 46]}
              selectedSize={(size) => setSelectedSize(size)}
              showSizeError={showSizeError}
            />
            <div className="buttons">
              {addedToBag ? (
                <Link to="/bag" className="bag bag2">
                  Go to Bag <ArrowRightOutlined />
                </Link>
              ) : (
                <button
                  className="bag"
                  onClick={() => {
                    if (!selectedSize) setShowSizeError(true);
                    else {
                      setAddedToBag(true);
                      dispatch(
                        addInBag({
                          ...product,
                          quantity: 1,
                          selectedSize,
                        })
                      );
                    }
                  }}
                >
                  <ShoppingFilled /> Add To Bag
                </button>
              )}

              <button
                className={insideWishList ? "wishlist-active" : "wishlist"}
                onClick={toggleAddToWishList}
              >
                <HeartOutlined /> {insideWishList ? "WishListed" : "Wishlist"}
              </button>
            </div>
            <div className="border"></div>
            <div className="contentPrice contentPriceAlt">
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
        </div>
      </Wrapper>
      {/* {isOpen && (
        <Lightbox
          mainSrc={product.images[photoIndex]}
          nextSrc={product.images[(photoIndex + 1) % product.images.length]}
          prevSrc={product.images[(photoIndex + product.images.length - 1) % product.images.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() => setPhotoIndex((photoIndex + product.images.length - 1) % product.images.length)}
          onMoveNextRequest={() => setPhotoIndex((photoIndex + product.images.length + 1) % product.images.length)}
        />
      )} */}
    </Layout>
  );
};
export default ShirtDetails;

const Wrapper = styled.div`
  transition: all 0.3 ease-in-out;
  overflow: hidden;
  box-sizing: border-box;
  padding: 32px 9% 32px 9%;

  .breadcrumb {
    font-size: 14px;
  }
  .breadcrumbItem {
    font-weight: 700;
  }
  .main {
    padding-top: 16px;
  }

  .images {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 16px;
    justify-content: space-between;
    transition: all 0.3 ease-in-out;
    position: relative;
    .image {
      overflow: hidden;
      box-sizing: border-box;
      .imageTag {
        transition: all 0.2s ease-in-out;
        width: 24vw;
        /* cursor: zoom-in; */
        &:hover {
          transform: scale(1.03);
        }
      }
    }
  }

  h1 {
    font-size: 1px;
    font-weight: 700;
    text-transform: uppercase;
    padding: 16px 0 8px 0;
  }

  .main {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    .content {
      padding-left: 32px;
      width: 100%;
      text-align: left;
      .name {
        h1 {
          font-size: 24px;
          font-weight: 700;
          line-height: 1;
          margin: 0;
          padding: 0;
          padding-top: 5px;
        }
        h2 {
          color: #535665;
          padding: 4px 20px 14px 0;
          font-size: 20px;
          opacity: 0.8;
          font-weight: 400;
          margin: 0;
        }
      }

      .reviews {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 8rem;
        font-size: 14px;
        color: #535766;
        padding: 6px 12px;
        border: 1px solid #eaeaec;
        cursor: default;
        svg {
          path {
            fill: #535665;
          }
        }
      }
      .border {
        border-bottom: 1px solid #d4d5d9;
        width: 100%;
        padding-top: 12px;
      }

      .contentPrice {
        .row1 {
          padding-top: 1rem;
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

        .row2 {
          color: #0db7af;
          font-weight: 700;
          padding-top: 8px;
        }
      }

      .contentPriceAlt {
        .row1 {
          .price,
          .originalPrice,
          .discount {
            font-size: 16px;
          }
        }

        .row2 {
          color: #282c3f;
          font-weight: 500;
          padding-top: 4px;
          span {
            font-weight: 700;
          }
        }
      }

      .buttons {
        display: flex;
        width: 90%;
        margin: 28px 0 14px 0;
        button,
        a {
          display: flex;
          align-items: center;
          justify-content: center;
          /* text-transform: uppercase; */
          font-weight: 700;
          cursor: pointer;
          background-color: #ff3e6c;
          border: 1px solid #ff3e6c;
          color: #fff;
          text-align: center;
          width: 100%;
          margin-right: 3%;
          padding: 14px 0;
          border-radius: 4px;
          font-size: 14px;
          svg {
            height: 20px;
            width: 20px;
            margin-right: 8px;

            path {
              fill: white;
            }
          }
        }
        .wishlist,
        .wishlist-active {
          background-color: white;
          border: 1px solid #d4d5d9;
          color: #282c3f;
          width: 80%;
          svg {
            path {
              fill: #282c3f;
            }
          }

          &:hover {
            border: 1px solid #535766;
          }
        }

        .wishlist-active {
          color: #ff3e6c;
          svg {
            path {
              fill: #ff3e6c;
            }
          }
        }

        .bag:hover {
          background-color: lighten(#ff3e6c, 4%);
        }

        .bag2 {
          svg {
            margin: 0;
            margin-left: 8px;
          }
        }
      }
    }
  }
`;
