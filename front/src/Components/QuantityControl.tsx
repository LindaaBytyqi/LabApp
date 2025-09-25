import React, { useState, useEffect } from "react";
import { Button, ButtonGroup } from "react-bootstrap";

interface QuantityProps {
  initialQuantity?: number;
  maxQuantity?: number;
  onChange?: (val: number) => void;
}

const QuantityControl: React.FC<QuantityProps> = ({ 
  initialQuantity = 1, 
  maxQuantity = 15,
  onChange
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    onChange?.(quantity); // çdo ndryshim i brendshëm njofton prindin
  }, [quantity, onChange]);

  const increment = () => {
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
      <span style={{ marginBottom: "8px", color: "gray" }}>
        Quantity: {maxQuantity}
      </span>

      <ButtonGroup>
        {/* Butoni - */}
        <Button
          onClick={decrement}
          style={{
            width: "35px",
            height: "35px",
            borderRadius: "10px",
            fontSize: "12px",
            fontWeight: "bold",
            backgroundColor: "rgba(128, 132, 77, 0.3)", 
            color: "white",
            boxShadow: "0 4px 6px rgba(43, 41, 41, 0.3)"    
          }}
        >
          -
        </Button>

        {/* Numri */}
        <div
          style={{
            width: "45px",   // ≈1.5cm
            height: "35px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
            fontWeight: "bold",
            border: "1px solid lightgray",
            borderRadius: "12px",
            margin: "0 8px"
          }}
        >
          {quantity}
        </div>

        {/* Butoni + */}
        <Button
          onClick={increment}
          style={{
            width: "35px",
            height: "35px",
            borderRadius: "10px",
            fontSize: "12px",
            fontWeight: "bold",
            background: "rgba(128, 132, 77, 0.3)",
            color:"white",
             boxShadow: "0 4px 6px rgba(43, 41, 41, 0.3)"
             //background: "linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet)",

          }}
        >
          +
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default QuantityControl;
