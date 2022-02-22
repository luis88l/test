import React from "react";
import "./style.css";
import logo from "../.././images/logo.svg";
import tracks from "../.././images/traksIcon.svg";
import mentoring from "../.././images/mentoringIcon.svg";
import contribute from "../.././images/contributeIcon.svg";
import social from "../.././images/socialIcon.svg";
import badge from "../.././images/badgeIcon.svg";
import notification from "../.././images/notificationIcon.svg";
import points from "../.././images/pointsIcon.svg";
import erik from "../.././images/erikIcon.svg";
import dots from "../.././images/dotsIcon.svg";

export default class NavBar extends React.Component {
  render() {
    return (
      <header>
        <div className="container">
          <div className="logo">
            <img src={logo} alt="Exercism logo" />
          </div>
          <nav>
            <ul>
              <li>Dashboard</li>
              <li>
                <img src={tracks} alt="tracks icon" />
                <span>Tracks</span>
              </li>
              <li>
                <img src={mentoring} alt="mentoring icon" />
                <span>Mentoring</span>
              </li>
              <li>
                <img src={contribute} alt="contribute icon" />
                <span>Contribute</span>
              </li>
            </ul>
          </nav>
          <div className="user">
            <img src={social} alt="Social media icon" />
            <img src={badge} alt="Badge icon" />
            <img src={notification} alt="Notification icon" />
            <img src={points} alt="Points icon" />
            <img className="erik" src={erik} alt="Erik icon" />
            <img className="dots" src={dots} alt="Three dots" />
          </div>
        </div>
      </header>
    );
  }
}
