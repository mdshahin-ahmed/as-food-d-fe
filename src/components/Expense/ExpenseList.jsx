// import {
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableHeader,
//   TableHeaderCell,
//   TableRow,
// } from "semantic-ui-react";
// import { useDisclosure } from "../../hooks/pure/useDisclosure";
// import CreateExpenseModal from "./CreateExpenseModal";
// import { useState } from "react";
// import { useGetQueryDataList } from "../../api/query.api";
// import TableLoader from "../common/TableLoader";
// import NoDataAvailable from "../common/NoDataAvailable";
// import CustomPagination from "../common/CustomPagination";
// import { getFormattedDateTime } from "../../utils/helper";

// const ExpenseList = () => {
//   const [defaultQuery, setDefaultQuery] = useState({
//     page: 1,
//     limit: 20,
//     // searchTerm: ,
//     // status: ["pending", "canceled"],
//   });

//   const { isOpen, onClose, setCustom } = useDisclosure();
//   const { data: expenseList = [], isFetching } = useGetQueryDataList(
//     "expense",
//     defaultQuery,
//     {
//       onSuccess: () => {},
//     }
//   );
//   return (
//     <>
//       <CreateExpenseModal onClose={onClose} open={isOpen} />
//       <div className="previewLayout">
//         <div className="d-flex jcsb">
//           <h2>Expense ({expenseList?.meta?.total || 0})</h2>
//           <Button onClick={() => setCustom(true)} className="ml-3" primary>
//             Add Expense
//           </Button>
//         </div>
//         <Table basic>
//           <TableHeader>
//             <TableRow>
//               <TableHeaderCell>#</TableHeaderCell>
//               <TableHeaderCell>Description</TableHeaderCell>
//               <TableHeaderCell>Amount</TableHeaderCell>
//               <TableHeaderCell>Created At</TableHeaderCell>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {expenseList?.result?.length > 0 && !isFetching ? (
//               expenseList?.result?.map((expense, index) => (
//                 <TableRow
//                   key={index}
//                   style={{ cursor: "pointer" }}
//                   onClick={() =>
//                     setCustom({
//                       id: expense?._id,
//                       amount: expense?.amount,
//                       description: expense?.description,
//                     })
//                   }
//                 >
//                   <TableCell>
//                     {(defaultQuery?.page - 1) * defaultQuery?.limit + index + 1}
//                   </TableCell>
//                   <TableCell className="t-capitalize">
//                     {expense?.description || "-"}
//                   </TableCell>
//                   <TableCell>{expense?.amount || "-"}</TableCell>
//                   <TableCell>
//                     {getFormattedDateTime(expense?.createdAt)}
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <>
//                 {isFetching && <TableLoader columns={4} />}
//                 {!isFetching && (
//                   <TableRow>
//                     <TableCell colSpan={4}>
//                       <NoDataAvailable />
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </>
//             )}
//           </TableBody>
//         </Table>
//         <CustomPagination
//           totalPages={expenseList?.meta?.totalPage || 0}
//           activePage={defaultQuery?.page || 0}
//           onPageChange={(value) =>
//             setDefaultQuery((prev) => ({ ...prev, page: value }))
//           }
//         />
//       </div>
//     </>
//   );
// };

// export default ExpenseList;
