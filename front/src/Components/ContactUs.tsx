import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Navbar from "./Navbar";

export default function ContactUs() {
  return (
  <>
    <Navbar searchTerm={""} setSearchTerm={function (term: string): void {
                  throw new Error("Function not implemented.");
              } } />
    <Container style={{ marginTop: "80px", marginBottom: "50px" }}>
      <Row>
        {/* Informacioni dhe Forma */}
        <Col md={6}>
          <h2>Contact Us</h2>

          <div style={{ marginBottom: "20px" }}>
            <p>
              <strong>📍 Address:</strong> Union Center - Mother Teresa Square,
              <br />
              10000 Prishtina, Kosovo
            </p>
            <p>
              <strong>⏰ Working Time:</strong> 10:00 AM - 07:30 PM <br />
              Monday - Friday
            </p>
            <p>
              <strong>📧 Contact:</strong> abcbookstore@gmail.com <br />
              📞 +383 49 123 456
            </p>
          </div>

          <h5>Have a Question?</h5>
          <Form>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Control type="text" placeholder="Full Name" required   style={{ maxWidth: "250px" }}/>
            </Form.Group>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Control type="email" placeholder="Email" required   style={{ maxWidth: "250px" }}/>
            </Form.Group>
            <Form.Group controlId="formPhone" className="mb-3">
              <Form.Control type="text" placeholder="Phone"  style={{ maxWidth: "250px" }} />
            </Form.Group>
            <Form.Group controlId="formMessage" className="mb-3"  style={{ maxWidth: "250px" }}>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Have questions? We have answers!"
              />
            </Form.Group>
           <Button
            type="submit"
             style={{
             padding: "7px 25px",   // më i gjatë dhe më i trashë
             fontSize: "16px",
            backgroundColor: "#6f6965ff", // ngjyrë portokalli
            borderRadius:"20px",
            color: "white",
             }}
            >
          Submit
         </Button>
        </Form>
        </Col>

        {/* Harta */}
        <Col md={6}>
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2977.123456789!2d21.16688!3d42.67272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13549e0c7f82b9cf%3A0xa6c3aef2c53d6ef2!2sUnion%20Center%20Pristina!5e0!3m2!1sen!2s!4v1650000000000"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          />
        </Col>
      </Row>
    </Container>
  </>
);
}