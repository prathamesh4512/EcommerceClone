import React, { useState } from "react";
import { Breadcrumb, Drawer } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import FilterBar from "../components/FilterBar";
import SortByMenu from "../components/SortByMenu";
import CardList from "../modules/CardList";
import Layout from "../modules/Layout";
import selectProducts from "../selectors/products";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setShowSimilar } from "../store/common/reducer";
import styled from "styled-components";

const Shirts = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const filters = useSelector((state) => state.filter);
  const common = useSelector((state) => state.common);
  const sortBy = useSelector((state) => state?.sortBy?.sortType);
  const dispatch = useDispatch();
  const products = selectProducts(
    useSelector((state) => state.bag.allProducts),
    { sortBy, filters }
  );

  return (
    <Layout>
      <Wrapper className="shirts">
        <div className="rows">
          <div className="row">
            <Breadcrumb
              className="breadcrumb"
              items={[
                {
                  title: <Link to="/">Home</Link>,
                },
                {
                  title: "Clothing",
                },
              ]}
            />
          </div>
          <div className="row2">
            <span>Shirts For Men & Women</span> - {products.length} items
          </div>
          <div className="row3">
            <h1>Filters</h1>
            <SortByMenu />
          </div>
          <div className="row4">
            <button onClick={()=>setOpenFilter(true)}>
              <FilterOutlined />
              <span>Filter</span>
            </button>
          </div>
        </div>
        <div className="main">
          <div className="filter_bar">
          <FilterBar />
          </div>
          <CardList data={products} forWishlist={false} />
        </div>
      </Wrapper>
      <Drawer
        title="Similar Products"
        placement="right"
        closable={true}
        onClose={() =>
          dispatch(
            setShowSimilar({
              query: common.queryForSimilar,
              id: common.similarFor,
            })
          )
        }
        open={common?.showSimilar}
        width={324}
        closeIcon={true}
      >
        <CardList
          forWishlist={false}
          isSimilar={true}
          data={selectProducts(products, {
            filters: { ...filters, text: common.queryForSimilar },
            sortBy,
          }).filter((item) => item.id !== common.similarFor)}
        />
      </Drawer>
      <Drawer
        placement="bottom"
        closable={true}
        // width={324}
        height={"85vh"}
        closeIcon={true}
        title="Filter"
        open={openFilter}
        onClose={() => setOpenFilter(false)}
      >
        <FilterBar />
      </Drawer>
    </Layout>
  );
};
export default Shirts;

const Wrapper = styled.div`
  padding: 16px 0 16px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  .breadcrumb {
    font-size: 12px;
  }
  .breadcrumbItem {
    font-weight: 700;
  }
  .rows {
    width: 90%;
  }
  .row2 {
    padding-top: 8px;
    text-align: left;
    font-size: 14px;
    span {
      font-weight: 700;
    }
  }
  .row3 {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 1px solid #d4d5d9;
    @media screen and (max-width: 850px) {
      display: none;
    }
    h1 {
      font-size: 14px;
      font-weight: 700;
      text-transform: uppercase;
      padding: 16px 0 8px 0;
    }
  }
  .row4 {
    display: none;
    border-bottom: 1px solid #d4d5d9;
    padding: 10px;
    button {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: 6px;
      border: 1px solid black;
      border-radius: 10px;
      font-size: 12px;
      padding: 4px 4px;
    }
    @media screen and (max-width: 850px) {
      display: block;
    }
  }
  .main {
    display: grid;
    grid-template-columns: 1fr 6fr;
    width: 90%;
    @media screen and (max-width: 850px) {
      display: block;
    }
  }
  .filter_bar{
    display: block;
    @media screen and (max-width: 850px) {
    display: none;
  }
  }
`;
