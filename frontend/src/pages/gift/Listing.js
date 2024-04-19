import React from "react";
import { motion } from "framer-motion";
import "./Listing.css";

import teddybear from "../../assets/giftItem/teddybear.png";
import bag from "../../assets/giftItem/bag.jpg";
import bowlset from "../../assets/giftItem/bowlset.jpg";
import cactus from "../../assets/giftItem/cactus.png";
import glasses from "../../assets/giftItem/glasses.png";
import helmet from "../../assets/giftItem/helmet.png";
import laptopbag from "../../assets/giftItem/laptopbag.jpeg";
import shampoo from "../../assets/giftItem/shampoo.png";
import succulent from "../../assets/giftItem/succulent.png";
import supertepid from "../../assets/giftItem/supertepid.png";
import teaset from "../../assets/giftItem/teaset.png";
import teddyoctopus from "../../assets/giftItem/teddyoctopus.jpg";
import error from "../../assets/giftItem/error.png";

const imgArray = [
    error,
    bag,
    bowlset,
    cactus,
    glasses,
    helmet,
    laptopbag,
    shampoo,
    succulent,
    supertepid,
    teaset,
    teddyoctopus,
    teddybear,
  ];

const Listing = ({ data, open }) => {
  const { giftName, point, remain } = data;

  const findGiftImage = (giftName) => {
    const formattedGiftName = giftName.toLowerCase().replace(/[_-]/g, "");
    const index = imgArray.findIndex((img) =>
      img.toLowerCase().includes(formattedGiftName)
    );
    if (index !== -1) {
      return imgArray[index];
    }
    return imgArray[0];
  };

  return (
    <motion.div
      className="listing"
      onClick={open}
      whileHover={{ scale: 1.1 }}
    >
      <div className="listing__content">
        <div className="listing__image-container">
          <img
            className="listing__image"
            alt="real estate mansion"
            src={findGiftImage(giftName)}
          />
        </div>
        <div className="listing__row"></div>
        <div className="listing__row"></div>
        <div className="listing__details">
          <div className="listing__row">
            <span className="listing__price">{giftName.toUpperCase()}</span>
          </div>

          <div className="listing__row">
            <span className="listing__address" style={{ fontSize: "15px" }}>
              Point: {point}
            </span>
          </div>
          <div className="listing__row">
            <span className="listing__address" style={{ fontSize: "15px" }}>
              Remain: {remain}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Listing;
