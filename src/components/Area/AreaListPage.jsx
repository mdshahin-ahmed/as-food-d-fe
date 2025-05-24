import { useQuery } from "@tanstack/react-query";
import { FiEdit2 } from "react-icons/fi";
import { Button, Loader, Popup } from "semantic-ui-react";
import { useClient } from "../../hooks/pure/useClient";
import { useDisclosure } from "../../hooks/pure/useDisclosure";
import { getFormattedDateTime } from "../../utils/helper";
import NoDataAvailable from "../common/NoDataAvailable";
import TableLoader from "../common/TableLoader";
import AddAreaModal from "./AddAreaModal";

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
          <div className="pageAction">
            <Button onClick={() => setCustom(true)} primary>
              Add Area
            </Button>
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Area Name</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {areaList?.length > 0 && !isAreaListFetching ? (
                areaList?.map((area, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="t-capitalize">{area?.name || "-"}</td>
                    <td>{getFormattedDateTime(area?.createdAt)}</td>
                    <td>{getFormattedDateTime(area?.updatedAt)}</td>
                    <td>
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
                    </td>
                  </tr>
                ))
              ) : (
                <>
                  {isAreaListFetching && <TableLoader columns={4} />}
                  {!isAreaListFetching && (
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
          {areaList?.length > 0 && !isAreaListFetching ? (
            areaList?.map((area, index) => (
              <div className="card" key={index}>
                <div className="card-row">
                  <span className="card-label">#</span>
                  <span className="card-value">{index + 1}</span>
                </div>
                <div className="card-row">
                  <span className="card-label">Name</span>
                  <span className="card-value t-capitalize">
                    {area?.name || "-"}
                  </span>
                </div>
                <div className="card-row">
                  <span className="card-label">Created At</span>
                  <span className="card-value">
                    {getFormattedDateTime(area?.createdAt)}
                  </span>
                </div>
                <div className="card-row">
                  <span className="card-label">Updated At</span>
                  <span className="card-value">
                    {getFormattedDateTime(area?.updatedAt)}
                  </span>
                </div>
                <div className="card-row">
                  <span className="card-label">Action</span>
                  <span className="card-value">
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
                  </span>
                </div>
              </div>
            ))
          ) : (
            <>
              {isAreaListFetching && <Loader active />}
              {!isAreaListFetching && (
                <div className="card">
                  <NoDataAvailable />
                </div>
              )}
            </>
          )}
        </div>

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
