import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import { useState } from "react";

const AsDateRangePicker = () => {
  // Get today's date
  const today = new Date();

  // Calculate the date 30 days ago
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(today.getDate() - 30);

  // Initialize the state with the last 30 days as the default value
  const [value, onChange] = useState([thirtyDaysAgo, today]);
  console.log(value);
  return <DateRangePicker onChange={onChange} value={value} />;
};

export default AsDateRangePicker;
