import avatar from "@/assets/user-avatar.png";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import {
  Button,
  Checkbox,
  Image,
  Label,
  Loader,
  Select,
  TableRow,
} from "semantic-ui-react";
import { useGetQueryDataList } from "../../api/query.api";
import { millStatusColor, monthsOptions } from "../../constant/common.constant";
import { useClient } from "../../hooks/pure/useClient";
import { useDisclosure } from "../../hooks/pure/useDisclosure";
import { getFormattedDateTime } from "../../utils/helper";
import AsToast from "../common/AsToast";
import CustomPagination from "../common/CustomPagination";
import DeleteModal from "../common/DeleteModal";
import NoDataAvailable from "../common/NoDataAvailable";
import SearchBar from "../common/SearchBar";
import TableLoader from "../common/TableLoader";

const MBillPaidList = () => {
  const client = useClient();
  const queryClient = useQueryClient();
  const [defaultQuery, setDefaultQuery] = useState({
    page: 1,
    limit: 20,
    searchTerm: "",
    status: "paid",
  });
  const { data: mBillList, isFetching } = useGetQueryDataList(
    "mbill",
    defaultQuery
  );
  const { data: employeeList = [], isFetching: isEmployeeLoading } = useQuery({
    queryKey: [`employee-list`],
    queryFn: () => client(`user/employee`),
  });

  const { data: areaList = [], isFetching: isAreaListFetching } = useQuery({
    queryKey: [`area-list`],
    queryFn: () => client(`area/list`),
  });

  const { isOpen, onClose, setCustom } = useDisclosure();

  // start checkbox logic

  const [checkList, setCheckList] = useState([]);

  const currentPageIds = mBillList?.result?.map((bill) => bill._id) || [];
  const isAllSelected =
    currentPageIds.length > 0 &&
    currentPageIds.every((id) => checkList.some((item) => item.id === id));

  const handleToggleAll = () => {
    const currentBills = mBillList?.result || [];
    const currentIds = currentBills.map((bill) => bill._id);
    const allSelected = currentIds.every((id) =>
      checkList.some((item) => item.id === id)
    );

    if (allSelected) {
      setCheckList((prev) =>
        prev.filter((item) => !currentIds.includes(item.id))
      );
    } else {
      const newEntries = currentBills.map((bill) => ({
        id: bill._id,
        bill: bill.user?.bill || 0,
      }));
      setCheckList((prev) => [
        ...prev.filter((item) => !currentIds.includes(item.id)),
        ...newEntries,
      ]);
    }
  };

  const handleCheckboxChange = (bill) => {
    setCheckList((prev) => {
      const exists = prev.some((item) => item.id === bill._id);
      if (exists) {
        return prev.filter((item) => item.id !== bill._id);
      }
      return [...prev, { id: bill._id, bill: bill.user?.bill || 0 }];
    });
  };

  const totalBill = checkList.reduce((acc, item) => acc + item.bill, 0);

  // end checkbox logic

  const { mutate: approvedMutate, isPending } = useMutation({
    mutationFn: (data) => client(`mbill/approved`, { data, method: "PATCH" }),
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

      setCheckList([]);
    },
  });

  const handleApprove = () => {
    const selectedIds = checkList.map((item) => item.id);
    approvedMutate({ ids: selectedIds, status: "approved" });
  };

  return (
    <div className="previewLayout">
      <DeleteModal
        modalHeader="Approve bill"
        modalContent="Are you sure you want to approve bill?"
        onClose={onClose}
        confirmText="Approve"
        open={isOpen}
        isLoading={isFetching}
        onConfirm={() => handleApprove()}
        confirm
      />

      <div className="pageHeader">
        <div className="title">
          <h5>Paid Bills ({mBillList?.meta?.total || 0})</h5>
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
            isLoading={isEmployeeLoading}
            options={employeeList}
            onChange={(e, { value }) =>
              setDefaultQuery((prev) => ({ ...prev, paidBy: value }))
            }
            placeholder="Paid By"
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
            options={areaList}
            loading={isAreaListFetching}
            disabled={isAreaListFetching}
            onChange={(e, { value }) =>
              setDefaultQuery((prev) => ({ ...prev, area: value }))
            }
            placeholder="Select Area"
          />
          {/* <Button onClick={() => navigate("add")} primary>
            Add User
          </Button> */}
        </div>
      </div>

      <div>
        {checkList.length > 0 && (
          <div className="d-flex mb-2">
            <div>
              <div>
                Total Selected:{" "}
                <span style={{ fontWeight: "bolder" }}>
                  {checkList?.length}
                </span>
              </div>
              <div>
                Total amount:{" "}
                <span style={{ fontWeight: "bolder" }}>{totalBill}</span>
              </div>
            </div>
            <Button
              primary
              pending={isPending}
              disabled={isPending}
              className="ml-2"
              onClick={() => setCustom(true)}
            >
              Approve
            </Button>
          </div>
        )}
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>
                <Checkbox checked={isAllSelected} onChange={handleToggleAll} />
              </th>
              <th>#</th>
              <th>Name</th>
              <th>User Id</th>
              <th>Mobile</th>
              <th>Month</th>
              <th>Bill</th>
              <th>Collected By</th>
              <th>Area</th>
              <th>Address</th>
              <th>Status</th>
              <th>Collection Time</th>
            </tr>
          </thead>
          <tbody>
            {mBillList?.result?.length > 0 && !isFetching ? (
              mBillList?.result?.map((bill, index) => (
                <tr key={bill?._id}>
                  <td>
                    <Checkbox
                      checked={checkList.some((item) => item.id === bill._id)}
                      onChange={() => handleCheckboxChange(bill)}
                    />
                  </td>
                  <td>
                    {(defaultQuery?.page - 1) * defaultQuery?.limit + index + 1}
                  </td>
                  <td>
                    <div className="d-flex aic">
                      <Image
                        className="b-radius-50 headerAvatar"
                        src={bill?.user?.imageUrl || avatar}
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
                  </td>
                  <td>{bill?.userId}</td>
                  <td>{bill?.mobile || ""}</td>
                  <td>{bill?.monthName || "-"}</td>
                  <td>{bill?.user?.bill || 0}</td>
                  <td>
                    <div className="d-flex aic">
                      <Image
                        className="b-radius-50 headerAvatar"
                        src={bill?.paidBy?.imageUrl || avatar}
                      />
                      <span className="t-capitalize ml-2">
                        {bill?.paidBy?.name || "-"}
                      </span>
                    </div>
                  </td>
                  <td className="t-capitalize">{bill?.area?.name || "-"}</td>
                  <td>{bill?.user?.address || "-"}</td>
                  <td>
                    <Label
                      size="tiny"
                      color={millStatusColor[bill?.status]}
                      className="labelsStyle"
                    >
                      {bill?.status || "-"}
                    </Label>
                  </td>
                  <td>{getFormattedDateTime(bill?.updatedAt)}</td>
                </tr>
              ))
            ) : (
              <>
                {isFetching && <TableLoader columns={12} />}
                {!isFetching && (
                  <TableRow>
                    <td colSpan="12">
                      <NoDataAvailable />
                    </td>
                  </TableRow>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>

      <div className="card-view">
        {mBillList?.result?.length > 0 && !isFetching ? (
          mBillList?.result?.map((bill, index) => (
            <div className="card" key={index}>
              <div className="card-row">
                <span className="card-label">#</span>
                <span className="card-value">
                  {(defaultQuery?.page - 1) * defaultQuery?.limit + index + 1}
                </span>
              </div>
              <div className="card-row">
                <span className="card-label">Name</span>
                <span className="card-value">
                  <div className="d-flex aic">
                    <Image
                      className="b-radius-50 headerAvatar"
                      src={bill?.user?.imageUrl || avatar}
                    />
                    <span className="t-capitalize ml-2">
                      {bill?.user?.name || "-"}{" "}
                      <Label
                        circular
                        color={bill?.user?.isActive ? "green" : "red"}
                        empty
                        size="mini"
                      />
                    </span>
                  </div>
                </span>
              </div>
              <div className="card-row">
                <span className="card-label">User Id</span>
                <span className="card-value">{bill?.userId || "-"}</span>
              </div>
              <div className="card-row">
                <span className="card-label">Mobile</span>
                <span className="card-value">{bill?.mobile || "-"}</span>
              </div>
              <div className="card-row">
                <span className="card-label">Month</span>
                <span className="card-value">{bill?.monthName || "-"}</span>
              </div>
              <div className="card-row">
                <span className="card-label">Bill</span>
                <span className="card-value">{bill?.user?.bill || 0}</span>
              </div>
              <div className="card-row">
                <span className="card-label">Collected By</span>
                <span className="card-value">
                  <div className="d-flex aic">
                    <Image
                      className="b-radius-50 headerAvatar"
                      src={bill?.paidBy?.imageUrl || avatar}
                    />
                    <span className="t-capitalize ml-2">
                      {bill?.paidBy?.name || "-"}
                    </span>
                  </div>
                </span>
              </div>
              <div className="card-row">
                <span className="card-label">Area</span>
                <span className="card-value t-capitalize">
                  {bill?.area?.name || "-"}
                </span>
              </div>
              <div className="card-row">
                <span className="card-label">Address</span>
                <span className="card-value">{bill?.user?.address || "-"}</span>
              </div>
              <div className="card-row">
                <span className="card-label">Status</span>
                <span className="card-value">
                  <Label
                    size="tiny"
                    color={millStatusColor[bill?.status]}
                    className="labelsStyle"
                  >
                    {bill?.status || "-"}
                  </Label>
                </span>
              </div>
              <div className="card-row">
                <span className="card-label">Collection Time</span>
                <span className="card-value">
                  {getFormattedDateTime(bill?.updatedAt)}
                </span>
              </div>
            </div>
          ))
        ) : (
          <>
            {isFetching && <Loader active />}
            {!isFetching && (
              <div className="card">
                <NoDataAvailable />
              </div>
            )}
          </>
        )}
      </div>

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

export default MBillPaidList;
