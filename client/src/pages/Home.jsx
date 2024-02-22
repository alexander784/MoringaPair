import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles.css";
import studentsImage from "../assets/studentsImage.jpg"

const Home = () => {
  return (
    // Add Classname for styling
    <>
      <Container className="welcome-container">
        <Row>
          <Col>
            <h2 className="animate__animated animate__bounce animate__infinite">
              Welcome to Moringa Pair!
            </h2>
            <p>
              Fed up with manually pairing students and tracking pairs?<br></br>
              Say farewell to the hassle with MoringaPair the game-changer for
              effortless student pairing!
            </p>
          </Col>
          <Col>
            <img
              src="https://plus.unsplash.com/premium_photo-1661277695409-0cc85f3b8a00?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Welcome"
              className="img-fluid"
            />
          </Col>
        </Row>
      </Container>

      <div className="benefits-features">
        <div className="info">
          <h3>Revolutionalize Student Pairing with Randomization</h3>
          <p>
            Introducing our innovative system that randomly pairs students,
            tracks their pairs weekly , and provides data visualization and
            filters for easy analysis
          </p>
          <div className="ben-feat">
            <div className="ben">
              <h5>Benefits: </h5>
              <p>
                Efficient and fair student pairing, eliminating manual labor and
                ensuring equal opportunities
              </p>
            </div>
            <div className="feat">
              <h5>Features: </h5>
              <p>
                Random student pairing, weekly tracking, data visualization and
                histroy of pairings
              </p>
            </div>
          </div>
        </div>

        <div className="image">
          <img src={studentsImage} alt="" />
        </div>
      </div>
    </>
  );
};

export default Home;
