import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../../server";
const ShopActivationPage = () => {
  let { activation_token } = useParams();
  const [error, setError] = useState(false);
  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          axios.post(`${server}/shop/activate`, { activation_token });
        } catch (error) {
          console.log(error.message);
          setError(true);
        }
      };
      activationEmail();
    }
  }, [activation_token]);
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <p>Your token is expired</p>
      ) : (
        <p>Your account has been created success</p>
      )}
    </div>
  );
};

export default ShopActivationPage;
