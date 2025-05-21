import avatar from "@/assets/user-avatar.png";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { BiBlock } from "react-icons/bi";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Image,
  Label,
  Popup,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "semantic-ui-react";
import { useGetQueryDataList } from "../../api/query.api";
import { userRoleColor } from "../../constant/common.constant";
import { useClient } from "../../hooks/pure/useClient";
import { useDisclosure } from "../../hooks/pure/useDisclosure";
import AsToast from "../common/AsToast";
import CustomPagination from "../common/CustomPagination";
import DeleteModal from "../common/DeleteModal";
import NoDataAvailable from "../common/NoDataAvailable";
import SearchBar from "../common/SearchBar";
import TableLoader from "../common/TableLoader";

const UsersList = () => {
  const client = useClient();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [defaultQuery, setDefaultQuery] = useState({
    page: 1,
    limit: 20,
    searchTerm: "",
  });
  const { data: usersList, isFetching } = useGetQueryDataList(
    "user/all",
    defaultQuery
  );
  const { isOpen, onClose, setCustom } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onClose: onDeleteClose,
    // setCustom: setDeleteCustom,
  } = useDisclosure();

  const { mutate: deleteUserMutate, isPending } = useMutation({
    mutationFn: (id) => client(`user/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["user/all-list"],
        type: "active",
      });
      onDeleteClose();
      AsToast.error(
        <div className="errorToast">
          <FiTrash2 /> &nbsp;
          <span>User Deleted!</span>
        </div>
      );
    },
  });
  const { mutate: updateStatusMutation, isPending: isStatusPending } =
    useMutation({
      mutationFn: (id) => client(`user/${id}/status`, { method: "PATCH" }),
      onSuccess: () => {
        queryClient.refetchQueries({
          queryKey: ["user/all-list"],
          type: "active",
        });
        onClose();
        AsToast.success(
          <div className="errorToast">
            <FiTrash2 /> &nbsp;
            <span>User Status Updated</span>
          </div>
        );
      },
    });

  const handleDelete = (id) => {
    deleteUserMutate(id);
  };
  const handleBlockUser = ({ id }) => {
    updateStatusMutation(id);
  };
  const { isActive } = isOpen;

  return (
    <div className="previewLayout">
      <DeleteModal
        modalHeader={`${isActive ? "Block" : "Unblock"} User`}
        modalContent={`Are you sure you want to ${
          isActive ? "block" : "unblock"
        }  user?`}
        onClose={onClose}
        confirmText={`${isActive ? "Block" : "Unlock"}`}
        open={isOpen}
        isLoading={isStatusPending}
        onConfirm={() => handleBlockUser(isOpen)}
        confirm={!isActive}
      />
      <DeleteModal
        modalHeader="Delete User"
        modalContent="Are you sure you want to delete user?"
        onClose={onDeleteClose}
        confirmText="Delete"
        open={isDeleteOpen}
        isLoading={isPending}
        onConfirm={() => handleDelete(isDeleteOpen)}
      />

      <div className="pageHeader">
        <div className="title">
          <h5>Users ({usersList?.meta?.total || 0})</h5>
        </div>
        <div className="pageAction">
          <SearchBar
            placeholder="Search user"
            stillTime={500}
            onSuccess={(e) =>
              setDefaultQuery((prev) => ({ ...prev, searchTerm: e, page: 1 }))
            }
          />
          <Button onClick={() => navigate("add")} primary>
            Add User
          </Button>
        </div>
      </div>
      <Table basic>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>#</TableHeaderCell>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>User Id</TableHeaderCell>
            <TableHeaderCell>Role</TableHeaderCell>
            <TableHeaderCell>Bill</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Mobile</TableHeaderCell>
            <TableHeaderCell>Area</TableHeaderCell>
            <TableHeaderCell>Address</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usersList?.result?.length > 0 && !isFetching ? (
            usersList?.result?.map((user, index) => (
              <TableRow key={user?._id}>
                <TableCell>
                  {(defaultQuery?.page - 1) * defaultQuery?.limit + index + 1}
                </TableCell>
                <TableCell>
                  <div className="d-flex aic">
                    <Image
                      className="b-radius-50 headerAvatar"
                      src={user?.imageUrl || avatar}
                    />
                    <span className="t-capitalize ml-2">
                      {user?.name}{" "}
                      <Label
                        circular
                        color={user?.isActive ? "green" : "red"}
                        empty
                        size="mini"
                      />
                    </span>
                  </div>
                </TableCell>
                <TableCell>{user?.userId}</TableCell>
                <TableCell>
                  <Label
                    size="medium"
                    color={userRoleColor[user?.role]}
                    className="labelsStyle"
                  >
                    {user?.role}
                  </Label>
                </TableCell>
                <TableCell>{user?.bill || 0}</TableCell>
                <TableCell>{user?.email || "-"}</TableCell>
                <TableCell>{user?.mobile}</TableCell>
                <TableCell>{user?.area}</TableCell>
                <TableCell>{user?.address}</TableCell>
                <TableCell>
                  <Label
                    size="tiny"
                    color={user?.isActive ? "green" : "red"}
                    className="labelsStyle"
                  >
                    {user?.isActive ? "Active" : "Blocked"}
                  </Label>
                </TableCell>
                <TableCell className="d-flex">
                  <Popup
                    content="Edit User"
                    position="top center"
                    trigger={
                      <Button
                        icon
                        onClick={() => navigate(`edit/${user?._id}`)}
                      >
                        <FiEdit2 />
                      </Button>
                    }
                  />
                  <Popup
                    content="Block User"
                    position="top center"
                    trigger={
                      <Button
                        id="userBlockButton"
                        icon
                        onClick={() =>
                          setCustom({ id: user?._id, isActive: user?.isActive })
                        }
                      >
                        <BiBlock />
                      </Button>
                    }
                  />
                  {/* <Popup
                    content="Delete"
                    position="top center"
                    trigger={
                      <Button
                        // color="red"
                        // disabled
                        // disabled={
                        //   user?.role === "admin" || user?.role === "manager"
                        // }
                        icon
                        onClick={() => setDeleteCustom(user?._id)}
                      >
                        <MdDelete />
                      </Button>
                    }
                  /> */}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <>
              {isFetching && <TableLoader columns={11} />}
              {!isFetching && (
                <TableRow>
                  <TableCell colSpan="11">
                    <NoDataAvailable />
                  </TableCell>
                </TableRow>
              )}
            </>
          )}
        </TableBody>
      </Table>
      <CustomPagination
        totalPages={usersList?.meta?.totalPage || 0}
        activePage={defaultQuery?.page || 0}
        onPageChange={(value) =>
          setDefaultQuery((prev) => ({ ...prev, page: value }))
        }
      />
    </div>
  );
};

export default UsersList;
