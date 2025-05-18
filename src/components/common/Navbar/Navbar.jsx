import logo from "@/assets/logo.png";
import { BiMoneyWithdraw } from "react-icons/bi";
import {
  FaCartArrowDown,
  FaFileInvoiceDollar,
  FaUserAlt,
  FaUsers,
} from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { GiHotMeal } from "react-icons/gi";
import { IoHomeSharp } from "react-icons/io5";
import { SiGoogleanalytics } from "react-icons/si";
import { TbDevicesCancel } from "react-icons/tb";
import { NavLink, useLocation } from "react-router-dom";
import { Image, List, ListItem, Popup } from "semantic-ui-react";
import { useAuth } from "../../../context/app/useAuth";

const routeList = [
  {
    content: "Home",
    pathname: "home",
    src: IoHomeSharp,
    permissions: ["user", "admin", "manager"],
  },
  {
    content: "Manage Bill",
    pathname: "manage-bill",
    src: GiHotMeal,
    permissions: ["admin"],
  },
  {
    content: "Bills",
    pathname: "pending-bills",
    src: GiHotMeal,
    permissions: ["user", "admin", "manager"],
  },
  {
    content: "Users",
    pathname: "users",
    src: FaUsers,
    permissions: ["admin"],
  },
  {
    content: "Order",
    pathname: "orders",
    src: FaCartArrowDown,
    permissions: ["user", "admin", "manager"],
  },
  {
    content: "All Order",
    pathname: "all-order",
    src: FaCartArrowDown,
    permissions: ["admin", "manager", "user"],
  },
  {
    content: "All Cancel Request",
    pathname: "cancel-req",
    src: TbDevicesCancel,
    permissions: ["admin", "user"],
  },
  {
    content: "Balance",
    pathname: "balances",
    src: FaBangladeshiTakaSign,
    permissions: ["admin", "user"],
  },
  {
    content: "Statements",
    pathname: "statements",
    src: FaFileInvoiceDollar,
    permissions: ["admin", "user"],
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
    content: "Withdraw",
    pathname: "withdraw",
    src: BiMoneyWithdraw,
    permissions: ["user", "admin", "manager"],
  },

  {
    content: "Profile",
    pathname: "profile",
    src: FaUserAlt,
    permissions: ["user", "admin", "manager"],
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
