import avatar from "@/assets/user-avatar.png";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Image,
  Label,
  Popup,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "semantic-ui-react";
import { useGetQueryDataList } from "../../api/query.api";
import { areaListOptions, monthsOptions } from "../../constant/common.constant";
import { useClient } from "../../hooks/pure/useClient";
import { useDisclosure } from "../../hooks/pure/useDisclosure";
import { getFormattedDateTime } from "../../utils/helper";
import CustomPagination from "../common/CustomPagination";
import DeleteModal from "../common/DeleteModal";
import NoDataAvailable from "../common/NoDataAvailable";
import SearchBar from "../common/SearchBar";
import TableLoader from "../common/TableLoader";

const MBillList = () => {
  const client = useClient();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [defaultQuery, setDefaultQuery] = useState({
    page: 1,
    limit: 20,
    searchTerm: "",
  });
  const { data: mBillList, isFetching } = useGetQueryDataList(
    "mbill",
    defaultQuery
  );
  const { isOpen, onClose, setCustom } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onClose: onDeleteClose,
    // setCustom: setDeleteCustom,
  } = useDisclosure();

  // const { mutate: deleteUserMutate, isPending } = useMutation({
  //   mutationFn: (id) => client(`user/${id}`, { method: "DELETE" }),
  //   onSuccess: () => {
  //     queryClient.refetchQueries({
  //       queryKey: ["user/all-list"],
  //       type: "active",
  //     });
  //     onDeleteClose();
  //     AsToast.error(
  //       <div className="errorToast">
  //         <FiTrash2 /> &nbsp;
  //         <span>User Deleted!</span>
  //       </div>
  //     );
  //   },
  // });
  // const { mutate: updateStatusMutation, isPending: isStatusPending } =
  //   useMutation({
  //     mutationFn: (id) => client(`user/${id}/status`, { method: "PATCH" }),
  //     onSuccess: () => {
  //       queryClient.refetchQueries({
  //         queryKey: ["user/all-list"],
  //         type: "active",
  //       });
  //       onClose();
  //       AsToast.success(
  //         <div className="errorToast">
  //           <FiTrash2 /> &nbsp;
  //           <span>User Status Updated</span>
  //         </div>
  //       );
  //     },
  //   });

  const handleDelete = (id) => {
    // deleteUserMutate(id);
  };
  const handleBlockUser = ({ id }) => {
    // updateStatusMutation(id);
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
        // isLoading={isStatusPending}
        onConfirm={() => handleBlockUser(isOpen)}
        confirm={!isActive}
      />
      <DeleteModal
        modalHeader="Delete User"
        modalContent="Are you sure you want to delete user?"
        onClose={onDeleteClose}
        confirmText="Delete"
        open={isDeleteOpen}
        // isLoading={isPending}
        onConfirm={() => handleDelete(isDeleteOpen)}
      />

      <div className="pageHeader">
        <div className="title">
          <h5>Bills ({mBillList?.meta?.total || 0})</h5>
        </div>
        <div className="pageAction">
          <SearchBar
            placeholder="Search user"
            stillTime={500}
            onSuccess={(e) =>
              setDefaultQuery((prev) => ({ ...prev, searchTerm: e, page: 1 }))
            }
          />
          <Select
            // className="orderFilterDropdown"
            clearable
            options={monthsOptions}
            onChange={(e, { value }) =>
              setDefaultQuery((prev) => ({ ...prev, monthName: value }))
            }
            placeholder="Select Month"
          />
          <Select
            // className="orderFilterDropdown"
            clearable
            options={areaListOptions}
            onChange={(e, { value }) =>
              setDefaultQuery((prev) => ({ ...prev, area: value }))
            }
            placeholder="Select Area"
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
            <TableHeaderCell>Mobile</TableHeaderCell>
            <TableHeaderCell>Month</TableHeaderCell>
            <TableHeaderCell>Price</TableHeaderCell>
            <TableHeaderCell>Area</TableHeaderCell>
            <TableHeaderCell>Address</TableHeaderCell>
            <TableHeaderCell>Created At</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mBillList?.result?.length > 0 && !isFetching ? (
            mBillList?.result?.map((bill, index) => (
              <TableRow key={bill?._id}>
                <TableCell>
                  {(defaultQuery?.page - 1) * defaultQuery?.limit + index + 1}
                </TableCell>
                <TableCell>
                  <div className="d-flex aic">
                    <Image
                      className="b-radius-50 headerAvatar"
                      src={bill?.imageUrl || avatar}
                    />
                    <span className="t-capitalize ml-2">
                      {bill?.user?.name}{" "}
                      <Label
                        circular
                        color={bill?.user?.isActive ? "green" : "red"}
                        empty
                        size="mini"
                      />
                    </span>
                  </div>
                </TableCell>
                <TableCell>{bill?.userId}</TableCell>
                <TableCell>{bill?.mobile || ""}</TableCell>
                <TableCell>{bill?.monthName || "-"}</TableCell>
                <TableCell>{bill?.bill?.price || ""}</TableCell>
                <TableCell className="t-capitalize">{bill?.area}</TableCell>
                <TableCell>{bill?.user?.address}</TableCell>
                <TableCell>{getFormattedDateTime(bill?.createdAt)}</TableCell>
                <TableCell className="d-flex">
                  <Popup
                    content="Edit User"
                    position="top center"
                    trigger={
                      <Button
                        icon
                        // onClick={() => navigate(`edit/${user?._id}`)}
                      >
                        <FiEdit2 />
                      </Button>
                    }
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <>
              {isFetching && <TableLoader columns={10} />}
              {!isFetching && (
                <TableRow>
                  <TableCell colSpan="10">
                    <NoDataAvailable />
                  </TableCell>
                </TableRow>
              )}
            </>
          )}
        </TableBody>
      </Table>
      <CustomPagination
        totalPages={mBillList?.meta?.totalPage || 0}
        activePage={defaultQuery?.page || 0}
        onPageChange={(value) =>
          setDefaultQuery((prev) => ({ ...prev, page: value }))
        }
      />
    </div>
  );
};

export default MBillList;
