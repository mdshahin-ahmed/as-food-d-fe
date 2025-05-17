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
import { useEffect } from "react";

const AddBillModal = ({ onClose, open = true }) => {
  const { id, monthName, price } = open;

  const client = useClient();
  const queryClient = useQueryClient();
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      monthName: "",
      price: 200,
    },
    resolver: joiResolver(billSchema),
  });

  useEffect(() => {
    if (monthName && price) {
      reset({ monthName, price });
    } else {
      reset({ monthName: "", price: 200 });
    }
  }, [open]);

  const { mutate: addBillMutate, isPending } = useMutation({
    mutationFn: (data) => client("bill", { data: data }),
    onSuccess: () => {
      onClose();
      queryClient.refetchQueries({
        queryKey: ["bill-list"],
        type: "active",
      });
      AsToast.success(
        <div className="errorToast">
          <AiOutlineCheckCircle /> &nbsp;
          <span>Bill Added</span>
        </div>
      );
    },
  });
  const { mutate: updateBillMutate, isPending: isPendingUpdate } = useMutation({
    mutationFn: (data) => client(`bill/${id}`, { data: data, method: "PATCH" }),
    onSuccess: () => {
      onClose();
      queryClient.refetchQueries({
        queryKey: ["bill-list"],
        type: "active",
      });
      AsToast.success(
        <div className="errorToast">
          <AiOutlineCheckCircle /> &nbsp;
          <span>Bill Updated</span>
        </div>
      );
    },
  });

  const handleUserSubmit = (data) => {
    if (id) {
      updateBillMutate(data);
    } else {
      addBillMutate(data);
    }
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
          loading={isPending || isPendingUpdate}
          disabled={isPending || isPendingUpdate}
          onClick={handleSubmit(handleUserSubmit)}
          primary
        >
          {id ? "Update" : "Create"}
        </Button>
      </ModalActions>
    </Modal>
  );
};

export default AddBillModal;
