import React from 'react'
import "bootstrap/dist/css/bootstrap.css";
const Title = ({ title, subTitle, classNametitle, classNameSub }) => {
  return (
    <div>
      <h3 className={classNametitle}>{title}</h3>
      <p className={classNameSub}>{subTitle}</p>
    </div>
  );
};

export default Title