import { useQuery } from "@tanstack/react-query";
import {
  Button,
  Popup,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "semantic-ui-react";
import { useClient } from "../../hooks/pure/useClient";
import { useDisclosure } from "../../hooks/pure/useDisclosure";
import { getFormattedDateTime } from "../../utils/helper";
import NoDataAvailable from "../common/NoDataAvailable";
import TableLoader from "../common/TableLoader";
import AddAreaModal from "./AddAreaModal";
import { FiEdit2 } from "react-icons/fi";

const AreaListPage = () => {
  const client = useClient();
  const { isOpen, onClose, setCustom } = useDisclosure();

  // const [queryFilter, setQueryFilter] = useState({
  //   page: 1,
  //   limit: 20,
  // });

  const { data: areaList, isFetching: isAreaListFetching } = useQuery({
    queryKey: ["area-list"],
    queryFn: () => client("area"),
  });

  console.log(areaList);

  return (
    <>
      <AddAreaModal onClose={onClose} open={isOpen} />
      <div className="previewLayout">
        <div className="pageHeader">
          <div className="title">
            <h5>Areas ({areaList?.length || 0})</h5>
          </div>
          <div className="action">
            <Button onClick={() => setCustom(true)} primary>
              Add Area
            </Button>
          </div>
        </div>
        <Table basic>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>#</TableHeaderCell>
              <TableHeaderCell>Area Name</TableHeaderCell>
              <TableHeaderCell>Created At</TableHeaderCell>
              <TableHeaderCell>Updated At</TableHeaderCell>
              <TableHeaderCell>Action</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {areaList?.length > 0 && !isAreaListFetching ? (
              areaList?.map((area, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="t-capitalize">
                    {area?.name || "-"}
                  </TableCell>
                  <TableCell>{getFormattedDateTime(area?.createdAt)}</TableCell>
                  <TableCell>{getFormattedDateTime(area?.updatedAt)}</TableCell>
                  <TableCell>
                    <Popup
                      size="mini"
                      position="top center"
                      content="Edit Area"
                      trigger={
                        <Button
                          icon
                          onClick={() =>
                            setCustom({
                              name: area?.name,
                              id: area?._id,
                            })
                          }
                        >
                          <FiEdit2 />
                        </Button>
                      }
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <>
                {isAreaListFetching && <TableLoader columns={4} />}
                {!isAreaListFetching && (
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
        {/* <CustomPagination
          totalPages={areaList?.meta?.totalPage || 0}
          activePage={queryFilter?.page || 0}
          onPageChange={(value) =>
            setQueryFilter((prev) => ({ ...prev, page: value }))
          }
        /> */}
      </div>
    </>
  );
};

export default AreaListPage;
