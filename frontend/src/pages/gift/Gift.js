// import teddybear from "../../assets/giftItem/teddybear.png";
// import bag from "../../assets/giftItem/bag.jpg";
// import bowlset from "../../assets/giftItem/bowlset.jpg";
// import cactus from "../../assets/giftItem/cactus.png";
// import glasses from "../../assets/giftItem/glasses.png";
// import helmet from "../../assets/giftItem/helmet.png";
// import laptopbag from "../../assets/giftItem/laptopbag.jpeg";
// import shampoo from "../../assets/giftItem/shampoo.png";
// import succulent from "../../assets/giftItem/succulent.png";
// import supertepid from "../../assets/giftItem/supertepid.png";
// import teaset from "../../assets/giftItem/teaset.png";
// import teddyoctopus from "../../assets/giftItem/teddyoctopus.jpg";
// import error from "../../assets/giftItem/error.png";
import React, { useEffect, useState } from "react";
import API from "../../services/API";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";
import ModalGift from "./../../components/shared/modal/ModalGift";

import "./index.css";
import { AnimatePresence } from "framer-motion";
import Listing from "./Listing";
import Overlay from "./Overlay";
import Item from "./Item";
import { Button, Typography } from "@mui/material";

// const imgArray = [
//   error,
//   bag,
//   bowlset,
//   cactus,
//   glasses,
//   helmet,
//   laptopbag,
//   shampoo,
//   succulent,
//   supertepid,
//   teaset,
//   teddyoctopus,
//   teddybear,
// ];

const GiftList = () => {
  const [open, setOpen] = useState(null);
  const [showPoint, setShowPoint] = useState(false); // Add showPoint state

  const openItem = (index) => {
    setOpen(index);
  };

  const closeItem = () => {
    setOpen(null);
  };

  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  // find gift data
  const getGifts = async () => {
    try {
      const { data } = await API.get("/gift/gift-list");
      console.log(data);
      if (data?.success) {
        setData(data?.giftData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGifts();
  }, []);

  const togglePoint = () => {
    setShowPoint(!showPoint);
  };

  return (
    <Layout>
      <br></br>
      {user?.role === "donar" && (
        <div className="container">
          {showPoint ? (
            // <p>Your point: {user?.point || 0}</p>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Your point: {user?.point || 0}
            </Typography>
          ) : (
            <Button onClick={togglePoint}>Show Point</Button>
          )}
        </div>
      )}
      {user?.role === "organisation" && (
        <div className="divButton">
          <button
            className="mb-4 button-89"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            style={{ cursor: "pointer" }}
          >
            Add Gift
          </button>
        </div>
      )}
      <div className="properties">
        {data?.map((record, index) => (
          <div key={index}>
            <Listing data={record} open={() => openItem(index)} />
            <AnimatePresence>
              {open === index && (
                <>
                  <Overlay close={closeItem}>
                    {/* <h1>{record.giftName}</h1> */}
                    <Item
                      giftData={record}
                      close={closeItem}
                      isOpen={open === index}
                    />
                  </Overlay>
                </>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      {/* <ModalGift record={selectedRecord} /> */}
      <ModalGift />
    </Layout>
  );
};

export default GiftList;
