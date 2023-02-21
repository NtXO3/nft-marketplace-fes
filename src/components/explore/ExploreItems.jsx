import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NFTCard } from "../common";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(8);
  const [filter, setFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchExploreItems = async () => {
    setIsLoading(true);
    const query = filter ? `?filter=${filter}` : "";

    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore${query}`
    );
    setItems(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchExploreItems();
  }, [filter]);

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {items.length > 0 && !isLoading
        ? items
            .slice(0, itemsToShow)
            .map((item) => (
              <NFTCard
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                {...item}
              />
            ))
        : new Array(8)
            .fill(0)
            .map(() => (
              <NFTCard
                isLoading
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
              />
            ))}
      <div className="col-md-12 text-center">
        {itemsToShow < items.length && (
          <button
            onClick={() => setItemsToShow((curr) => curr + 4)}
            to=""
            id="loadmore"
            className="btn-main lead"
          >
            Load more
          </button>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
