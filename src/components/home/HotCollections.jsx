import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./HotCollections.css";
import Skeleton from "../UI/Skeleton";
import { Carousel } from "../common";

const Item = ({ nftImage, title, authorImage, code, isLoading, authorId }) => {
  if (isLoading) {
    return (
      <div className="nft_coll">
        <div className="nft_wrap">
          <Skeleton width="100%" height="100%" />
        </div>
        <div className="nft_coll_pp">
          <Skeleton width="100%" height={60} borderRadius="50%" />
          <i className="fa fa-check"></i>
        </div>
        <div className="nft_coll_info">
          <Skeleton width={108} height={22} borderRadius={4} /> <br />
          <Skeleton width={80} height={16} />
        </div>
      </div>
    );
  }

  return (
    <div className="nft_coll">
      <div className="nft_wrap">
        <Link to="/item-details">
          <img src={nftImage} className="lazy img-fluid" alt={title} />
        </Link>
      </div>
      <div className="nft_coll_pp">
        <Link to={`/author/${authorId}`}>
          <img className="lazy pp-coll" src={authorImage} alt="" />
        </Link>
        <i className="fa fa-check"></i>
      </div>
      <div className="nft_coll_info">
        <Link to="/explore">
          <h4>{title}</h4>
        </Link>
        <span>ERC-{code}</span>
      </div>
    </div>
  );
};

const HotCollections = () => {
  const [items, setItems] = useState([]);

  const fetchHotItems = async () => {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setItems(data);
  };

  useEffect(() => {
    fetchHotItems();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Carousel>
            {items.length > 0
              ? items.map((item) => <Item {...item} key={item.id} />)
              : new Array(4).fill(0).map(() => <Item isLoading />)}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
