// import React from "react";
// import { Container, Header, Card, Image } from "semantic-ui-react";
// import Navbar from "./Navbar";
// import Footer from "./Footer";

// export default function AboutUs() {
//   return (
//     <>
//       <Navbar searchTerm={""} setSearchTerm={function (term: string): void {
//               throw new Error("Function not implemented.");
//           } } />
//       <Container style={{ marginTop: "150px", marginBottom: "50px" }}>
//         <Header as="h1" textAlign="center">About Us</Header>
//         <p style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto" }}>
//           Our story began with an elderly man who loved reading more than anything.  
//           He spent his entire life surrounded by books, and his passion inspired his descendants.  
//           Today, his family continues this legacy through Family ABCBookshop – a place where stories  
//           are shared, knowledge is passed on, and love for books lives forever.
//         </p>

//         <Header as="h2" textAlign="center" style={{ marginTop: "50px" }}>
//           Meet Our Family
//         </Header>
//         <Card.Group centered>
//           <Card>
//             <Image src="https://via.placeholder.com/300x200" wrapped ui={false} />
//             <Card.Content>
//               <Card.Header>John Smith</Card.Header>
//               <Card.Description>
//                 The grandfather who started it all with his passion for books.
//               </Card.Description>
//             </Card.Content>
//           </Card>

//           <Card>
//             <Image src="https://via.placeholder.com/300x200" wrapped ui={false} />
//             <Card.Content>
//               <Card.Header>Emily Smith</Card.Header>
//               <Card.Description>
//                 His daughter, who turned her father’s dream into a family bookshop.
//               </Card.Description>
//             </Card.Content>
//           </Card>

//           <Card>
//             <Image src="https://via.placeholder.com/300x200" wrapped ui={false} />
//             <Card.Content>
//               <Card.Header>Michael Smith</Card.Header>
//               <Card.Description>
//                 The grandson who brings modern ideas and technology into the shop.
//               </Card.Description>
//             </Card.Content>
//           </Card>
//         </Card.Group>
//       </Container>
//       <Footer />
//     </>
//   );
// }
import React from "react";
import { Container, Header, Card, Image, Segment } from "semantic-ui-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function AboutUs() {
  return (
    <>
      <Navbar
        searchTerm={""}
        setSearchTerm={function (term: string): void {
          throw new Error("Function not implemented.");
        }}
      />

      {/* Container kryesor me stil , margin: "0 auto" */ }
      <div style={{ backgroundColor: "#f9f9f9", minHeight: "100vh", paddingTop: "100px" }}>
        <Container text style={{ padding: "50px 20px" }}>
          <Segment raised style={{ padding: "60px", borderRadius: "15px", boxShadow: "0 8px 20px rgba(0,0,0,0.1)",maxWidth: "1700px"}}>
            <Header as="h1" textAlign="center" style={{ marginBottom: "30px" }}>
              About Us
            </Header>

            <p style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto", fontSize: "1.1rem", lineHeight: "1.6" }}>
              Our story began with an elderly man who loved reading more than anything.  
              He spent his entire life surrounded by books, and his passion inspired his descendants.  
              Today, his family continues this legacy through Family ABCBookshop – a place where stories  
              are shared, knowledge is passed on, and love for books lives forever.
            </p>

            <Header as="h2" textAlign="center" style={{ marginTop: "50px", marginBottom: "30px" }}>
              Meet Our Family
            </Header>

            {/* Kartat e familjes me qendrim të qendruar */}
            <Card.Group centered stackable itemsPerRow={3}>
              <Card raised>
                <Image src="https://via.placeholder.com/300x200" wrapped ui={false} />
                <Card.Content>
                  <Card.Header>John Smith</Card.Header>
                  <Card.Description>
                    The grandfather who started it all with his passion for books.
                  </Card.Description>
                </Card.Content>
              </Card>

              <Card raised>
                <Image src="https://via.placeholder.com/300x200" wrapped ui={false} />
                <Card.Content>
                  <Card.Header>Emily Smith</Card.Header>
                  <Card.Description>
                    His daughter, who turned her father’s dream into a family bookshop.
                  </Card.Description>
                </Card.Content>
              </Card>

              <Card raised>
                <Image src="https://via.placeholder.com/300x200" wrapped ui={false} />
                <Card.Content>
                  <Card.Header>Michael Smith</Card.Header>
                  <Card.Description>
                    The grandson who brings modern ideas and technology into the shop.
                  </Card.Description>
                </Card.Content>
              </Card>
            </Card.Group>
          </Segment>
        </Container>
      </div>

      <Footer />
    </>
  );
}
