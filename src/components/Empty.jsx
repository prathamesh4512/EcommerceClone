import React from "react";
import Lottie from "lottie-react";
import animation from "../assets/empty.json";
import styled from "styled-components";
import { Link } from "react-router-dom";


const Empty = ({ name, drawer = false ,showHome=true}) => {
  return (
    <Wrapper className="empty">
      <h1>{name}</h1>
      {!drawer && (
        <div className="animation">
          <Lottie
            animationData={animation}
          />
        </div>
      )}
     {showHome && <Link to="/clothing" className="home">
      <button>Go Home</button>
      </Link>}
    </Wrapper>
  );
};
export default Empty;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4vh;
  position: relative;
  /* justify-content: center; */
  h1 {
    text-align: center;
    font-size: 32px;
    text-transform: uppercase;
    color: #0db7af;
    font-weight: 700;
    margin-top: 20px;
    margin-bottom: -7vw;
  }
  .animation {
    width: 50vw;
  }

  .home {
    background-color: #ff3f6c;
    color: #fff;
    padding: 10px 16px;
    border-radius: 4px;
    position: absolute;
    top:35vw;
    button{
      color:#fff;
    }
  }
`
