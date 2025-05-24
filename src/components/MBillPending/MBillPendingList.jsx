import avatar from "@/assets/user-avatar.png";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { Image, Label, Loader, Popup, Select } from "semantic-ui-react";
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

const MBillPendingList = () => {
  const client = useClient();
  const queryClient = useQueryClient();
  const [defaultQuery, setDefaultQuery] = useState({
    page: 1,
    limit: 20,
    searchTerm: "",
    status: "pending",
  });
  const { data: mBillList, isFetching } = useGetQueryDataList(
    "mbill/pending",
    defaultQuery
  );
  const { data: areaList = [], isFetching: isAreaListFetching } = useQuery({
    queryKey: [`area-list`],
    queryFn: () => client(`area/list`),
  });
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
            options={areaList}
            loading={isAreaListFetching}
            disabled={isAreaListFetching}
            onChange={(e, { value }) =>
              setDefaultQuery((prev) => ({ ...prev, area: value }))
            }
            placeholder="Select Area"
          />
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>User Id</th>
              <th>Mobile</th>
              <th>Month</th>
              <th>Bill</th>
              <th>Area</th>
              <th>Address</th>
              <th>Status</th>
              <th>Created At</th>
              <th className="billActionsHeader">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mBillList?.result?.length > 0 && !isFetching ? (
              mBillList?.result?.map((bill, index) => (
                <tr key={bill?._id}>
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
                        {bill?.user?.name || "-"}{" "}
                        <Label
                          circular
                          color={bill?.user?.isActive ? "green" : "red"}
                          empty
                          size="mini"
                        />
                      </span>
                    </div>
                  </td>
                  <td>{bill?.userId || "-"}</td>
                  <td>{bill?.mobile || "-"}</td>
                  <td>{bill?.monthName || "-"}</td>
                  <td>{bill?.user?.bill || 0}</td>
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
                  <td>{getFormattedDateTime(bill?.createdAt)}</td>
                  <td className="d-flex">
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
                  </td>
                </tr>
              ))
            ) : (
              <>
                {isFetching && <TableLoader columns={11} />}
                {!isFetching && (
                  <tr>
                    <td colSpan="11">
                      <NoDataAvailable />
                    </td>
                  </tr>
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
                  {" "}
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
                <span className="card-label">Created At</span>
                <span className="card-value">
                  {getFormattedDateTime(bill?.createdAt)}
                </span>
              </div>
              <div className="card-row">
                <span className="card-label">Actions</span>
                <span className="card-value d-flex">
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

export default MBillPendingList;
