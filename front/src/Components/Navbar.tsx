
import React, { useState } from "react";
import { Input, Icon, Menu, Dropdown } from "semantic-ui-react";
import { BookService } from "../Services/BookService";

interface NavbarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}


export default function Navbar({ searchTerm, setSearchTerm }: NavbarProps) {
  const [cartCount] = useState(3);

  const trigger = (
    <span>
      <Icon name="user circle" size="large" />
    </span>
  );

  const options = [
    { key: "dashboard", text: "Dashboard" },
    { key: "orders", text: "Orders" },
    { key: "cart", text: "Cart Page" },
    { key: "checkout", text: "Checkout" },
    { key: "logout", text: "Logout" },
  ];

  return (
    <Menu
      secondary
      style={{
        padding: "10px 20px",
        alignItems: "center",
        position: "fixed", // lart
        top: 0,
        left:0,
        right:0,
        zIndex: 1000,
        background: "white",
      }}
    >
      {/* 3 vijat */}
      <Menu.Item>
        <Icon name="bars" size="large" />
      </Menu.Item>

      {/* Search */}
      <Menu.Item style={{ flex: 1 }}>
        <Input
          placeholder="Search by book title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: "10px", width:"270px"}}
        />
      </Menu.Item>

      {/* Ikonat në anën e djathtë */}
      <Menu.Menu position="right">
        <Menu.Item>
          <Dropdown trigger={trigger} options={options} pointing="top right" icon={null} />
        </Menu.Item>
        <Menu.Item>
          <Icon name="heart outline" size="large" />
        </Menu.Item>
        <Menu.Item style={{ position: "relative" }}>
          <Icon name="shopping cart" size="large" />
          <span
            style={{
              position: "absolute",
              top: "2px",
              right: "2px",
              color: "white",
              background: "gold",
              borderRadius: "50%",
              padding: "3px 6px",
              fontSize: "12px",
            }}
          >
            {cartCount}
          </span>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}








// import React, { useState } from "react";
// import { Input, Icon, Menu, Dropdown } from "semantic-ui-react";

// interface NavbarProps {
//   searchTerm: string;
//   setSearchTerm: (term: string) => void;
// }

// export default function Navbar({ searchTerm, setSearchTerm }: NavbarProps) {
//   const [cartCount] = useState(3);

//   const trigger = (
//     <span>
//       <Icon name="user circle" size="large" />
//     </span>
//   );

//   const options = [
//     { key: "dashboard", text: "Dashboard" },
//     { key: "orders", text: "Orders" },
//     { key: "cart", text: "Cart Page" },
//     { key: "checkout", text: "Checkout" },
//     { key: "logout", text: "Logout" },
//   ];

//   return (
//     <Menu
//       secondary
//       style={{
//         padding: "10px 20px",
//         alignItems: "center",
//         position: "fixed",
//         top: 0,
//         left: 0,
//         right: 0,
//         zIndex: 1000,
//         background: "white",
//       }}
//     >
//       {/* 3 vijat */}
//       <Menu.Item>
//         <Icon name="bars" size="large" />
//       </Menu.Item>

//       {/* Search */}
//       <Menu.Item style={{ flex: 1 }}>
//         <Input
//           placeholder="Search by book title..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </Menu.Item>

//       {/* Ikonat djathtas */}
//       <Menu.Menu position="right">
//         <Menu.Item>
//           <Dropdown trigger={trigger} options={options} pointing="top right" icon={null} />
//         </Menu.Item>
//         <Menu.Item>
//           <Icon name="heart outline" size="large" />
//         </Menu.Item>
//         <Menu.Item style={{ position: "relative" }}>
//           <Icon name="shopping cart" size="large" />
//           <span
//             style={{
//               position: "absolute",
//               top: "2px",
//               right: "2px",
//               color: "white",
//               background: "gold",
//               borderRadius: "50%",
//               padding: "3px 6px",
//               fontSize: "12px",
//             }}
//           >
//             {cartCount}
//           </span>
//         </Menu.Item>
//       </Menu.Menu>
//     </Menu>
//   );
// }
