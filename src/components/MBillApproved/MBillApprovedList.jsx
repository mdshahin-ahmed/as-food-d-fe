import avatar from "@/assets/user-avatar.png";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  Image,
  Label,
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
            options={areaListOptions}
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

      <Table basic>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>#</TableHeaderCell>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>User Id</TableHeaderCell>
            <TableHeaderCell>Mobile</TableHeaderCell>
            <TableHeaderCell>Month</TableHeaderCell>
            <TableHeaderCell>Bill</TableHeaderCell>
            <TableHeaderCell>Paid By</TableHeaderCell>
            <TableHeaderCell>Approved By</TableHeaderCell>
            <TableHeaderCell>Area</TableHeaderCell>
            <TableHeaderCell>Address</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Approve Time</TableHeaderCell>
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
                </TableCell>
                <TableCell>{bill?.userId}</TableCell>
                <TableCell>{bill?.mobile || ""}</TableCell>
                <TableCell>{bill?.monthName || "-"}</TableCell>
                <TableCell>{bill?.user?.bill || 0}</TableCell>
                <TableCell>
                  <div className="d-flex aic">
                    <Image
                      className="b-radius-50 headerAvatar"
                      src={bill?.paidBy?.imageUrl || avatar}
                    />
                    <span className="t-capitalize ml-2">
                      {bill?.paidBy?.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="d-flex aic">
                    <Image
                      className="b-radius-50 headerAvatar"
                      src={bill?.approvedBy?.imageUrl || avatar}
                    />
                    <span className="t-capitalize ml-2">
                      {bill?.approvedBy?.name}
                    </span>
                  </div>
                </TableCell>
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
                <TableCell>{getFormattedDateTime(bill?.updatedAt)}</TableCell>
              </TableRow>
            ))
          ) : (
            <>
              {isFetching && <TableLoader columns={12} />}
              {!isFetching && (
                <TableRow>
                  <TableCell colSpan="12">
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

export default MBillApprovedList;
