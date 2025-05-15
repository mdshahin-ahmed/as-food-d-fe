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
import { useClient } from "../../hooks/pure/useClient";
import { addBalanceSchema } from "../../validations/user.schema";
import AsToast from "../common/AsToast";
import { AsForm, AsInput } from "../common/form";

const AddBalanceModal = ({ onClose, open = true }) => {
  const client = useClient();
  const queryClient = useQueryClient();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: joiResolver(addBalanceSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => client("balance", { data, method: "POST" }),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["user/all-list"],
        type: "active",
      });
      onClose();
      AsToast.success(
        <div className="errorToast">
          <AiOutlineCheckCircle /> &nbsp;
          <span>Balance Added Successfully!</span>
        </div>
      );
      // setUser((prev) => ({ ...prev, balance: res?.newBalance }));
    },
  });

  const handleAddBalance = (data) => {
    mutate({ ...data, id: open });
  };

  return (
    <Modal
      closeIcon
      size="tiny"
      centered={false}
      open={Boolean(open)}
      onClose={onClose}
    >
      <ModalHeader>You want to add balance?</ModalHeader>
      <ModalContent>
        <AsForm control={control} errors={errors} size="large">
          <AsInput
            name="amount"
            required
            label="Amount"
            placeholder="Enter amount"
            mobile={16}
            computer={16}
            type="number"
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
          onClick={handleSubmit(handleAddBalance)}
          color="primary"
        >
          Add balance
        </Button>
      </ModalActions>
    </Modal>
  );
};

export default AddBalanceModal;
