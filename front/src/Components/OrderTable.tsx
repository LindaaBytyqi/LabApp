import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { CreateOrder } from "../Interfaces/CreateOrder";
import { CreateOrderItem } from "../Interfaces/CreateOrderItem";
import { OrderService } from "../Services/OrderService";
import { Header, Segment } from "semantic-ui-react";
import { CartItemModel } from "../Interfaces/CartItemModel";
import { PaymentMethod } from "../Interfaces/PaymentMethod";
import Navbar from "./Navbar";


export default function OrderTable() {
  const navigate = useNavigate();
  const location = useLocation();

  // Merr cartItems nga location.state (nga CartTable)
  const cartItems: CreateOrderItem[] = location.state?.cartItems || [];

  const [values, setValues] = useState<CreateOrder>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    items: cartItems,
    paymentMethod: PaymentMethod.CashOnDelivery,
  });


  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;


  //   setValues({ ...values, [name]: value });
  // };

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value } = e.target;

  if (name === "paymentMethod") {
    setValues({ ...values, paymentMethod: Number(value) as PaymentMethod });
  } else {
    setValues({ ...values, [name]: value });
  }
};


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await OrderService.CreateOrder(values);
      console.log("Order created:", result);
      // navigate(`/order/${result.id}`); // shkon në faqen e order details
      
       navigate(`/order-success/${result.orderId}`);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

    return(
      <>   
         <Navbar searchTerm={""} setSearchTerm={() => {}} />  
           
    <Segment style={{ maxWidth: "600px", margin: "30px auto", padding: "20px", marginTop: "120px"}}>
  <Header as="h2" dividing>
    Checkout
  </Header>

  {/* Krijojmë hapësirë të zbrazët midis Checkout dhe Personal Information */}
  <div style={{ height: "5px" }}></div>

  <Header as="h4">Personal Information</Header>

  <form className="ui form" onSubmit={handleSubmit}>
    {/* input fields */}
    <div className="field">
      <label>Full Name</label>
      <input type="text" name="fullName" value={values.fullName} onChange={handleChange} required />
    </div>

    <div className="field">
      <label>Email</label>
      <input type="email" name="email" value={values.email} onChange={handleChange} required />
    </div>

    {/* Phone dhe Address në të njëjtën linjë */}
    <div className="two fields">
      <div className="field">
        <label>Phone</label>
        <input type="text" name="phone" value={values.phone} onChange={handleChange} required />
      </div>
      <div className="field">
        <label>Address</label>
        <input type="text" name="address" value={values.address} onChange={handleChange} required />
      </div>
    </div>

    {/* City dhe Zip Code në një linjë tjetër */}
    <div className="two fields">
      <div className="field">
        <label>City</label>
        <input type="text" name="city" value={values.city} onChange={handleChange} required />
      </div>
      <div className="field">
        <label>Zip Code</label>
        <input type="text" name="zipCode" value={values.zipCode} onChange={handleChange} required />
      </div>
    </div>

  <div className="field">
  <label>Payment Method</label>
  <select
    name="paymentMethod"
    value={values.paymentMethod}
    onChange={handleChange}
    required
  >
    <option value={PaymentMethod.CashOnDelivery}>Cash on Delivery</option>
    <option value={PaymentMethod.Online}>Online Payment</option>
  </select>
</div>

{/* Shfaq fushat e kartës vetëm kur zgjedhet Online */}
{values.paymentMethod === PaymentMethod.Online && (
  <>
    <div className="field">
      <label>Card Number</label>
      <input
        type="text"
        name="cardNumber"
        placeholder="1234 5678 9012 3456"
        maxLength={16}       // lejon vetëm 16 karaktere
        pattern="\d{16}" 
        required
      />
    </div>

    <div className="two fields">
      <div className="field">
        <label>Expiry Date</label>
        <input
          type="text"
          name="expiryDate"
          placeholder="MM/YY"
          required
        />
      </div>
      <div className="field">
        <label>CVV</label>
        <input
          type="password"
          name="cvv"
          placeholder="123"
          required
        />
      </div>
    </div>
  </>
)}

    <button type="submit" className="ui green button">
      Place Order
    </button>
  </form>
</Segment>

</>
  );
}
  
  