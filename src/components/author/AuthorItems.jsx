import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import { NFTCard } from "../common";

const AuthorItems = ({ items, isLoading, authorImage }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {items?.length > 0 && !isLoading
            ? items.map((item) => (
                <NFTCard
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={item.authorId}
                  {...item}
                  authorImage={authorImage}
                />
              ))
            : new Array(8)
                .fill(0)
                .map((_, index) => (
                  <NFTCard
                    className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                    isLoading
                    key={`item-${index}`}
                  />
                ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
