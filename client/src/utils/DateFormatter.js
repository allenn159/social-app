import React from "react";
import Moment from "react-moment";

const DateFormatter = ({ date }) => {
  return (
    <Moment format="MMM D, YYYY HH:mm" withTitle>
      {date}
    </Moment>
  );
};

export default DateFormatter;
