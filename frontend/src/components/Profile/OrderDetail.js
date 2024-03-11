import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "../../styles/styles";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsFillBagFill } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const OrderDetail = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [detailOrder, setDetailOrder] = useState(null);
  const [rating, setRating] = useState(1);
  const { orders } = useSelector((state) => state.orders);
  const { token } = useSelector((state) => state.token);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    orders &&
      orders.map((order) => (order._id === id ? setDetailOrder(order) : null));
  }, []);
  const productId = selectedItem && selectedItem._id;
  const reviewHandler = async () => {
    await axios
      .put(
        `${server}/product/update-product-review`,
        { user, comment, rating, productId, orderId: id },
        {
          headers: { Authorization: token },
        }
      )
      .then((res) => toast.success("Succeed"), setOpen(false))
      .catch((err) => toast.error(err.response.data.msg));
  };
  const refundHandler = async () => {
    const status = "Processing refund";
    const orderId = id;
    await axios
      .put(
        `${server}/payment/refund-order`,
        { status, orderId },
        {
          headers: { Authorization: token },
          "Content-Type": "multipart/form-data",
        }
      )
      .then((res) => toast.success(res.data.msg), setOpen(false))
      .catch((err) => toast.error(err.response.data.msg));
  };
  return (
    <div className={`py-4 px-10 min-h-screen ${styles.section}`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-[25px]">Order Details</h1>
        </div>
      </div>

      <div className="w-full flex items-center justify-between pt-6">
        <h5 className="text-[#00000084]">
          Order ID: <span>#{detailOrder?._id?.slice(0, 8)}</span>
        </h5>
        <h5 className="text-[#00000084]">
          Placed on: <span>{detailOrder?.createdAt?.slice(0, 10)}</span>
        </h5>
      </div>

      {/* order items */}
      <br />
      <br />
      {detailOrder &&
        detailOrder?.cart.map((item, index) => {
          return (
            <div
              className="w-full flex items-start mb-5 border-[2px]"
              key={index}
            >
              {/* {console.log({ detailOrder })} */}

              <img
                src={`${item.images[0]}`}
                alt=""
                className="h-[130px] w-[130px] object-contain"
              />
              <div className="w-full">
                <Link to={`/products/${item._id}`}>
                  <h5 className="pl-3 text-[20px]">{item.name}</h5>
                </Link>
                <h5 className="pl-3 text-[20px] text-[#00000091]">
                  US${item.discountPrice} x {item.qty}
                </h5>
              </div>

              {detailOrder.status === "Delivered" ? (
                <>
                  <h3 className="mt-[40px] mr-[30px] text-[red]">
                    {detailOrder.status}
                  </h3>
                  <div
                    className={`${styles.button} text-[#fff] mt-[30px]`}
                    onClick={() => setOpen(true) || setSelectedItem(item)}
                  >
                    Write a review
                  </div>
                </>
              ) : (
                <h3 className="mt-[40px] mr-[30px] text-[red]">
                  {detailOrder.status}
                </h3>
              )}
            </div>
          );
        })}

      {/* review popup */}
      {open && (
        <div className="w-full fixed top-0 left-0 h-screen bg-[#0005] z-50 flex items-center justify-center">
          <div className="w-[50%] h-min bg-[#fff] shadow rounded-md p-3">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                onClick={() => setOpen(false)}
                className="cursor-pointer"
              />
            </div>
            <h2 className="text-[30px] font-[500] font-Poppins text-center">
              Give a Review
            </h2>
            <br />
            <div className="w-full flex">
              <img
                src={`${selectedItem?.images[0]}`}
                alt=""
                className="h-[100px] w-[100px] object-contain"
              />
              <div>
                <div className="pl-3 text-[20px]">{selectedItem?.name}</div>
                <h4 className="pl-3 text-[20px]">
                  US${selectedItem?.discountPrice} x {selectedItem?.qty}
                </h4>
              </div>
            </div>

            <br />
            <br />

            {/* ratings */}
            <h5 className="pl-3 text-[20px] font-[500]">
              Give a Rating <span className="text-red-500">*</span>
            </h5>
            <div className="flex w-full ml-2 pt-1">
              {[1, 2, 3, 4, 5].map((i) =>
                rating >= i ? (
                  <AiFillStar
                    key={i}
                    className="mr-1 cursor-pointer"
                    color="rgb(246,186,0)"
                    size={25}
                    onClick={() => setRating(i)}
                  />
                ) : (
                  <AiOutlineStar
                    key={i}
                    className="mr-1 cursor-pointer"
                    color="rgb(246,186,0)"
                    size={25}
                    onClick={() => setRating(i)}
                  />
                )
              )}
            </div>
            <br />
            <div className="w-full ml-3">
              <label className="block text-[20px] font-[500]">
                Write a comment
                <span className="ml-1 font-[400] text-[16px] text-[#00000052]">
                  (optional)
                </span>
              </label>
              <textarea
                name="comment"
                id=""
                cols="20"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="How was your product? write your expresion about it!"
                className="mt-2 w-[95%] border p-2 outline-none"
              ></textarea>
            </div>
            <div
              className={`${styles.button} text-white text-[20px] ml-3`}
              onClick={reviewHandler}
            >
              Send
            </div>
          </div>
        </div>
      )}

      <div className="border-t w-full text-right">
        <h5 className="pt-3 text-[18px]">
          Total Price: <strong>US${detailOrder?.totalPrice}</strong>
        </h5>
      </div>
      <br />
      <br />
      <div className="w-full 800px:flex items-center">
        <div className="w-full 800px:w-[60%]">
          <h4 className="pt-3 text-[20px] font-[600]">Shipping Address:</h4>
          <h4 className="pt-3 text-[20px]">
            {detailOrder?.shippingAddress.address1}-
            <span>
              <h4 className=" text-[20px]">
                {detailOrder?.shippingAddress.country}-
                {detailOrder?.shippingAddress.city}
              </h4>
            </span>
          </h4>
          <h4 className="text-[20px] font-[600]">Phone Number:</h4>
          <span>{detailOrder?.user?.phoneNumber}</span>
        </div>
        <div className="w-full 800px:w-[40%]">
          <h4 className="pt-3 text-[20px]">Payment Info:</h4>
          <h4>
            Status:{" "}
            {detailOrder?.paymentInfo?.status
              ? detailOrder?.paymentInfo?.status
              : "Not Paid"}
          </h4>
          <br />
          {detailOrder?.status === "Delivered" && (
            <div
              className={`${styles.button} text-white`}
              onClick={refundHandler}
            >
              Give a Refund
            </div>
          )}
        </div>
      </div>
      <br />
      <Link to="/">
        <div className={`${styles.button} text-white`}>Send Message</div>
      </Link>
      <br />
      <br />
    </div>
  );
};

export default OrderDetail;
