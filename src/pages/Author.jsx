import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { authorId } = useParams();
  const [authorData, setAuthorData] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const getAuthorData = async () => {
    if (!authorId) {
      return null;
    }

    try {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
      );
      if (data) {
        setAuthorData(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAuthorData();
  }, [authorId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!authorData.authorId) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>

          <section
            id="profile_banner"
            aria-label="section"
            className="text-light"
            style={{ padding: 0 }}
          >
            <Skeleton width="100%" height={360} />
          </section>

          <section aria-label="section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div
                        className="profile_avatar"
                        style={{ alignItems: "center" }}
                      >
                        <Skeleton width={150} height={150} borderRadius="50%" />

                        <i className="fa fa-check"></i>
                        <div
                          className="profile_name"
                          style={{
                            flexDirection: "column",
                            alignItems: "start",
                            gap: "4px",
                          }}
                        >
                          <Skeleton width={120} height={32} />
                          <Skeleton width={80} height={21} />
                          <Skeleton width={216} height={21} />
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <Skeleton width={108} height={21} marginRight={16} />
                        <button
                          className="btn-main"
                          onClick={() => setIsFollowing(!isFollowing)}
                          disabled
                        >
                          {isFollowing ? "Unfollow" : "Follow"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <AuthorItems isLoading />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  console.log(authorData);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{
            background: `url(${authorData.nftCollection[0].nftImage}) top`,
          }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={authorData.authorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {authorData.authorName}
                          <span className="profile_username">
                            @{authorData.tag}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {authorData.address}
                          </span>
                          <button
                            id="btn_copy"
                            title="Copy Text"
                            onClick={() => {
                              navigator.clipboard.writeText(authorData.address);
                              setShowSuccess(true);
                              setTimeout(() => setShowSuccess(false), 3000);
                            }}
                          >
                            {showSuccess ? "Copied" : "Copy"}
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {authorData.followers + (isFollowing ? 1 : 0)} followers
                      </div>
                      <button
                        className="btn-main"
                        onClick={() => setIsFollowing(!isFollowing)}
                      >
                        {isFollowing ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    items={authorData.nftCollection}
                    authorImage={authorData.authorImage}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
