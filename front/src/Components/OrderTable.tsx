// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import { CreateOrder } from "../Interfaces/CreateOrder";
// import { CreateOrderItem } from "../Interfaces/CreateOrderItem";
// import { OrderService } from "../Services/OrderService";
// import { Header, Segment } from "semantic-ui-react";
// import { CartItemModel } from "../Interfaces/CartItemModel";

// // interface CheckoutFormProps {
// //   cartItems: CreateOrderItem[]; // merr items nga cart
// // }

// export default function OrderTable() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Merr cartItems nga location.state (nga CartTable)
//   const cartItems: CreateOrderItem[] = location.state?.cartItems || [];

//   const [values, setValues] = useState<CreateOrder>({
//     fullName: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     zipCode: "",
//     items: cartItems,
//   });


//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setValues({ ...values, [name]: value });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const result = await OrderService.CreateOrder(values);
//       console.log("Order created:", result);
//       navigate(`/order/${result.id}`); // shkon në faqen e order details
//     } catch (error) {
//       console.error("Error creating order:", error);
//     }
//   };

// //   
//     <Segment style={{ maxWidth: "600px", margin: "30px auto", padding: "20px" }}>
//   <Header as="h2" dividing>
//     Checkout
//   </Header>

//   {/* Krijojmë hapësirë të zbrazët midis Checkout dhe Personal Information */}
//   <div style={{ height: "20px" }}></div>

//   <Header as="h4">Personal Information</Header>

//   <form className="ui form" onSubmit={handleSubmit}>
//     {/* input fields */}
//     <div className="field">
//       <label>Full Name</label>
//       <input type="text" name="fullName" value={values.fullName} onChange={handleChange} required />
//     </div>

//     <div className="field">
//       <label>Email</label>
//       <input type="email" name="email" value={values.email} onChange={handleChange} required />
//     </div>

//     {/* Phone dhe Address në të njëjtën linjë */}
//     <div className="two fields">
//       <div className="field">
//         <label>Phone</label>
//         <input type="text" name="phone" value={values.phone} onChange={handleChange} required />
//       </div>
//       <div className="field">
//         <label>Address</label>
//         <input type="text" name="address" value={values.address} onChange={handleChange} required />
//       </div>
//     </div>

//     {/* City dhe Zip Code në një linjë tjetër */}
//     <div className="two fields">
//       <div className="field">
//         <label>City</label>
//         <input type="text" name="city" value={values.city} onChange={handleChange} required />
//       </div>
//       <div className="field">
//         <label>Zip Code</label>
//         <input type="text" name="zipCode" value={values.zipCode} onChange={handleChange} required />
//       </div>
//     </div>

//     <button type="submit" className="ui green button">
//       Place Order
//     </button>
//   </form>
// </Segment>
//   //);
// }
  
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CreateOrder } from '../Interfaces/CreateOrder';
import { CreateOrderItem } from '../Interfaces/CreateOrderItem';
import { OrderService } from '../Services/OrderService';
import { Segment, Header } from 'semantic-ui-react';

export default function OrderTable() {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems: CreateOrderItem[] = location.state?.cartItems || [];

  const [values, setValues] = React.useState<CreateOrder>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    items: cartItems,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await OrderService.CreateOrder(values);
      navigate(`/order/${result.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Segment style={{ maxWidth: "600px", margin: "30px auto", padding: "20px" }}>
      <Header as="h2" dividing>
        Checkout
      </Header>

      {/* Hapësirë e zbrazët midis Checkout dhe Personal Information */}
      <div style={{ height: "20px" }}></div>

      <Header as="h4">Personal Information</Header>

      <form className="ui form" onSubmit={handleSubmit}>
        <div className="field">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Phone dhe Address në të njëjtën linjë */}
        <div className="two fields">
          <div className="field">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={values.address}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* City dhe Zip Code në një linjë tjetër */}
        <div className="two fields">
          <div className="field">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={values.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field">
            <label>Zip Code</label>
            <input
              type="text"
              name="zipCode"
              value={values.zipCode}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="ui green button">
          Place Order
        </button>
      </form>
    </Segment>
  );
}