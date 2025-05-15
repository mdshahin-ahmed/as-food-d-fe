import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "semantic-ui-react";
import { useAuth } from "../../../context/app/useAuth";
import { useClient } from "../../../hooks/pure/useClient";
import { getFormattedDateTime } from "../../../utils/helper";
import CustomPagination from "../../common/CustomPagination";
import NoDataAvailable from "../../common/NoDataAvailable";
import TableLoader from "../../common/TableLoader";
import AddBillModal from "../../Bill/AddBillModal";
import { useDisclosure } from "../../../hooks/pure/useDisclosure";

const BillListPage = () => {
  const { user } = useAuth();
  const client = useClient();
  const { isOpen, onClose, setCustom } = useDisclosure();

  const [queryFilter, setQueryFilter] = useState({
    page: 1,
    limit: 20,
  });

  const { data: billList, isFetching: isBillListFetching } = useQuery({
    queryKey: ["meal-list"],
    queryFn: () => client("meal"),
  });

  return (
    <>
      <AddBillModal onClose={onClose} open={isOpen} />
      <div className="previewLayout">
        <div className="pageHeader">
          <div className="title">
            <h5>Bills ({billList?.meta?.total || 0})</h5>
          </div>
          <div className="action">
            <Button onClick={() => setCustom(true)} primary>
              Add Bill2
            </Button>
          </div>
        </div>
        <Table basic>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>#</TableHeaderCell>
              <TableHeaderCell>Month Name</TableHeaderCell>
              <TableHeaderCell>Price</TableHeaderCell>
              <TableHeaderCell>Created At</TableHeaderCell>
              <TableHeaderCell>Updated At</TableHeaderCell>
              {user?.role === "admin" && (
                <TableHeaderCell>Action</TableHeaderCell>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {billList?.result?.length > 0 && !isBillListFetching ? (
              billList?.result?.map((cancel, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {(queryFilter?.page - 1) * queryFilter?.limit + index + 1}
                  </TableCell>
                  <TableCell className="t-capitalize">
                    {cancel?.user?.name || "-"}
                  </TableCell>
                  <TableCell>{cancel?.user?.userId || "-"}</TableCell>
                  <TableCell className="t-capitalize">
                    <Button className={cancel?.mealName}>
                      {cancel?.mealName || "-"}
                    </Button>
                  </TableCell>
                  <TableCell>{cancel?.mealType || "-"}</TableCell>
                  <TableCell>{cancel?.reason || "-"}</TableCell>
                  <TableCell>
                    <span
                      className={`${cancel?.status}OrderStatus orderStatusBtn t-capitalize`}
                    >
                      {cancel?.status || "-"}
                    </span>
                  </TableCell>
                  <TableCell>
                    {getFormattedDateTime(cancel?.createdAt)}
                  </TableCell>
                  <TableCell>
                    {getFormattedDateTime(cancel?.updatedAt)}
                  </TableCell>
                  {/* {user?.role === "admin" && (
                    <TableCell>
                      <Select
                        // disabled={cancel?.status === "approved"}
                        defaultValue={cancel?.status}
                        className="orderStatusDropdown"
                        options={cancelRequestStatus || []}
                        onChange={(e, { value }) =>
                          handleStatusChange({
                            status: value,
                            id: cancel?._id,
                          })
                        }
                      />
                    </TableCell>
                  )} */}
                </TableRow>
              ))
            ) : (
              <>
                {isBillListFetching && (
                  <TableLoader columns={user?.role === "admin" ? 9 : 8} />
                )}
                {!isBillListFetching && (
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
