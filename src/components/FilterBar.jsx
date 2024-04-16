import React, { useState } from "react";
import { Radio , Checkbox } from "antd";
import { filterColors } from "../utils/filterColors";
import { useDispatch,useSelector } from "react-redux";
import styled from "styled-components";
import { setGenderFilter, setDiscountRangeFilter, setColorFilter, setPriceFilter } from "../store/filter/reducer";


const FilterBar=({}) => {
  const filters = useSelector((state) => state.filter);
  const [gender, setGender] = useState(filters.gender);
  const [colors, setColors] = useState(filters.color);
  const [discountRange, setDiscountRange] = useState(filters.discountRange);
  const [price, setPrice] = useState(filters.price);

  const dispatch = useDispatch();

  const onGenderChange = (e) => {
    setGender(e.target.value);
    dispatch(setGenderFilter(e.target.value));
  };

  const onDiscountRangeChange = (e) => {
    setDiscountRange(e.target.value);
    dispatch(setDiscountRangeFilter(e.target.value));
  };

  const onColorsChange = (checkedValues) => {
    setColors(checkedValues);
    dispatch(setColorFilter(checkedValues));
  };

  const onPriceChange = (checkedValues) => {
    setPrice(checkedValues);
    dispatch(setPriceFilter(checkedValues));
  };

  return (
    <Wrapper>
      <div className={"gender padding borderBottom"}>
        <Radio.Group onChange={onGenderChange} value={gender} size="small">
          <Radio value={"MALE"}>Men</Radio>
          <Radio value={"FEMALE"}>Women</Radio>
          <Radio value={"BOYS"}>Boys</Radio>
          <Radio value={"GIRLS"}>Girls</Radio>
        </Radio.Group>
      </div>

      <div className="categories padding borderBottom">
        <h2>Price</h2>
        <Checkbox.Group onChange={onPriceChange} value={price}>
          <Checkbox value={"374-1531"}>Rs. 374 to Rs. 1531</Checkbox>
          <Checkbox value={"1531-2688"}>Rs. 1531 to Rs. 2688</Checkbox>
          <Checkbox value={"2688-3845"}>Rs. 2688 to Rs. 3845</Checkbox>
          <Checkbox value={"3845-5002"}>Rs. 3845 to Rs. 5002</Checkbox>
        </Checkbox.Group>
      </div>
      <div className="colors padding borderBottom">
        <h2>Colors</h2>
        <Checkbox.Group onChange={onColorsChange} value={colors}>
          {filterColors.map((item) => {
            return (
              <Checkbox value={item.name} key={item.name} style={{ display: "flex" }}>
                <div style={{ display: "flex" }}>
                  <p style={{ backgroundColor: item.hex, width: 16, height: 16, borderRadius: 100, border: "1px solid #d6d6d6" }}></p>
                  <p style={{ marginLeft: 8 }}> {item.name}</p>
                </div>
              </Checkbox>
            );
          })}
        </Checkbox.Group>
      </div>
      <div className="discount padding borderBottom">
        <h2>DISCOUNT RANGE</h2>
        <Radio.Group onChange={onDiscountRangeChange} value={discountRange} size="small">
          <Radio value={10}>10% and above</Radio>
          <Radio value={20}>20% and above</Radio>
          <Radio value={30}>30% and above</Radio>
          <Radio value={40}>40% and above</Radio>
          <Radio value={50}>50% and above</Radio>
          <Radio value={60}>60% and above</Radio>
        </Radio.Group>
      </div>
    </Wrapper>
  );
};
export default FilterBar;

const Wrapper = styled.aside`
text-align: left;
    width: 14rem;
  border: 1px solid #e9e9ed;
  border-left: none;
  @media screen and (max-width: 850px) {
    border: none;
    width: auto;
    margin-top: -20px;
    }
  span {
    font-size: 12px;
  }
  h2 {
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 14px;
  }
  .gender {
    display: flex;
    flex-direction: column;
    span {
      font-weight: 700;
      line-height: 150%;
    }
  }

  .padding {
    padding: 14px 16px;
  }

  .borderBottom {
    border-bottom: 1px solid #e9e9ed;
  }
  .ant-radio-wrapper {
    /* padding-bottom: 4px; */
    display: flex;
    align-items: flex-end;
    width: 100%;
  }
  .ant-checkbox-group {
    display: flex;
    flex-direction: column;
  }
  .ant-checkbox-wrapper {
    /* padding-bottom: 4px; */
  }
  .ant-checkbox-wrapper + .ant-checkbox-wrapper {
    margin: 0;
  }
  .ant-radio-group{
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .ant-checkbox-group{
    display: flex;
    flex-direction: column;
    gap:2px;
  }

  .ant-checkbox-wrapper {
    align-items: flex-end;
  }

`
