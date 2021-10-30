import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import rajnishImg from "../images/rajnish.jpg";
import aboutImage from "../images/aboutImage.jpg";
const About = () => {
  const history = useHistory();

  //using hooks to store the user data and initially put it as empty object
  const [userData, setuserData] = useState({});

  const authenticate = async () => {
    try {
      const response = await fetch("/display-about-data", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();

      // console.log(response);
      // console.log(data);

      // check the status code sent from the backend
      if (response.status !== 200 || !data) {
        // return window.alert("Sorry! Something is missing");

        // in case of any error redirect user to the login page
        history.push("/login");
      } else {
        //console.log("user data exist in the data base and storing it in the state hooks");
        setuserData(data);
      }
    } catch (err) {
      // console.log(err);
      // in case of any error redirect user to the login page
      history.push("/login");
    }
  };

  useEffect(() => {
    // window.alert("hello from the about page");
    // first authenticate the user
    authenticate();
  }, []);

  return (
    <>
      <div className="main-content">
        <main>
          <div className="cards">
            <div className="card-single">
              <div>
                <h1>7/10</h1>
                <span>Ranking</span>
              </div>
              <div>
                <span className="fas fa-star"></span>
              </div>
            </div>
            <div className="card-single">
              <div>
                <h1>12</h1>
                <span>Projects</span>
              </div>
              <div>
                <span className="fas fa-clipboard-list"></span>
              </div>
            </div>
            <div className="card-single">
              <div>
                <h1>15</h1>
                <span>Orders</span>
              </div>
              <div>
                <span className="fas fa-shopping-cart"></span>
              </div>
            </div>
            <div className="card-single">
              <div>
                <h1>{userData.name}</h1>
                <span>{userData.email}</span>
                <br />
                <span>{userData.work}</span>
              </div>
              <div>
                <span>
                  <img
                    src={
                      userData.name === "Rajnish Patel"
                        ? rajnishImg
                        : aboutImage
                    }
                    alt={userData.name}
                  />
                </span>
              </div>
            </div>
          </div>

          <div className="recent-grid">
            <div className="projects">
              <div className="card">
                <div className="card-header">
                  <h2>Recent Projects</h2>
                  <button>
                    Edit all <span className="fas fa-arrow-right"></span>{" "}
                  </button>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table width="100%">
                      <thead>
                        <tr>
                          <td>Project Title</td>
                          <td>Department</td>
                          <td>Status</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Website</td>
                          <td>Frontend</td>
                          <td>
                            <span className="status purple"></span>
                            Review
                          </td>
                        </tr>

                        <tr>
                          <td>Website</td>
                          <td>Frontend</td>
                          <td>
                            <span className="status pink"></span>
                            In Progress
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="customers">
              <div className="card">
                <div className="card-header">
                  <h2>Timeline</h2>
                  <button>
                    Edit all <span className="fas fa-arrow-right"></span>{" "}
                  </button>
                </div>
                <div className="card-body">
                  <div className="customer">
                    <div className="info">
                      <div>
                        <h4>Experience</h4>
                        <small>expert</small>
                      </div>
                    </div>
                    <div className="contact">
                      <NavLink to="#">
                        <span className="fas fa-edit"></span>
                      </NavLink>
                      <NavLink to="#">
                        <span className="fas fa-trash"></span>
                      </NavLink>
                      <NavLink to="#">
                        <span className="fas"></span>
                      </NavLink>
                    </div>
                  </div>

                  <div className="customer">
                    <div className="info">
                      <div>
                        <h4>Hourly Rate</h4>
                        <small>$50/hr</small>
                      </div>
                    </div>
                    <div className="contact">
                      <NavLink to="#">
                        <span className="fas fa-edit"></span>
                      </NavLink>
                      <NavLink to="#">
                        <span className="fas fa-trash"></span>
                      </NavLink>
                      <NavLink to="#">
                        <span className="fas"></span>
                      </NavLink>
                    </div>
                  </div>

                  <div className="customer">
                    <div className="info">
                      <div>
                        <h4>Communication</h4>
                        <small>Expert</small>
                      </div>
                    </div>
                    <div className="contact">
                      <NavLink to="#">
                        <span className="fas fa-edit"></span>
                      </NavLink>
                      <NavLink to="#">
                        <span className="fas fa-trash"></span>
                      </NavLink>
                      <NavLink to="#">
                        <span className="fas"></span>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default About;
