import React from 'react';
import Layout from '../modules/Layout';
import { Carousel } from 'antd';
import { carouselData,shopByCategory } from '../utils/Products';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Layout>
        <Wrapper>
    <div>
        <Carousel autoplay={true} autoplaySpeed={2000} dots={true}>
            {carouselData?.map((ele,idx)=>
            <img src={ele} alt="bg"  key={ele} className='carousel_image'/>
            )}
        </Carousel>
    </div>
    <section className='shop_by'>
        <h1>SHOP BY CATEGORY</h1>
    <div className='category_list'>
        {shopByCategory?.map((link,idx)=>(
            <Link to="/clothing" key={idx}>
            <img src={link}/>
            </Link>
        ))}
    </div>
    </section>
    </Wrapper>
    </Layout>
  )
}

export default Home;

const Wrapper = styled.section`
    margin: 32px 0px 60px;

    .carousel_image{
        object-fit: cover;
    }

    h1{
        font-size: 24px;
        margin-bottom: 20px;
    }

    .category_list{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-evenly;
        img{
            width: 250px;
            height: 300px;
        }
    }

    .shop_by{
        margin-top: 32px;
        padding: 0 24px;
        text-align: left;
    }
`