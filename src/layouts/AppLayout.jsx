import Header from "../components/common/Header/Header";
import Navbar from "../components/common/Navbar/Navbar";

const AppLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <Navbar />
      <div className="appBody">{children}</div>
    </div>
  );
};

export default AppLayout;
