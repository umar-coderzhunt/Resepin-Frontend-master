import React from "react";
import PropTypes from "prop-types";
const Input = ({...props}) => {
  return (
    <div>
      <input
        {...props}
        id="exampleFormControlInput1"
      />
    </div>
  );
};
Input.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  name: "name",
  type: "text"
};
export default Input;
