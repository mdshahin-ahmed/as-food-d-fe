import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { AiOutlineCheckCircle } from "react-icons/ai";
import {
  Button,
  Modal,
  ModalActions,
  ModalContent,
  ModalHeader,
} from "semantic-ui-react";
import { monthsOptions } from "../../constant/common.constant";
import { useClient } from "../../hooks/pure/useClient";
import { billSchema } from "../../validations/bill.schema";
import AsToast from "../common/AsToast";
import { AsForm, AsInput, AsSelect } from "../common/form";

const AddBillModal = ({ onClose, open = true }) => {
  const client = useClient();
  const queryClient = useQueryClient();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      monthName: "",
      price: 200,
    },
    resolver: joiResolver(billSchema),
  });

  const { mutate: addUserMutate, isPending } = useMutation({
    mutationFn: (data) => client("cancel", { data: data }),
    onSuccess: () => {
      onClose();
      queryClient.refetchQueries({
        queryKey: ["cancel-list"],
        type: "active",
      });
      AsToast.success(
        <div className="errorToast">
          <AiOutlineCheckCircle /> &nbsp;
          <span>Cancel Request Added Successfully!</span>
        </div>
      );
    },
  });

  const handleUserSubmit = (data) => {
    console.log(data);

    // addUserMutate(data);
  };
  return (
    <Modal
      closeIcon
      size="tiny"
      centered={false}
      open={Boolean(open)}
      onClose={onClose}
    >
      <ModalHeader>You want to create new bill?</ModalHeader>
      <ModalContent>
        <AsForm control={control} errors={errors} size="large">
          <AsSelect
            name="monthName"
            required
            label="Month Name"
            placeholder="Select Month"
            options={monthsOptions || []}
            mobile={16}
            computer={16}
          />
          <AsInput
            name="price"
            required
            label="Price"
            placeholder="Enter bill price"
            mobile={16}
            computer={16}
          />
        </AsForm>
      </ModalContent>
      <ModalActions>
        <Button basic onClick={onClose}>
          Cancel
        </Button>
        <Button
          loading={isPending}
          disabled={isPending}
          onClick={handleSubmit(handleUserSubmit)}
          primary
        >
          Create
        </Button>
      </ModalActions>
    </Modal>
  );
};

export default AddBillModal;
