import avatar from "@/assets/user-avatar.png";
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Image, Menu, MenuItem, Popup } from "semantic-ui-react";
import { useAuth } from "../../../context/app/useAuth";
import { useDisclosure } from "../../../hooks/pure/useDisclosure";
import { logout } from "../../../utils/auth/auth-methods";
import DeleteModal from "../DeleteModal";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

const Header = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const { isOpen, onClose, setCustom } = useDisclosure();
  const handleDelete = () => {
    logout();
    setUser("");
    onClose();
    navigate("/signin");
  };
  return (
    <>
      <DeleteModal
        modalHeader="Logout"
        modalContent="Are you sure you want to logout?"
        onClose={onClose}
        confirmText="Logout"
        open={isOpen}
        onConfirm={() => handleDelete(isOpen)}
      />
      <Menu className="headerWrap d-flex jce">
        <span className="headerBalance">
          <FaBangladeshiTakaSign />
        </span>
        <span className="headerBalanceCount">
          {user?.balance.toFixed(2) || 0}
        </span>
        <MenuItem>
          <Popup
            content={user?.name}
            position="bottom center"
            trigger={
              <Image
                className="b-radius-50 headerAvatar c-pointer"
                src={user?.imageUrl || avatar}
              />
            }
          />
        </MenuItem>
        <MenuItem>
          <Popup
            content="Logout"
            position="bottom center"
            trigger={
              <FaSignInAlt
                className="c-pointer"
                onClick={() => setCustom(true)}
              />
            }
          />
        </MenuItem>
      </Menu>
    </>
  );
};

export default Header;
