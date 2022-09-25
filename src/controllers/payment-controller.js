import axios from "axios";

export const orderCreate = async (req, res) => {
    try {
      const basket = req.body;
      const total = ()=>{
        let priceBasket = basket.reduce((valueOne, valueTwo)=>(valueOne + valueTwo.price),0);
        let priceOfferBasket = basket.filter((item)=>(item.offer)).reduce((oneNumber, twoNumber)=>(oneNumber + twoNumber.price),0)
        let discount = priceOfferBasket - basket.filter((item)=>(item.offer)).reduce((oneNumber, twoNumber)=>(oneNumber + twoNumber.price_offer),0);

        return priceBasket - discount;
      }

      const items = basket.map((x)=>({
        "name": `${x.title}, ${x._id}`,
        "quantity": "1",
        "unit_amount": { 
          "currency_code": "USD",
          "value": x.offer ? x.price_offer.toString() : x.price.toString()
        },
      }))

      console.log(total().toString())
      console.log(items)

      const order = {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: total().toString(),
              "breakdown":{
                "item_total":{
                   "currency_code":"USD",
                   "value": total().toString()
                }
              }
            },
            items: items
          },
        ],
        application_context: {
          brand_name: "ecommerce-example.com",
          landing_page: "NO_PREFERENCE",
          user_action: "PAY_NOW",
          return_url: `${process.env.HOST}/payment/payment-order`,
          cancel_url: `${process.env.HOST}/payment/cancel-order`,
        },
      };
  
  
      // format the body
      const params = new URLSearchParams();
      params.append("grant_type", "client_credentials");
  
      // Generate an access token
      const {
        data: { access_token },
      } = await axios.post(
        "https://api-m.sandbox.paypal.com/v1/oauth2/token",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          auth: {
            username: process.env.PAYPAL_CLIENT,
            password: process.env.PAYPAL_SECRET,
          },
        }
      );
  
      console.log(access_token);
  
      // make a request
      const response = await axios.post(
        `${process.env.PAYPAL_API}/v2/checkout/orders`,
        order,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
  
      console.log(response.data);
  
      return res.json(response.data);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json("Something goes wrong");
    }
  };

export const orderReady = async (req, res) => {
    const { token } = req.query;
  
    try {
      const response = await axios.post(
        `${process.env.PAYPAL_API}/v2/checkout/orders/${token}/capture`,
        {},
        {
          auth: {
            username: process.env.PAYPAL_CLIENT,
            password: process.env.PAYPAL_SECRET,
          },
        }
      );
  
      console.log(response.data);
  
      res.redirect("/");

    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Internal Server error" });
    }
  };

export const orderCancel = (req, res) => {
    res.redirect("/");
}