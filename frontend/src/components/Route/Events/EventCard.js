import React from "react";
import styles from "../../../styles/styles";
import CountDown from "./CountDown";

const EventCard = ({ active, data }) => {
  console.log({ data });
  return (
    <div
      className={`w-full block bg-white rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex p-2 `}
    >
      <div className="w-full lg:-w[50%] m-auto">
        <img
          src={data?.images}
          alt=""
          className="w-[600px] h-[400px] object-contain"
        ></img>
      </div>
      <div className="w-full lg:[w-50%] flex flex-col justify-center ">
        <h2 className={`${styles.productTitle} pb-[20px]`}>{data?.name}</h2>
        <p>{data?.description}</p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h4 className="font-bold text-[20px] text-[#333] font-Roboto">
              {data?.discountPrice}
            </h4>
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              {data?.originalPrice}
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            {data?.sold_out}
          </span>
        </div>
        <CountDown startDate={data?.startDate} endDate={data?.endDate} />
      </div>
    </div>
  );
};

export default EventCard;
