import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "semantic-ui-react";
import { useAuth } from "../../context/app/useAuth";
import { useClient } from "../../hooks/pure/useClient";
import { useDisclosure } from "../../hooks/pure/useDisclosure";
import { getFormattedDateTime } from "../../utils/helper";
import CustomPagination from "../common/CustomPagination";
import NoDataAvailable from "../common/NoDataAvailable";
import TableLoader from "../common/TableLoader";
import AddBillModal from "./AddBillModal";

const BillListPage = () => {
  const { user } = useAuth();
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
          <div className="action">
            <Button onClick={() => setCustom(true)} primary>
              Add Bill
            </Button>
          </div>
        </div>
        <Table basic>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>#</TableHeaderCell>
              <TableHeaderCell>Month Name</TableHeaderCell>
              {/* <TableHeaderCell>Price</TableHeaderCell> */}
              <TableHeaderCell>Created At</TableHeaderCell>
              <TableHeaderCell>Updated At</TableHeaderCell>
              {/* {user?.role === "admin" && (
                <TableHeaderCell>Action</TableHeaderCell>
              )} */}
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
                  {/* <TableCell>{bill?.price || "-"}</TableCell> */}

                  <TableCell>{getFormattedDateTime(bill?.createdAt)}</TableCell>
                  <TableCell>{getFormattedDateTime(bill?.updatedAt)}</TableCell>

                  {/* <TableCell>
                    <Popup
                      size="mini"
                      position="top center"
                      content="Edit Bill"
                      trigger={
                        <Button
                          icon
                          onClick={() =>
                            setCustom({
                              id: bill?._id,
                              monthName: bill?.monthName,
                              price: bill?.price,
                            })
                          }
                        >
                          <FiEdit2 />
                        </Button>
                      }
                    />
                  </TableCell> */}
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
