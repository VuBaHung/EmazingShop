import axios from "axios";
import { server } from "../.././server";

//Load Login user
export const loadUser = (token) => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });

    const { data } = await axios.get(`${server}/user/get-user`, {
      headers: { Authorization: token },
    });

    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error.response,
    });
  }
};
//Load Login user
// export const loadUserInforAfterLogin = () => async (dispatch) => {
//   try {
//     dispatch({
//       type: "LoadUserInforAfterLoginRequest",
//     });
//     const { data } = await axios.get("/user/get-user");
//     console.log({ data });
//     dispatch({
//       type: "LoadUserInforAfterLoginSuccess",
//       payload: data.user.newUser,
//     });
//   } catch (error) {
//     dispatch({
//       type: "LoadUserInforAfterLoginFail",
//       payload: error.response,
//     });
//   }
// };
//Load Seller
export const loadSeller = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadSellerRequest",
    });
    const { data } = await axios.get("/shop/refresh_token");

    dispatch({
      type: "LoadSellerSuccess",
      payload: [data.seller.newShop, data.accessToken],
    });
  } catch (error) {
    dispatch({
      type: "LoadSellerFail",
      payload: error.response,
    });
  }
};
//Use add Address
export const updateUserAddress =
  (country, city, address1, address2, zipCode, addressType, id) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "updateUserAddressRequest",
      });
      const res = await axios.post(`${server}/user/update-user-address`, {
        country,
        city,
        address1,
        address2,
        zipCode,
        addressType,
        id,
      });
      console.log({ res });
      dispatch({
        type: "updateUserAddressSuccess",
        payload: res.data.user,
      });
    } catch (error) {
      dispatch({
        type: "updateUserAddressFail",
        payload: error.response,
      });
    }
  };

//Use Update Infor
export const updateUserInfor =
  (name, phoneNumber, email, password, images) => async (dispatch) => {
    try {
      dispatch({
        type: "updateUserInfoRequest",
      });
      const res = await axios
        .put(`${server}/user/update-user-info`, {
          name,
          phoneNumber,
          email,
          password,
          images,
        })
        .catch((err) => console.log(err));
      console.log(res);
      dispatch({
        type: "updateUserInfoSuccess",
        payload: res.data.user,
      });
    } catch (error) {
      dispatch({
        type: "updateUserInfoFail",
        payload: error.response,
      });
    }
  };
// export const updateShopInfor =
//   (name, phoneNumber, address, zipcode, email, description, avatar) =>
//   async (dispatch) => {
//     try {
//       dispatch({
//         type: "updateShopInfoRequest",
//       });
//       const res = await axios.put(`${server}/shop/update-shop-infor`, {
//         name,
//         phoneNumber,
//         address,
//         zipcode,
//         email,
//         description,
//         avatar,
//       });
//       console.log(res);
//       dispatch({
//         type: "updateShopInfoSuccess",
//         payload: res.data.shop,
//       });
//     } catch (error) {
//       dispatch({
//         type: "updateShopInfoFail",
//         payload: error.response,
//       });
//     }
//   };
//Delete user address
export const deleteUserAddress =
  (address1, addressType, userId) => async (dispatch) => {
    try {
      dispatch({
        type: "deleteUserAddressRequest",
      });
      const { res } = await axios
        .post(`${server}/user/delete-user-address`, {
          address1,
          addressType,
          userId,
        })
        .then((data) => console.log({ data }))
        .catch((err) => console.log(err));

      dispatch({
        type: "deleteUserAddressSuccess",
        payload: res.data.user,
      });
    } catch (error) {
      dispatch({
        type: "deleteUserAddressFail",
        payload: error.response,
      });
    }
  };
