import avatar from "@/assets/user-avatar.png";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Image, Label, Loader, Select } from "semantic-ui-react";
import { useGetQueryDataList } from "../../api/query.api";
import { millStatusColor, monthsOptions } from "../../constant/common.constant";
import { useClient } from "../../hooks/pure/useClient";
import { getFormattedDateTime } from "../../utils/helper";
import CustomPagination from "../common/CustomPagination";
import NoDataAvailable from "../common/NoDataAvailable";
import SearchBar from "../common/SearchBar";
import TableLoader from "../common/TableLoader";

const MBillApprovedList = () => {
  const client = useClient();
  const [defaultQuery, setDefaultQuery] = useState({
    page: 1,
    limit: 20,
    searchTerm: "",
    status: "approved",
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

  return (
    <div className="previewLayout">
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
            isLoading={isEmployeeLoading}
            options={employeeList}
            onChange={(e, { value }) =>
              setDefaultQuery((prev) => ({ ...prev, approvedBy: value }))
            }
            placeholder="Approved By"
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
              <th>Paid By</th>
              <th>Approved By</th>
              <th>Area</th>
              <th>Address</th>
              <th>Status</th>
              <th>Approve Time</th>
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
                        {bill?.paidBy?.name}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex aic">
                      <Image
                        className="b-radius-50 headerAvatar"
                        src={bill?.approvedBy?.imageUrl || avatar}
                      />
                      <span className="t-capitalize ml-2">
                        {bill?.approvedBy?.name || "-"}
                      </span>
                    </div>
                  </td>
                  <td className="t-capitalize">{bill?.area?.name || "-"}</td>
                  <td>{bill?.user?.address}</td>
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
                  <tr>
                    <td colSpan="12">
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
                <span className="card-label">Approved By</span>
                <span className="card-value">
                  <div className="d-flex aic">
                    <Image
                      className="b-radius-50 headerAvatar"
                      src={bill?.approvedBy?.imageUrl || avatar}
                    />
                    <span className="t-capitalize ml-2">
                      {bill?.approvedBy?.name || "-"}
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
                <span className="card-label">Approve Time</span>
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

export default MBillApprovedList;
