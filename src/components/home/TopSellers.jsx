import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import Skeleton from "../UI/Skeleton";

const Seller = ({
  isLoading,
  id,
  authorId,
  authorName,
  authorImage,
  price,
}) => {
  if (isLoading) {
    return (
      <li data-aos="fade-up">
        <div className="author_list_pp">
          <div>
            <Skeleton width={50} height={50} borderRadius="50%" />
            <i className="fa fa-check"></i>
          </div>
        </div>
        <div className="author_list_info">
          <Skeleton width={96} height={20} /> <br />
          <Skeleton width={46} height={20} />
        </div>
      </li>
    );
  }

  return (
    <li data-aos="fade-up">
      <div className="author_list_pp">
        <Link to={`/author/${authorId}`}>
          <img className="lazy pp-author" src={authorImage} alt={authorName} />
          <i className="fa fa-check"></i>
        </Link>
      </div>
      <div className="author_list_info">
        <Link to="/author">{authorName}</Link>
        <span>{price} ETH</span>
      </div>
    </li>
  );
};

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);

  const fetchTopSellers = async () => {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    );
    setSellers(data);
  };

  useEffect(() => {
    fetchTopSellers();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div data-aos="fade-up" className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {sellers.length > 0
                ? sellers.map((seller) => <Seller {...seller} />)
                : new Array(12).fill(0).map(() => <Seller isLoading />)}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
