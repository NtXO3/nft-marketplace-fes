import axios from "axios";
import React, { useEffect, useState } from "react";
import { NFTCard } from "../common";
import { Carousel } from "../common/Carousel";

const NewItems = () => {
  const [items, setItems] = useState([]);

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
            <div data-aos="fade-up" className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Carousel>
            {items.length > 0
              ? items.map((item) => <NFTCard key={item.id} {...item} />)
              : new Array(4).fill(0).map(() => <NFTCard isLoading />)}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
