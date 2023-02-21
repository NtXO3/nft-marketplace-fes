import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "../common/Carousel";
import Skeleton from "../UI/Skeleton";

const Card = ({
  authorId,
  authorImage,
  expiryDate,
  id,
  likes,
  nftId,
  nftImage,
  price,
  title,
  isLoading,
}) => {
  const [timeRemaining, setTimeRemaining] = useState({});

  const hasExpired = Date.now() > expiryDate;

  const updateRemainingTime = () => {
    const remaining = expiryDate - Date.now();
    setTimeRemaining({
      hours: Math.floor(remaining / 1000 / 60 / 60),
      minutes: Math.floor((remaining / 1000 / 60) % 60),
      seconds: Math.floor((remaining / 1000) % 60),
    });
  };

  useEffect(() => {
    if (!expiryDate) return;

    updateRemainingTime();

    const cancelId = setInterval(updateRemainingTime, 1000);

    return () => {
      clearInterval(cancelId);
    };
  }, [expiryDate]);

  if (isLoading) {
    return (
      <div>
        <div className="nft__item">
          <div className="author_list_pp">
            <Skeleton width="100%" height={50} borderRadius="50%" />
            <i className="fa fa-check"></i>
          </div>

          <div className="nft__item_wrap">
            <div className="nft__item_extra">
              <div className="nft__item_buttons">
                <button>Buy Now</button>
                <div className="nft__item_share">
                  <h4>Share</h4>
                  <a href="" target="_blank" rel="noreferrer">
                    <i className="fa fa-facebook fa-lg"></i>
                  </a>
                  <a href="" target="_blank" rel="noreferrer">
                    <i className="fa fa-twitter fa-lg"></i>
                  </a>
                  <a href="">
                    <i className="fa fa-envelope fa-lg"></i>
                  </a>
                </div>
              </div>
            </div>

            <Skeleton
              className="nft__item_preview"
              width="100%"
              height={"100%"}
              borderRadius={2}
            />
          </div>
          <div className="nft__item_info">
            <Skeleton width={160} height={26} marginTop={4} borderRadius={2} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Skeleton width={96} height={19} borderRadius={2} />
              <Skeleton width={36} height={19} borderRadius={2} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="nft__item">
        <div className="author_list_pp">
          <Link
            to="/author"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Creator: Monica Lucas"
          >
            <img className="lazy" src={authorImage} alt="" />
            <i className="fa fa-check"></i>
          </Link>
        </div>
        {expiryDate && (
          <div className="de_countdown">
            {hasExpired
              ? "EXPIRED"
              : `${timeRemaining?.hours ?? 0}h ${
                  timeRemaining?.minutes ?? 0
                }m ${timeRemaining?.seconds ?? 0}s`}
          </div>
        )}

        <div className="nft__item_wrap">
          <div className="nft__item_extra">
            <div className="nft__item_buttons">
              <button>Buy Now</button>
              <div className="nft__item_share">
                <h4>Share</h4>
                <a href="" target="_blank" rel="noreferrer">
                  <i className="fa fa-facebook fa-lg"></i>
                </a>
                <a href="" target="_blank" rel="noreferrer">
                  <i className="fa fa-twitter fa-lg"></i>
                </a>
                <a href="">
                  <i className="fa fa-envelope fa-lg"></i>
                </a>
              </div>
            </div>
          </div>

          <Link to="/item-details">
            <img src={nftImage} className="lazy nft__item_preview" alt="" />
          </Link>
        </div>
        <div className="nft__item_info">
          <Link to="/item-details">
            <h4>{title}</h4>
          </Link>
          <div className="nft__item_price">{price} ETH</div>
          <div className="nft__item_like">
            <i className="fa fa-heart"></i>
            <span>{likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const NewItems = () => {
  const [items, setItems] = useState([]);
  console.log(items);

  const fetchNewItems = async () => {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setItems(data);
  };

  useEffect(() => {
    fetchNewItems();
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Carousel>
            {items.length > 0
              ? items.map((item) => <Card key={item.id} {...item} />)
              : new Array(4).fill(0).map(() => <Card isLoading />)}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
