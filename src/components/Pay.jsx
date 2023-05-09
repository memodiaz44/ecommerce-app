import React, { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import Logo from "../imagerpod/logo.JPG";
import '../stylesheets/Pay.css'

const Key =
  "pk_test_51N3odWEAjO8uMs3f1qBeYu9iZ4g7FFRssNBrsPM8nzEqmqhrmbLA2UkFrRZyumL57BpT1qJliAc5upYExb2t9C8n00VXARfW73";

const Pay = ({ total }) => {
  const [stripetoken, setstripeToken] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const ontoken = (token) => {
    setstripeToken(token);
  };

  useEffect(() => {
    const makerequest = async () => {
      try {
        const res = await axios.post("http://localhost:5000/api/payments", {
          tokenId: stripetoken,
          amount: total,
        });
        if (res.data.success) {
          setPaymentSuccess(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (stripetoken) {
      makerequest();
    }
  }, [stripetoken, total]);

  return (
    <div className="Pay">
      {paymentSuccess ? (
        <div className="success-prompt">
          <p>Payment successful!</p>
        </div>
      ) : (
        <StripeCheckout
          name="payment"
          image={Logo}
          billingAddress
          shippingAddress
          description={"checkout"}
          amount={total * 100}
          token={ontoken}
          stripeKey={Key}
        >
          <button className="payment">Payment</button>
        </StripeCheckout>
      )}
    </div>
  );
};

export default Pay;