import React, { useState } from "react";
import { Input, Icon, Menu, Dropdown } from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";

interface NavbarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function Navbar({ searchTerm, setSearchTerm }: NavbarProps) {
  const [cartCount] = useState(3); // mund ta bësh dynamic në varësi të cart
  const navigate=useNavigate();

  const trigger = (
    <span>
      <Icon name="user circle" size="large" />
    </span>
  );

  const userOptions = [
    { key: "home", text: "Home", to: "/" },
    { key: "cart", text: "Cart Page", to: "/cart" },
    { key: "checkout", text: "Checkout", to: "/checkout" },
     { key: "register", text: "Register", to: "/register" },
    { key: "logout", text: "Logout", to: "/logout" },
  ];

  return (
    <Menu
      secondary
      style={{
        padding: "10px 20px",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: "white",
      }}
    >
      {/* Hamburger / 3 lines menu */}
      <Menu.Item>
        <Dropdown trigger={<Icon name="bars" size="large" />} pointing="top left" icon={null}>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/aboutus">
              <Icon name="info circle" /> About Us
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/">
              <Icon name="home" /> Home
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/contact">
              <Icon name="phone" /> Contact
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>

      {/* Search */}
      <Menu.Item style={{ flex: 1 }}>
        <Input
          placeholder="Search by book title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: "8px", width: "270px" }}
        />
      </Menu.Item>

      {/* Right icons */}
      <Menu.Menu position="right">
        {/* User dropdown */}
        <Menu.Item>
          <Dropdown trigger={trigger} pointing="top right" icon={null}>
            <Dropdown.Menu>
              {userOptions.map((opt) => (
                <Dropdown.Item key={opt.key} as={Link} to={opt.to} text={opt.text} />
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>

        {/* Shopping cart */}
        <Menu.Item style={{ position: "relative" }}
        onClick={()=>navigate("/cart")}>
          <Icon name="shopping cart" size="large" />
          
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}
