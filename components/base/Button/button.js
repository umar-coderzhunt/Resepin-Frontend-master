import React from 'react'

const Button = ({className,title,type,...props}) => {
  return (
    <button className={className} type={type} {...props}>
      {title}
    </button>
  );
}
Button.defaultProps = {
  type: "submit",
};
export default Button