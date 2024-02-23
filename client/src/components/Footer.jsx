import React from "react";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer = () => {
  const date = new Date();
  return (
    <div className="footer-container">
      <div className="footer">
        <div className="footer-left">
          <div className="logo">
            <h2>Moringa Pair</h2>
            <p>&copy; All Rights Reserved {date.getFullYear()}</p>
          </div>
          <ul className="offers">
            <li>
              <a href="#c">Courses</a>
            </li>
            <li>
              <a href="#c">Careers</a>
            </li>
            <li>
              <a href="#c">FAQs</a>
            </li>
            <li>
              <a href="#c">Contact Us</a>
            </li>
            <li>
              <a href="#c">Privacy Policy</a>
            </li>
            <li>
              <a href="#c">Events</a>
            </li>
          </ul>
        </div>

        <div className="footer-center">
          <h2 className="location">
            Ngong Lane, Ngong Lane Plaza, 1st Floor, Nairobi Kenya
          </h2>
          <ul className="contacts">
            <li>
              <a href="#d">
                <LocalPhoneIcon sx={{ color: "#f77f00" }} />
                <span>0205001234 (General Enquiries)</span>
              </a>
            </li>
            <li>
              <a href="#d">
                <LocalPhoneIcon sx={{ color: "#f77f00" }} />
                <span>0207645678 (Admissions)</span>
              </a>
            </li>
            <li>
              <a href="#d">
                <LocalPhoneIcon sx={{ color: "#f77f00" }} />
                <span>0738369876 (Corporate Inquiries)</span>
              </a>
            </li>
            <li>
              <a href="#d">
                <EmailIcon sx={{ color: "#f77f00" }} />
                <span>contact@moringapair.com</span>
              </a>
            </li>
            <li>
              <a href="#d">
                <EmailIcon sx={{ color: "#f77f00" }} />
                <span>admissions@moringapair.com</span>
              </a>
            </li>
            <li>
              <a href="#d">
                <EmailIcon sx={{ color: "#f77f00" }} />
                <span>corporate@moringapair.com</span>
              </a>
            </li>
            <li>
              <a href="#d">
                <EmailIcon sx={{ color: "#f77f00" }} />
                <span>P.O Box 15243 - 00100, Nairobi</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-right">
          <a href="#q">
            <FacebookIcon sx={{ fontSize: "2rem" }} />
          </a>
          <a href="#q">
            <LinkedInIcon sx={{ fontSize: "2rem" }} />
          </a>
          <a href="#q">
            <XIcon sx={{ fontSize: "2rem" }} />
          </a>
          <a href="#q">
            <YouTubeIcon sx={{ fontSize: "2rem" }} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
