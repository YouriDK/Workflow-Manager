import React from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";

export const BreadcrumbHeader = ({ path, pageCallback, subTheme }) => {
  let array = [];
  array = path.split("/");

  const goToHome = (page, index) => {
    if (page == "FAQ") {
      pageCallback("home");
    } else if (index > 1 && index < 4 && subTheme) {
      pageCallback("subTheme", subTheme);
    }
  };

  const BreadcrumbItems = array.map((item, index) => (
    <BreadcrumbItem
      key={index}
      active={index === array.length - 1}
      onClick={() => goToHome(item, index)}
      className="breadcrumb-custom-item"
    >
      {item == "Accueil" ? (
        <a href="/" style={{ color: "#FFFFFF" }}>
          {item}
        </a>
      ) : (
        `${item}`
      )}
    </BreadcrumbItem>
  ));
  return (
    <Breadcrumb className={array.length < 3 && "home-header-breadcrumb"}>
      {BreadcrumbItems}
    </Breadcrumb>
  );
};
