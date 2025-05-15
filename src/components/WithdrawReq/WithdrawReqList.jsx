import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import {
  Button,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "semantic-ui-react";
import { useGetQueryDataList } from "../../api/query.api";
import { withdrawRequestStatus } from "../../constant/common.constant";
import { useAuth } from "../../context/app/useAuth";
import { useClient } from "../../hooks/pure/useClient";
import { useDisclosure } from "../../hooks/pure/useDisclosure";
import { getFormattedDateTime } from "../../utils/helper";
import AsToast from "../common/AsToast";
import CustomPagination from "../common/CustomPagination";
import NoDataAvailable from "../common/NoDataAvailable";
import TableLoader from "../common/TableLoader";
import WithdrawReqModal from "./WithdrawReqModal";

const WithdrawReqList = () => {
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

  const { data: withdrawReqList, isFetching } = useGetQueryDataList(
    "withdraw",
    defaultQuery,
    {
      onSuccess: () => {},
    }
  );

  const { mutate: approvedWithdrawReqMutate } = useMutation({
    mutationFn: ({ id, data }) =>
      client(`withdraw/approved/${id}`, { method: "PATCH", data }),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["withdraw-list"],
        type: "active",
      });
      AsToast.success(
        <div className="errorToast">
          <AiOutlineCheckCircle /> &nbsp;
          <span>Cancel req updated successfully!</span>
        </div>
      );
    },
  });
  const { mutate: cancelWithdrawReqMutate } = useMutation({
    mutationFn: ({ id, data }) =>
      client(`withdraw/cancel/${id}`, { method: "PATCH", data }),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["withdraw-list"],
        type: "active",
      });
      AsToast.success(
        <div className="errorToast">
          <AiOutlineCheckCircle /> &nbsp;
          <span>Cancel req updated successfully!</span>
        </div>
      );
    },
  });

  const handleStatusChange = (data) => {
    console.log(data);
    if (data?.status === "approved") {
      approvedWithdrawReqMutate({ amount: data?.amount, id: data?.id });
    }
    if (data?.status === "canceled") {
      cancelWithdrawReqMutate({ amount: data?.amount, id: data?.id });
    }
  };

  return (
    <>
      <WithdrawReqModal onClose={onClose} open={isOpen} />
      <div className="previewLayout">
        <div className="d-flex jcsb">
          <h2>Withdraw ({withdrawReqList?.meta?.total || 0})</h2>
          <Button onClick={() => setCustom(true)} className="ml-3" primary>
            Withdraw Request
          </Button>
        </div>
        <Table basic>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>#</TableHeaderCell>
              <TableHeaderCell>User Name</TableHeaderCell>
              <TableHeaderCell>User Id</TableHeaderCell>
              <TableHeaderCell>User Balance</TableHeaderCell>
              <TableHeaderCell>Amount</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Created At</TableHeaderCell>
              <TableHeaderCell>Updated At</TableHeaderCell>
              {user?.role === "admin" && (
                <TableHeaderCell>Action</TableHeaderCell>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {withdrawReqList?.result?.length > 0 && !isFetching ? (
              withdrawReqList?.result?.map((withdraw, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {(defaultQuery?.page - 1) * defaultQuery?.limit + index + 1}
                  </TableCell>
                  <TableCell className="t-capitalize">
                    {withdraw?.user?.name || "-"}
                  </TableCell>
                  <TableCell>{withdraw?.user?.userId || "-"}</TableCell>
                  <TableCell>
                    {withdraw?.user?.balance.toFixed(2) || "-"}
                  </TableCell>
                  <TableCell className="tableHighlightAmount">
                    {withdraw?.amount || "-"}
                  </TableCell>

                  <TableCell>
                    <span
                      className={`${withdraw?.status}OrderStatus orderStatusBtn t-capitalize`}
                    >
                      {withdraw?.status || "-"}
                    </span>
                  </TableCell>
                  <TableCell>
                    {getFormattedDateTime(withdraw?.createdAt)}
                  </TableCell>
                  <TableCell>
                    {getFormattedDateTime(withdraw?.updatedAt)}
                  </TableCell>
                  {user?.role === "admin" && (
                    <TableCell>
                      <Select
                        disabled={
                          withdraw?.status === "approved" ||
                          withdraw?.status === "canceled"
                        }
                        defaultValue={withdraw?.status}
                        className="orderStatusDropdown"
                        options={withdrawRequestStatus || []}
                        onChange={(e, { value }) =>
                          handleStatusChange({
                            status: value,
                            amount: withdraw?.amount,
                            id: withdraw?._id,
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
                  <TableLoader columns={user?.role === "admin" ? 9 : 8} />
                )}
                {!isFetching && (
                  <TableRow>
                    <TableCell colSpan={(user?.role === "admin" && 9) || 8}>
                      <NoDataAvailable />
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
        <CustomPagination
          totalPages={withdrawReqList?.meta?.totalPage || 0}
          activePage={defaultQuery?.page || 0}
          onPageChange={(value) =>
            setDefaultQuery((prev) => ({ ...prev, page: value }))
          }
        />
      </div>
    </>
  );
};

export default WithdrawReqList;
