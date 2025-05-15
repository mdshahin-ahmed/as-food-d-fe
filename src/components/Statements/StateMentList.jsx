import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import {
  Select,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "semantic-ui-react";
import { useGetQueryDataList } from "../../api/query.api";
import { useClient } from "../../hooks/pure/useClient";
import { getFormattedDateTime } from "../../utils/helper";
import AsToast from "../common/AsToast";
import CustomPagination from "../common/CustomPagination";
import NoDataAvailable from "../common/NoDataAvailable";
import SearchBar from "../common/SearchBar";
import TableLoader from "../common/TableLoader";
import { useAuth } from "../../context/app/useAuth";
import { useDisclosure } from "../../hooks/pure/useDisclosure";
import DeleteModal from "../common/DeleteModal";
import { paymentMethod } from "../../constant/common.constant";

const StateMentList = () => {
  const { user } = useAuth();
  const { isOpen, onClose, setCustom } = useDisclosure();
  const [defaultQuery, setDefaultQuery] = useState({
    page: 1,
    limit: 20,
    // searchTerm: ,
    // status: ["pending", "canceled"],
  });

  const client = useClient();
  const queryClient = useQueryClient();

  const { data: statementList, isFetching } = useGetQueryDataList(
    "statement",
    defaultQuery,
    {
      onSuccess: () => {},
    }
  );

  const { mutate: updateStatusMutate, isPending } = useMutation({
    mutationFn: ({ id, status }) =>
      client(`statement/${id}`, { method: "PATCH", data: { status } }),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["statement-list"],
        type: "active",
      });
      onClose();
      AsToast.success(
        <div className="errorToast">
          <AiOutlineCheckCircle /> &nbsp;
          <span>Order updated successfully!</span>
        </div>
      );
    },
  });

  const handleStatusChange = (data) => {
    updateStatusMutate(data);
  };

  return (
    <div className="previewLayout">
      <DeleteModal
        isLoading={isPending}
        confirmText="Approved"
        modalContent="Are you sure you want to Approved?"
        modalHeader="Approved"
        onClose={onClose}
        open={isOpen}
        onConfirm={() => handleStatusChange(isOpen)}
      />
      <div className="orderHeaderWrap">
        <h2>Statements ({statementList?.meta?.total || 0})</h2>
        <div className="orderFilterWrap">
          <Select
            className="orderFilterDropdown"
            clearable
            options={paymentMethod}
            onChange={(e, { value }) =>
              setDefaultQuery((prev) => ({ ...prev, type: value }))
            }
            placeholder="Payment Method"
          />
          <SearchBar
            placeholder="Search by mobile"
            stillTime={500}
            onSuccess={(e) =>
              setDefaultQuery((prev) => ({ ...prev, searchTerm: e, page: 1 }))
            }
          />
        </div>
      </div>
      <Table basic>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>#</TableHeaderCell>
            <TableHeaderCell>User Name</TableHeaderCell>
            <TableHeaderCell>User Id</TableHeaderCell>
            <TableHeaderCell>Mobile</TableHeaderCell>
            <TableHeaderCell>Transaction Number</TableHeaderCell>
            <TableHeaderCell>Exact Amount</TableHeaderCell>
            <TableHeaderCell>Amount</TableHeaderCell>
            <TableHeaderCell>Method</TableHeaderCell>
            <TableHeaderCell>Created At</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Prev Balance</TableHeaderCell>
            <TableHeaderCell>New Balance</TableHeaderCell>
            {user?.role === "admin" && (
              <TableHeaderCell>Action</TableHeaderCell>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {statementList?.result?.length > 0 && !isFetching ? (
            statementList?.result?.map((statement, index) => (
              <TableRow key={index}>
                <TableCell>
                  {(defaultQuery?.page - 1) * defaultQuery?.limit + index + 1}
                </TableCell>
                <TableCell className="t-capitalize">
                  {statement?.user?.name || "-"}
                </TableCell>
                <TableCell>{statement?.user?.userId || "-"}</TableCell>
                <TableCell>{statement?.mobile}</TableCell>
                <TableCell>{statement?.transactionNumber}</TableCell>
                <TableCell className="tableHighlightAmount">
                  {statement?.exactAmount || "-"}
                </TableCell>
                <TableCell>{statement?.amount.toFixed(2)}</TableCell>
                <TableCell className="t-capitalize">
                  {statement?.type || "-"}
                </TableCell>
                <TableCell>
                  {getFormattedDateTime(statement?.createdAt)}
                </TableCell>
                <TableCell>
                  <span
                    className={`${statement?.status}OrderStatus orderStatusBtn t-capitalize`}
                  >
                    {statement?.status || "-"}
                  </span>
                </TableCell>
                <TableCell>{statement?.prevBalance.toFixed(2)}</TableCell>
                <TableCell>{statement?.newBalance.toFixed(2)}</TableCell>
                {user?.role === "admin" && (
                  <TableCell>
                    <Select
                      disabled={statement?.status === "approved"}
                      defaultValue={statement?.status}
                      className="orderStatusDropdown"
                      options={[
                        {
                          key: "approved",
                          text: "Approved",
                          value: "approved",
                        },
                      ]}
                      onChange={(e, { value }) =>
                        setCustom({
                          status: value,
                          id: statement?._id,
                        })
                      }
                    />
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <>
              {isFetching && (
                <TableLoader columns={user?.role === "admin" ? 13 : 12} />
              )}
              {!isFetching && (
                <TableRow>
                  <TableCell colSpan={(user?.role === "admin" && 13) || 12}>
                    <NoDataAvailable />
                  </TableCell>
                </TableRow>
              )}
            </>
          )}
        </TableBody>
      </Table>
      <CustomPagination
        totalPages={statementList?.meta?.totalPage || 0}
        activePage={defaultQuery?.page || 0}
        onPageChange={(value) =>
          setDefaultQuery((prev) => ({ ...prev, page: value }))
        }
      />
    </div>
  );
};

export default StateMentList;
