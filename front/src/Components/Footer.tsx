import React from "react";
import { Container } from "semantic-ui-react";

export default function Footer() {
  return (
    <div
      style={{
        background: "#f2f2f2", // gri e lehtë
        padding: "20px 0",
        marginTop: "40px",
        textAlign: "center",
      }}
    >
      <Container>
        {/* Emri dhe lokacioni */}
        <h3 style={{ margin: "5px 0", fontWeight: "bold", color: "#333" }}>
          📚 Bookstore
        </h3>
        <p style={{ margin: "5px 0" }}>📍 Prishtina, Kosovo</p>
        <p style={{ margin: "5px 0" }}>📞 +383 49 123 456</p>

        {/* Thenia inspiruese */}
        <p style={{ margin: "15px 0", fontStyle: "italic", color: "#666" }}>
          "A room without books is like a body without a soul."
        </p>

        {/* Copyright */}
        <p style={{ margin: "5px 0", color: "#555", fontSize: "14px" }}>
          © {new Date().getFullYear()} ABCBookstore. All rights reserved.
        </p>
      </Container>
    </div>
  );
}
