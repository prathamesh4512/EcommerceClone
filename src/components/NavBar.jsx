import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import Bag from "../assets/bag.svg";
import Heart from "../assets/heart.svg";
import Profile from "../assets/profile.svg";
import Search from "../assets/search.svg";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setTextFilter } from "../store/filter/reducer";
import { Drawer } from "antd";
import { MenuOutlined, RightOutlined } from "@ant-design/icons";

const Navbar = ({}) => {
  const dispatch = useDispatch();
  const wishListed = useSelector((state) => state.bag.wishList);
  const bag = useSelector((state) => state.bag.bag);
  const [value, setValue] = useState("");
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <Wrapper>
      <MenuOutlined onClick={() => setOpenMenu(true)} className="menu_icon" />

      <div className="left_section">
        <Link to="/" className="logo">
          <img src={logo} alt="logo" />
        </Link>
        <div className="links">
          <Link to="/clothing">MEN</Link>
          <Link to="/clothing">WOMEN</Link>
          <Link to="/clothing">KIDS</Link>
          <Link to="/clothing">HOME & LIVING</Link>
          <Link to="/clothing">OFFERS</Link>
        </div>
      </div>

      <div className="right_section">
        <div className="searchBar">
          <div className="searchBar_Icon">
            <img src={Search} alt="search" className="nav_bar_icons" />
          </div>
          <input
            type="text"
            className="input"
            placeholder="Search for products, brands and more"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              dispatch(setTextFilter(e.target.value));
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                dispatch(setTextFilter(value));
              }
            }}
          />
        </div>
        <div className="profiles">
          <Link to="/clothing" className="profile_item">
            <img src={Profile} alt="profile" className="nav_bar_icons" />
            <p>Profile</p>
          </Link>
          <Link to="/wishlist" className="profile_item">
            <img src={Heart} alt="wishlist" className="nav_bar_icons" />
            {wishListed.length > 0 && (
              <span className="wishlist_score">{wishListed.length}</span>
            )}
            <p>Wishlist</p>
          </Link>
          <Link to="/cart" className="profile_item">
            <img src={Bag} alt="card" className="nav_bar_icons" />
            {bag.length > 0 && <span className="bag_score">{bag.length}</span>}
            <p>Bag</p>
          </Link>
        </div>
      </div>

      {openMenu && (
        <Drawer
          title="Menu"
          placement="left"
          closable={true}
          open={openMenu}
          width={324}
          onClose={() => setOpenMenu(false)}
          closeIcon={true}
        >
          <HamMenu>
            <Link to="/">
              <div className="menu_item" onClick={() => setOpenMenu(false)}>
                <span>{"Home"}</span>
                <RightOutlined />
              </div>
            </Link>
            {["Men", "Women", "Kids", "Home & Living", "Offers"]?.map(
              (ele, idx) => (
                <Link to="/clothing">
                  <div
                    className="menu_item"
                    key={idx}
                    onClick={() => setOpenMenu(false)}
                  >
                    <span>{ele}</span>
                    <RightOutlined />
                  </div>
                </Link>
              )
            )}

            <div className="profile_menu">
              <hr />
              <div className="menu_list">
              <Link to="/">
                  <div
                    className="menu_item"
                    onClick={() => setOpenMenu(false)}
                  >
                    <span>Profile</span>
                    <RightOutlined />
                  </div>
                </Link>
                <Link to="/wishlist">
                  <div
                    className="menu_item"
                    onClick={() => setOpenMenu(false)}
                  >
                    <span>Wishlist</span>
                    <RightOutlined />
                  </div>
                </Link>
                <Link to="/cart">
                  <div
                    className="menu_item"
                    onClick={() => setOpenMenu(false)}
                  >
                    <span>Bag</span>
                    <RightOutlined />
                  </div>
                </Link>
              </div>
            </div>
          </HamMenu>
        </Drawer>
      )}
    </Wrapper>
  );
};
export default Navbar;

const Wrapper = styled.div`
  display: flex;
  height: 4.5rem;
  align-items: center;
  justify-content: space-between;
  padding-left: 4%;
  padding-right: 4%;
  box-shadow: 0 4px 12px 0 rgb(0 0 0 / 5%);
  overflow: hidden;
  @media screen and (max-width: 980px) {
    height: 4rem;
  }

  .left_section,
  .right_section {
    display: flex;
    gap: 20px;
    align-items: center;
  }

  .left_section {
    @media screen and (max-width: 980px) {
      display: none;
    }
  }

  .menu_icon {
    display: none;
    margin-left: -10px;
    @media screen and (max-width: 980px) {
      display: block;
    }
    @media screen and (max-width: 500px) {
      margin: 0;
    }
  }



  .right_section {
    gap: 30px;
  }

  img[alt="logo"] {
    width: 28px;
    height: 28px;
  }

  .wishlist_score,
  .bag_score {
    position: absolute;
    background-color: red;
    border-radius: 50%;
    padding: 2px 6px;
    font-size: 12px;
    color: white;
    top: -11px;
    left: 56px;
  }

  .bag_score {
    left: 43px;
  }

  .links {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    cursor: pointer;
    a {
      padding: 0 17px;
      font-size: 12px;
      font-weight: 700;
      color: black;
      &:hover {
        color: red;
      }
    }
  }

  .right_section {
    display: flex;
  }
  .nav_bar_icons {
    width: 16px;
    height: 16px;
  }

  .searchBar {
    display: flex;
    align-items: center;
    position: relative;
    width: 24vw;
    min-width: 200px;
    .searchBar_Icon {
      position: absolute;
      left: 4px;
    }

    .input {
      font-size: 14px;
      height: 16px;
      line-height: 24px;
      width: 120%;
      color: #696e79;
      -webkit-box-sizing: content-box;
      box-sizing: content-box;
      padding: 8px 10px 10px;
      margin: 0;
      outline: 0;
      font-size: 12px;
      border: 1px solid #f5f5f6;
      border-radius: 8px 8px;
      background: #f5f5f6;
      padding-left: 26px;
      &:focus {
        background: white;
        border: 2px solid #f5f5f6;
        &::placeholder {
          opacity: 0;
        }
      }
    }
  }

  .profiles {
    display: flex;
    @media screen and (max-width: 600px) {
      display: none;
    }
    svg {
      width: 16px;
      height: 16px;
    }
    .profile_item {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-left: 32px;
      position: relative;
      p {
        padding-top: 5px;
        font-size: 12px;
        font-weight: 600;
        margin: 0;
        color: #282c3f;
      }
      &:first-child {
        padding-left: 0;
      }

      &:hover {
        p {
          color: red;
        }
      }
    }
  }
`;

const HamMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  .menu_item {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  .menu_list{
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    gap:16px;
  }
`;
