import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setSortType } from "../store/sort/reducer";


const SortByMenu = () => {
  const [current, setCurrent] = useState({
    key: "recommended",
    value: "Recommended",
  });
  const dispatch = useDispatch();

  const onCurrentSortChange = (e) => {
    setCurrent({
      key: e.target.value,
      value: e.target.textContent,
    });

    dispatch(setSortType(e.target.value));
  };
  return (
    <Wrapper >
      Sort By: <span className="label">{current.value}</span>
      <span className="icon">
        <DownOutlined />
      </span>
      <ul>
        <button value="NEW" onClick={onCurrentSortChange}>
          What's New
        </button>
        <button value="POPULAR" onClick={onCurrentSortChange}>
          Popularity
        </button>
        <button value="BETTER_DISCOUNT" onClick={onCurrentSortChange}>
          Better Discount
        </button>
        <button value="PRICE_HIGH_TO_LOW" onClick={onCurrentSortChange}>
          Price High To Low
        </button>
        <button value="PRICE_LOW_TO_HIGH" onClick={onCurrentSortChange}>
          Price Low To High
        </button>
        <button value="PRICE_LOW_TO_HIGH" onClick={onCurrentSortChange}>
          Price Low To High
        </button>
        <button value="Recommended" onClick={onCurrentSortChange}>
          Recommended
        </button>
      </ul>
    </Wrapper>
  );
};
export default SortByMenu;


const Wrapper = styled.div`
  padding: 8px 12px;
  font-size: 12px;
  color: #282c3f;
  cursor: pointer;
  position: relative;
  width: 240px;
  position: relative;
  box-sizing: border-box;
  border-radius: 2px;
  background-color: #fff;
  border: 1px solid #d4d5d9;

  .icon {
    position: absolute;
    right: 16px;
  }
  .label {
    padding-left: 4px;
    font-weight: 700;
  }

  ul {
    display: none;
    padding: 14px 0 14px 0;
    position: absolute;
    z-index: 10;
    border: 1px solid #d4d5d9;
    background-color: white;
    /* border-top: none; */
    width: 238px;
    left: -1px;
    top: 30px;
    button {
      padding-bottom: 0.5rem;
      padding-top: 0.5rem;
      width: 100%;
      text-align: start;
      padding-left: 14px;
      &:first-child {
        padding-top: 4px;
      }

      &:hover {
        background-color: #d4d5d9;
      }
    }
  }

  &:hover {
    ul {
      display: block;
    }

    border-bottom: none;
  }
`
