import React, { useEffect, useState } from "react";
import styled from "styled-components";

const SelectSize = ({ sizes, selectedSize, showSizeError }) => {
  const [currentSize, setCurrenSize] = useState(null);

  useEffect(() => {
    selectedSize(currentSize);
  }, [currentSize]);
  
  return (
    <Wrapper className="SelectSize">
      <p>Select Size</p>
      {showSizeError && <span>Please select a size</span>}
      <div className="sizes">
        {sizes.map((size, index) => {
          return (
            <div key={index} className={size === currentSize ? "circle outline" : "circle"} onClick={() => setCurrenSize(size)}>
              {size}
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};
export default SelectSize;


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1.5rem;
  .sizes {
    display: flex;
  }
  p {
    font-size: 16px;
    font-weight: 600;
    text-transform: uppercase;
    color: black;
    padding-bottom: 1rem;
  }
  .circle {
    padding: 12px 15px;
    margin-right: 1rem;
    border: 1px solid #bfc0c6;
    border-radius: 50px;
    cursor: pointer;
    &:hover {
      border: 1px solid #ff3e6c;
    }
  }
  .outline {
    border: 1px solid #ff3e6c;
    color: #ff3e6c;
  }
  span {
    color: #ff3e6c;
    padding-bottom: 8px;
  }
`
