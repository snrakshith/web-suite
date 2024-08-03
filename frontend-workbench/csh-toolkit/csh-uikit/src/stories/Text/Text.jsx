import React from "react";
import PropTypes from "prop-types";

export const Text = ({ size, ...props }) => {
  return <h1>Text</h1>;
};

Text.propTypes = {
  // size: PropTypes.oneOf(["small", "medium", "large", "xL"]),
};
