import logo from "@/assets/logo.png";
import { FaCartArrowDown, FaUserAlt, FaUsers } from "react-icons/fa";
import { GiHotMeal } from "react-icons/gi";
import { IoHomeSharp } from "react-icons/io5";
import { SiGoogleanalytics } from "react-icons/si";
import { NavLink, useLocation } from "react-router-dom";
import { Image, List, ListItem, Popup } from "semantic-ui-react";
import { useAuth } from "../../../context/app/useAuth";
import { FcApproval } from "react-icons/fc";
import { MdCreateNewFolder, MdOutlinePendingActions } from "react-icons/md";
import { LiaMoneyBillWaveAltSolid } from "react-icons/lia";

const routeList = [
  {
    content: "Home",
    pathname: "home",
    src: IoHomeSharp,
    permissions: ["user", "admin", "employee"],
  },
  {
    content: "Manage Bill",
    pathname: "manage-bill",
    src: MdCreateNewFolder,
    permissions: ["admin"],
  },
  {
    content: "Pending Bills",
    pathname: "pending-bills",
    src: MdOutlinePendingActions,
    permissions: ["user", "admin", "employee"],
  },
  {
    content: "Paid Bills",
    pathname: "paid-bills",
    src: LiaMoneyBillWaveAltSolid,
    permissions: ["admin", "employee"],
  },
  {
    content: "Approved Bills",
    pathname: "approved-bills",
    src: FcApproval,
    permissions: ["admin"],
  },
  {
    content: "Users",
    pathname: "users",
    src: FaUsers,
    permissions: ["admin"],
  },

  // {
  //   content: "Expense",
  //   pathname: "expense",
  //   src: GiExpense,
  //   permissions: ["admin"],
  // },
  {
    content: "Analytics",
    pathname: "analytics",
    src: SiGoogleanalytics,
    permissions: ["admin"],
  },

  {
    content: "Profile",
    pathname: "profile",
    src: FaUserAlt,
    permissions: ["user", "admin", "employee"],
  },
];

const Navbar = () => {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <div className="navBarWrap">
      <div className="navLogo">
        <Image className="mt-1" src={logo} />
      </div>
      <div>
        <List link className="navList">
          {routeList.map((route) => {
            if (route?.permissions.includes(user?.role)) {
              return (
                <Popup
                  key={route?.pathname}
                  size="small"
                  position="right center"
                  content={route.content}
                  trigger={
                    <ListItem
                      className={
                        location?.pathname?.includes(route.pathname)
                          ? "navListItem active "
                          : "navListItem"
                      }
                      // className={"navListItem"}
                      as={NavLink}
                      to={`/${route.pathname}`}
                      id={route.pathname}
                    >
                      {route.src}
                    </ListItem>
                  }
                />
              );
            }
          })}
        </List>
      </div>
    </div>
  );
};

export default Navbar;
