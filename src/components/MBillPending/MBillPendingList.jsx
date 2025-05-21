import avatar from "@/assets/user-avatar.png";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
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
import {
  areaListOptions,
  millStatusColor,
  monthsOptions,
} from "../../constant/common.constant";
import { useClient } from "../../hooks/pure/useClient";
import { useDisclosure } from "../../hooks/pure/useDisclosure";
import { getFormattedDateTime } from "../../utils/helper";
import AsToast from "../common/AsToast";
import CustomPagination from "../common/CustomPagination";
import DeleteModal from "../common/DeleteModal";
import NoDataAvailable from "../common/NoDataAvailable";
import SearchBar from "../common/SearchBar";
import TableLoader from "../common/TableLoader";

const MBillPendingList = () => {
  const client = useClient();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [defaultQuery, setDefaultQuery] = useState({
    page: 1,
    limit: 20,
    searchTerm: "",
    status: "pending",
  });
  const { data: mBillList, isFetching } = useGetQueryDataList(
    "mbill",
    defaultQuery
  );
  const { isOpen, onClose, setCustom } = useDisclosure();

  const { mutate: paidMutate, isPending } = useMutation({
    mutationFn: ({ id, status }) =>
      client(`mbill/${id}/paid`, { data: { status: status }, method: "PATCH" }),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["mbill-list"],
        type: "active",
      });
      onClose();

      AsToast.success(
        <div className="errorToast">
          <AiOutlineCheckCircle /> &nbsp;
          <span>Bill Paid</span>
        </div>
      );
    },
  });

  const handlePaid = (data) => {
    paidMutate(data);
  };

  return (
    <div className="previewLayout">
      <DeleteModal
        modalHeader="Paid bill"
        modalContent="Are you sure you want to paid bill?"
        onClose={onClose}
        confirmText="Paid"
        open={isOpen?.status}
        isLoading={isPending}
        onConfirm={() => handlePaid(isOpen)}
        confirm
      />

      <div className="pageHeader">
        <div className="title">
          <h5>Pending Bills ({mBillList?.meta?.total || 0})</h5>
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
            <TableHeaderCell>Bill</TableHeaderCell>
            <TableHeaderCell>Area</TableHeaderCell>
            <TableHeaderCell>Address</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Created At</TableHeaderCell>
            <TableHeaderCell className="billActionsHeader">
              Actions
            </TableHeaderCell>
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
                <TableCell>{bill?.user?.bill || 0}</TableCell>
                <TableCell className="t-capitalize">{bill?.area}</TableCell>
                <TableCell>{bill?.user?.address}</TableCell>
                <TableCell>
                  <Label
                    size="tiny"
                    color={millStatusColor[bill?.status]}
                    className="labelsStyle"
                  >
                    {bill?.status}
                  </Label>
                </TableCell>
                <TableCell>{getFormattedDateTime(bill?.createdAt)}</TableCell>
                <TableCell className="d-flex">
                  <Popup
                    content="Pay Bill"
                    position="top center"
                    trigger={
                      <Select
                        className="billActionsDropdown"
                        placeholder="Pay"
                        clearable
                        disabled={bill?.status === "paid"}
                        options={[
                          {
                            key: "paid",
                            value: "paid",
                            text: "Paid",
                          },
                        ]}
                        onChange={(e, { value }) =>
                          setCustom({ status: value, id: bill?._id })
                        }
                      />
                    }
                  />
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
        totalPages={mBillList?.meta?.totalPage || 0}
        activePage={defaultQuery?.page || 0}
        onPageChange={(value) =>
          setDefaultQuery((prev) => ({ ...prev, page: value }))
        }
      />
    </div>
  );
};

export default MBillPendingList;
