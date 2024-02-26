import React from "react";
import "../styles.css";
import studentsImage from "../assets/studentsImage.jpg";
import Footer from "../components/Footer";
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* banner section */}
      <div className="welcome-container">
        <div className="welcome-message">
          <h2 className="typed animate__animated animate__tada animate__infinite">
            Welcome to Moringa Pair!
          </h2>
          <p>
            Fed up with manually pairing students and tracking pairs?<br></br>
            Say farewell to the hassle with MoringaPair the game-changer for
            effortless student pairing!
          </p>
          <div className="welcome-btns">
            <button
              // onClick={() => {
              //   navigate("#benefits-features");
              // }}
              className="learn-more"
            >
              <a href="#benefits-features">Learn More</a>
            </button>
            <button
              className="signup"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
      {/* end of banner section */}

      {/* benefits-features section */}
      <div id="benefits-features" className="benefits-features">
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
      {/* end of benefits-features section */}

      {/* advanced-features section */}
      <div className="advanced-features">
        <div className="info">
          <h3>Streamline Pairing Process with Advanced Features</h3>
          <p>
            Our system eliminates the manual effort of pairing students and
            ensures no duplications. With data visualizations and historical
            tracking, you can esily manage and analyze student pairs.
          </p>
        </div>
        <div className="advanced-feature-cards">
          <div className="advanced-feature-card">
            <i class="fa-solid fa-cube"></i>
            <h6>No Duplication of Pairs</h6>
            <p>Our system randomly pairs students without any duplications.</p>
          </div>

          <div className="advanced-feature-card">
            <i class="fa-solid fa-cube"></i>
            <h6>Data Visualization and Filters</h6>
            <p>
              Visualize and filter student pairs over different weeks for easy
              analysis.
            </p>
          </div>

          <div className="advanced-feature-card">
            <i class="fa-solid fa-cube"></i>
            <h6>Historical Tracking of Pairs</h6>
            <p>Technical mentors can view history of student pairings.</p>
          </div>
        </div>
      </div>
      {/* end of advanced-features section */}

      {/* footer section */}
      <Footer />
      {/* end of footer section */}
    </>
  );
};

export default Home;
