import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button, Loader } from "semantic-ui-react";
import { useClient } from "../../hooks/pure/useClient";
import { useDisclosure } from "../../hooks/pure/useDisclosure";
import { getFormattedDateTime } from "../../utils/helper";
import CustomPagination from "../common/CustomPagination";
import NoDataAvailable from "../common/NoDataAvailable";
import TableLoader from "../common/TableLoader";
import AddBillModal from "./AddBillModal";

const BillListPage = () => {
  const client = useClient();
  const { isOpen, onClose, setCustom } = useDisclosure();

  const [queryFilter, setQueryFilter] = useState({
    page: 1,
    limit: 20,
  });

  const { data: billList, isFetching: isBillListFetching } = useQuery({
    queryKey: ["bill-list"],
    queryFn: () => client("bill"),
  });

  return (
    <>
      <AddBillModal onClose={onClose} open={isOpen} />
      <div className="previewLayout">
        <div className="pageHeader">
          <div className="title">
            <h5>Bills ({billList?.meta?.total || 0})</h5>
          </div>
          <div className="pageAction">
            <Button onClick={() => setCustom(true)} primary>
              Add Bill
            </Button>
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Month Name</th>
                <th>Created At</th>
                <th>Updated At</th>
                {/* <th>Action</th> */}
              </tr>
            </thead>
            <tbody>
              {billList?.result?.length > 0 && !isBillListFetching ? (
                billList?.result?.map((bill, index) => (
                  <tr key={index}>
                    <td>
                      {(queryFilter?.page - 1) * queryFilter?.limit + index + 1}
                    </td>
                    <td className="t-capitalize">{bill?.monthName || "-"}</td>
                    <td>{getFormattedDateTime(bill?.createdAt)}</td>
                    <td>{getFormattedDateTime(bill?.updatedAt)}</td>
                  </tr>
                ))
              ) : (
                <>
                  {isBillListFetching && <TableLoader columns={4} />}
                  {!isBillListFetching && (
                    <tr>
                      <td colSpan={4}>
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
          {billList?.result?.length > 0 && !isBillListFetching ? (
            billList?.result?.map((bill, index) => (
              <div className="card" key={index}>
                <div className="card-row">
                  <span className="card-label">#</span>
                  <span className="card-value">
                    {(queryFilter?.page - 1) * queryFilter?.limit + index + 1}
                  </span>
                </div>
                <div className="card-row">
                  <span className="card-label">Month Name</span>
                  <span className="card-value">{bill?.monthName}</span>
                </div>
                <div className="card-row">
                  <span className="card-label">Created At</span>
                  <span className="card-value">
                    {getFormattedDateTime(bill?.createdAt)}
                  </span>
                </div>
                <div className="card-row">
                  <span className="card-label">Updated At</span>
                  <span className="card-value">
                    {getFormattedDateTime(bill?.updatedAt)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <>
              {isBillListFetching && <Loader active />}
              {!isBillListFetching && (
                <div className="card">
                  <NoDataAvailable />
                </div>
              )}
            </>
          )}
        </div>

        <CustomPagination
          totalPages={billList?.meta?.totalPage || 0}
          activePage={queryFilter?.page || 0}
          onPageChange={(value) =>
            setQueryFilter((prev) => ({ ...prev, page: value }))
          }
        />
      </div>
    </>
  );
};

export default BillListPage;

{
  /* <Table basic>
  <TableHeader>
    <TableRow>
      <TableHeaderCell>#</TableHeaderCell>
      <TableHeaderCell>Month Name</TableHeaderCell>

      <TableHeaderCell>Created At</TableHeaderCell>
      <TableHeaderCell>Updated At</TableHeaderCell>
    </TableRow>
  </TableHeader>
  <TableBody>
    {billList?.result?.length > 0 && !isBillListFetching ? (
      billList?.result?.map((bill, index) => (
        <TableRow key={index}>
          <TableCell>
            {(queryFilter?.page - 1) * queryFilter?.limit + index + 1}
          </TableCell>
          <TableCell className="t-capitalize">
            {bill?.monthName || "-"}
          </TableCell>

          <TableCell>{getFormattedDateTime(bill?.createdAt)}</TableCell>
          <TableCell>{getFormattedDateTime(bill?.updatedAt)}</TableCell>
        </TableRow>
      ))
    ) : (
      <>
        {isBillListFetching && <TableLoader columns={4} />}
        {!isBillListFetching && (
          <TableRow>
            <TableCell colSpan={4}>
              <NoDataAvailable />
            </TableCell>
          </TableRow>
        )}
      </>
    )}
  </TableBody>
</Table>; */
}
