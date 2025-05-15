import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "semantic-ui-react";
import { useGetQueryDataList } from "../../api/query.api";
import { getFormattedDateTime } from "../../utils/helper";
import CustomPagination from "../common/CustomPagination";
import NoDataAvailable from "../common/NoDataAvailable";
import TableLoader from "../common/TableLoader";
import SearchBar from "../common/SearchBar";

const BalanceList = () => {
  const [defaultQuery, setDefaultQuery] = useState({
    page: 1,
    limit: 20,
    // searchTerm: ,
    // status: ["pending", "canceled"],
  });

  const { data: balanceList, isFetching } = useGetQueryDataList(
    "balance",
    defaultQuery,
    {
      onSuccess: () => {},
    }
  );
  return (
    <div className="previewLayout">
      <div className="orderHeaderWrap">
        <h2>Statements ({balanceList?.meta?.total || 0})</h2>
        <div className="orderFilterWrap">
          <SearchBar
            placeholder="User Id"
            stillTime={500}
            onSuccess={(e) =>
              setDefaultQuery((prev) => ({ ...prev, searchTerm: e }))
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
            <TableHeaderCell>Amount</TableHeaderCell>
            <TableHeaderCell>Method</TableHeaderCell>
            <TableHeaderCell>Created At</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Prev Balance</TableHeaderCell>
            <TableHeaderCell>New Balance</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {balanceList?.result?.length > 0 && !isFetching ? (
            balanceList?.result?.map((balance, index) => (
              <TableRow key={index}>
                <TableCell>
                  {(defaultQuery?.page - 1) * defaultQuery?.limit + index + 1}
                </TableCell>
                <TableCell className="t-capitalize">
                  {balance?.user?.name || "-"}
                </TableCell>
                <TableCell>{balance?.user?.userId || "-"}</TableCell>
                <TableCell>{balance?.amount}</TableCell>
                <TableCell className="t-capitalize">
                  {balance?.type || "-"}
                </TableCell>
                <TableCell>
                  {getFormattedDateTime(balance?.createdAt)}
                </TableCell>
                <TableCell>
                  <span
                    className={`${balance?.status}OrderStatus orderStatusBtn t-capitalize`}
                  >
                    {balance?.status || "-"}
                  </span>
                </TableCell>
                <TableCell>{balance?.prevBalance.toFixed(2)}</TableCell>
                <TableCell>{balance?.newBalance.toFixed(2)}</TableCell>
              </TableRow>
            ))
          ) : (
            <>
              {isFetching && <TableLoader columns={8} />}
              {!isFetching && (
                <TableRow>
                  <TableCell colSpan="8">
                    <NoDataAvailable />
                  </TableCell>
                </TableRow>
              )}
            </>
          )}
        </TableBody>
      </Table>
      <CustomPagination
        totalPages={balanceList?.meta?.totalPage || 0}
        activePage={defaultQuery?.page || 0}
        onPageChange={(value) =>
          setDefaultQuery((prev) => ({ ...prev, page: value }))
        }
      />
    </div>
  );
};

export default BalanceList;
