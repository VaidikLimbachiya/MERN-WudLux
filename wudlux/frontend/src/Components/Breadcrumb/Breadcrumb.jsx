import React from "react";
import { Link, useLocation } from "react-router-dom";
import breadcrumbIcon from "../../assets/home.png"; // Adjust path as needed
import "./Breadcrumb.css";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="breadcrumb-container">
      <Link to="/" className="breadcrumb-home">
        <img src={breadcrumbIcon} alt="Home" className="breadcrumb-icon" />
      </Link>
      {pathnames.length > 0 && <span className="breadcrumb-separator">{">"}</span>}
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <span key={routeTo} className="breadcrumb-text">
            {name.replace(/-/g, " ")}
          </span>
        ) : (
          <React.Fragment key={routeTo}>
            <Link to={routeTo} className="breadcrumb-link">
              {name.replace(/-/g, " ")}
            </Link>
            <span className="breadcrumb-separator">{">"}</span>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
