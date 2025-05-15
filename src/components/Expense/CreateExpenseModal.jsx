// import {
//   Button,
//   Modal,
//   ModalActions,
//   ModalContent,
//   ModalHeader,
// } from "semantic-ui-react";
// import { AsForm, AsInput, AsTextArea } from "../common/form";
// import { useForm } from "react-hook-form";
// import { joiResolver } from "@hookform/resolvers/joi";
// import { addExpenseValidationSchema } from "../../validations/expense.schema";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useClient } from "../../hooks/pure/useClient";
// import AsToast from "../common/AsToast";
// import { AiOutlineCheckCircle } from "react-icons/ai";
// import { useEffect } from "react";

// const CreateExpenseModal = ({ onClose, open = true }) => {
//   const { id, amount, description } = open;

//   const client = useClient();
//   const queryClient = useQueryClient();
//   const {
//     control,
//     formState: { errors },
//     handleSubmit,
//     reset,
//   } = useForm({
//     defaultValues: {
//       amount: open?.amount || "",
//       description: open?.description || "",
//     },
//     resolver: joiResolver(addExpenseValidationSchema),
//   });
//   useEffect(() => {
//     if (amount && description) {
//       reset({
//         amount,
//         description,
//       });
//     } else {
//       reset({
//         amount: "",
//         description: "",
//       });
//     }
//   }, [amount, description]);

//   const { mutate: addExpenseMutate, isPending } = useMutation({
//     mutationFn: (data) => client("expense", { data: data }),
//     onSuccess: () => {
//       onClose();
//       queryClient.refetchQueries({
//         queryKey: ["expense-list"],
//         type: "active",
//       });
//       AsToast.success(
//         <div className="errorToast">
//           <AiOutlineCheckCircle /> &nbsp;
//           <span>Expense Added Successfully!</span>
//         </div>
//       );
//     },
//   });

//   const { mutate: updateExpenseMutate } = useMutation({
//     mutationFn: ({ id, data }) =>
//       client(`expense/${id}`, { method: "PATCH", data }),
//     onSuccess: () => {
//       queryClient.refetchQueries({
//         queryKey: ["expense-list"],
//         type: "active",
//       });
//       onClose();
//       AsToast.success(
//         <div className="errorToast">
//           <AiOutlineCheckCircle /> &nbsp;
//           <span>Cancel req updated successfully!</span>
//         </div>
//       );
//     },
//   });

//   const handleUserSubmit = (data) => {
//     if (id) {
//       updateExpenseMutate({ id, data });
//     } else {
//       addExpenseMutate(data);
//     }
//   };

//   return (
//     <Modal
//       closeIcon
//       size="tiny"
//       centered={false}
//       open={Boolean(open)}
//       onClose={onClose}
//     >
//       <ModalHeader>You want to create expense?</ModalHeader>
//       <ModalContent>
//         <AsForm control={control} errors={errors} size="large">
//           <AsInput
//             name="amount"
//             required
//             label="Amount"
//             placeholder="Enter total amount"
//             mobile={16}
//             computer={16}
//             type="number"
//           />
//           <AsTextArea
//             maxLength={100}
//             name="description"
//             required
//             label="Description"
//             placeholder="Please provide a description"
//             mobile={16}
//             computer={16}
//           />
//         </AsForm>
//       </ModalContent>
//       <ModalActions>
//         <Button basic onClick={onClose}>
//           Cancel
//         </Button>
//         <Button
//           className="mt-5"
//           loading={isPending}
//           disabled={isPending}
//           onClick={handleSubmit(handleUserSubmit)}
//           primary
//         >
//           {id ? "Update" : "Add"}
//         </Button>
//       </ModalActions>
//     </Modal>
//   );
// };

// export default CreateExpenseModal;
