import avatar from "@/assets/user-avatar.png";
import { BsTelephone } from "react-icons/bs";
import { FaEdit, FaRegEnvelope } from "react-icons/fa";
import { LuHotel } from "react-icons/lu";
import { MdOutlineMeetingRoom } from "react-icons/md";
import { Button, Grid, GridColumn, Image, Popup } from "semantic-ui-react";
import { useAuth } from "../../context/app/useAuth";
import { useDisclosure } from "../../hooks/pure/useDisclosure";
import ChangePasswordModal from "../common/ChangePasswordModal";
import UpdateProfileModal from "../Users/UpdateProfileModal";

const Profile = () => {
  const { user } = useAuth();
  const {
    isOpen: isPassOpen,
    onClose: onPassClose,
    setCustom: setPassCustom,
  } = useDisclosure();
  const {
    isOpen: isProfileOpen,
    onClose: onProfileClose,
    setCustom: setProfileCustom,
  } = useDisclosure();
  return (
    <>
      <ChangePasswordModal onClose={onPassClose} open={isPassOpen} />
      <UpdateProfileModal onClose={onProfileClose} open={isProfileOpen} />
      <div className="profileWrap p-2">
        <div className="profileHeader">
          <Grid>
            <GridColumn mobile={16} computer={4}>
              <Image
                className="b-radius-50 mx-auto"
                src={user?.imageUrl || avatar}
              />
              <Popup
                content="Update Profile"
                position="top center"
                trigger={
                  <div
                    onClick={() => setProfileCustom(true)}
                    className="profileUploadBtn mt-2"
                  >
                    <FaEdit />
                  </div>
                }
              />
            </GridColumn>
            <GridColumn className="asc" mobile={16} computer={12}>
              <h2 className="mb-1 t-capitalize">
                {user?.name} ({user?.userId})
              </h2>
              <h4 className="mt-0 profileDetails">
                <FaRegEnvelope />
                <span>{user?.email}</span>
              </h4>
              <h4 className="mt-0 profileDetails">
                <BsTelephone />
                <span className="t-capitalize">{user?.mobile}</span>
              </h4>
              <h4 className="mt-0 profileDetails">
                <LuHotel />
                <span className="t-capitalize">{user?.area?.name}</span>
              </h4>
              <h4 className="mt-0 profileDetails">
                <MdOutlineMeetingRoom />
                <span className="t-capitalize">{user?.address}</span>
              </h4>

              <Button onClick={() => setPassCustom(true)} color="red">
                Change password
              </Button>
            </GridColumn>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default Profile;
