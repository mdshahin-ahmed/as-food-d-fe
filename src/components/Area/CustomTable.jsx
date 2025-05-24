import { useQuery } from "@tanstack/react-query";
import { FiEdit2 } from "react-icons/fi";
import { useClient } from "../../hooks/pure/useClient";
import { useDisclosure } from "../../hooks/pure/useDisclosure";

const data = [
  {
    id: 1,
    monthName: "May",
    price: 200,
    createdAt: "20-05-2025 8:36 pm",
    updatedAt: "20-05-2025 8:36 pm",
  },
  {
    id: 2,
    monthName: "April",
    price: 150,
    createdAt: "20-05-2025 1:00 pm",
    updatedAt: "20-05-2025 7:25 pm",
  },
  {
    id: 3,
    monthName: "March",
    price: 200,
    createdAt: "19-05-2025 10:54 pm",
    updatedAt: "19-05-2025 10:54 pm",
  },
  {
    id: 4,
    monthName: "February",
    price: 200,
    createdAt: "18-05-2025 10:43 pm",
    updatedAt: "18-05-2025 10:43 pm",
  },
  {
    id: 5,
    monthName: "January",
    price: 200,
    createdAt: "18-05-2025 10:39 pm",
    updatedAt: "18-05-2025 10:39 pm",
  },
];

const CustomTable = () => {
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
    <div>
      {/* Table view (for larger screens) */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Month Name</th>
              <th>Price</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td className="month-name">{item.monthName}</td>
                <td>{item.price}</td>
                <td>{item.createdAt}</td>
                <td>{item.updatedAt}</td>
                <td className="action-cell">
                  <button
                    className="icon-button"
                    onClick={() => console.log("Edit", item.id)}
                  >
                    <FiEdit2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card view (for mobile screens) */}
      <div className="card-view">
        {data.map((item) => (
          <div className="card" key={item.id}>
            <div className="card-row">
              <span className="card-label">#</span>
              <span className="card-value">{item.id}</span>
            </div>
            <div className="card-row">
              <span className="card-label">Month Name</span>
              <span className="card-value card-month">{item.monthName}</span>
            </div>
            <div className="card-row">
              <span className="card-label">Price</span>
              <span className="card-value">{item.price}</span>
            </div>
            <div className="card-row">
              <span className="card-label">Created At</span>
              <span className="card-value">{item.createdAt}</span>
            </div>
            <div className="card-row">
              <span className="card-label">Updated At</span>
              <span className="card-value">{item.updatedAt}</span>
            </div>
            <div className="card-row">
              <span className="card-label">Action</span>
              <span className="card-value">
                <button
                  className="icon-button"
                  onClick={() => console.log("Edit", item.id)}
                >
                  <FiEdit2 />
                </button>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomTable;
