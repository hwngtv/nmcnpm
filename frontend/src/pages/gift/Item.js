import React, { useState } from "react";
import { motion } from "framer-motion";

import { IoCloseCircleOutline } from "react-icons/io5";
import "./Item.css";

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
import { useSelector } from "react-redux";
import API from "../../services/API";
import { useNavigate } from "react-router-dom";
import ModalGift from "../../components/shared/modal/ModalGift";

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

const Item = ({ giftData, close, isOpen }) => {
  const modalVariants = {
    open: {
      opacity: 1,
      transition: { staggerChildren: 0.5, delayChildren: 0.2 },
    },
    closed: { opacity: 0 },
  };

  if (!isOpen) {
    return null;
  }

  return (
    <motion.div
      className="modal__item"
      variants={modalVariants}
      onClick={(e) => e.stopPropagation()}
    >
      <Description data={giftData} close={close} />

      <motion.button
        className="modal__close-wrapper"
        whileHover={{ scale: 1.2 }}
        onClick={close}
      >
        <IoCloseCircleOutline className="modal__close-icon" />
      </motion.button>
    </motion.div>
  );
};

const Description = ({ data }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [selectedRecord, setSelectedRecord] = useState(null);
  const handleUpdate = (record) => {
    setSelectedRecord(record);
  };

  const handleDelete = async (id) => {
    try {
      let answer = window.prompt(
        "Are you sure want to delete this gift",
        "sure"
      );
      if (!answer) return;
      const { data } = await API.delete(`/gift/delete-gift/${id}`);
      alert(data?.message);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const ReceivedGift = async (record) => {
    console.log(record);
    console.log(user.point);
    if (user?.point < record.point) {
      alert("You do not have enough point");
      return;
    }
    if (record.remain < 1) {
      alert("This gifts is out of stock");
      return;
    }
    const { data } = await API.put(`gift/update-gift/${record._id}`, {
      giftName: record.giftName,
      point: record.point,
      remain: record.remain - 1,
    });
    console.log(data);
    const { data: data1 } = await API.put(
      `gift/update-user-point/${user._id}`,
      {
        point: user.point - record.point,
      }
    );
    console.log(data1);
    if (data?.success) {
      alert("Received Successfully");
      navigate("/gift");
      window.location.reload();
    }
  };

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

  const { giftName, point, remain } = data;

  const imageVariants = {
    open: { opacity: 1, y: "0vh" },
    closed: { opacity: 0, y: "-10vh" },
  };

  const modalInfoVariants = {
    open: { opacity: 1, transition: { staggerChildren: 0.2 } },
    closed: { opacity: 0 },
  };

  const modalRowVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "10%" },
  };

  return (
    <>
      <motion.img
        className="modal__image"
        alt="real estate mansion"
        src={findGiftImage(giftName)}
        variants={imageVariants}
      ></motion.img>
      <motion.div className="modal__info" variants={modalInfoVariants}>
        <motion.div className="modal__row" variants={modalRowVariants}>
          <span className="modal__price">{giftName.toUpperCase()}</span>
        </motion.div>
        <motion.div variants={modalRowVariants}>
          <p className="modal__description">Point: {point}</p>
        </motion.div>
        <motion.div variants={modalRowVariants}>
          <p className="modal__description">Remain : {remain}</p>
        </motion.div>
        <motion.div variants={modalRowVariants}>
        {user?.role === "organisation" && (
                  <div className="container">
                    <div className="row">
                      <div className="col-md-6">
                        <div
                          className="ms-4"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                          style={{ cursor: "pointer" }}
                        >
                          <button
                            onClick={() => handleUpdate(data)}
                            s
                            type="button"
                            className="btn btn-primary"
                          >
                            Update
                          </button>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <button
                          onClick={() => handleDelete(data._id)}
                          type="button"
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
          {user?.role === "donar" && (
            <div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => ReceivedGift(data)}
              >
                Choose
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
      <ModalGift record={selectedRecord}/>
    </>
  );
};

export default Item;
