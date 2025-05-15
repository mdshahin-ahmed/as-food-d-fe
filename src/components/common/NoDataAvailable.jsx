import image from "@/assets/no-data.jpg";
import { Image } from "semantic-ui-react";

const NoDataAvailable = () => {
  return (
    <div className="w-100 noDataWrap">
      <Image src={image} alt="No Data Available" />
    </div>
  );
};

export default NoDataAvailable;
