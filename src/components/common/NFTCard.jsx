import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";

const NFTCard = ({
  authorId,
  authorImage,
  expiryDate,
  likes,
  nftId,
  nftImage,
  price,
  title,
  isLoading,
  className,
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
      <div className={className} data-aos="fade-up">
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
    <div className={className} data-aos="fade-up">
      <div className="nft__item">
        <div className="author_list_pp">
          <Link
            to={`/author/${authorId}`}
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

          <Link to={`/item-details/${nftId}`}>
            <img src={nftImage} className="lazy nft__item_preview" alt="" />
          </Link>
        </div>
        <div className="nft__item_info">
          <Link to={`/item-details/${nftId}`}>
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

export { NFTCard };
