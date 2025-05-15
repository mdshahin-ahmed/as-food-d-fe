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
import { withdrawReqVSchema } from "../../validations/withdrawReq.schema";
import AsToast from "../common/AsToast";
import { AsForm, AsInput } from "../common/form";

const WithdrawReqModal = ({ onClose, open = true }) => {
  const client = useClient();
  const queryClient = useQueryClient();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      amount: "",
    },
    resolver: joiResolver(withdrawReqVSchema),
  });

  const { mutate: addUserMutate, isPending } = useMutation({
    mutationFn: (data) => client("withdraw", { data: data }),
    onSuccess: () => {
      onClose();
      queryClient.refetchQueries({
        queryKey: ["withdraw-list"],
        type: "active",
      });
      AsToast.success(
        <div className="errorToast">
          <AiOutlineCheckCircle /> &nbsp;
          <span>Withdraw Request Added Successfully!</span>
        </div>
      );
    },
  });
  const handleUserSubmit = (data) => {
    addUserMutate(data);
  };
  return (
    <Modal
      closeIcon
      size="tiny"
      centered={false}
      open={Boolean(open)}
      onClose={onClose}
    >
      <ModalHeader>You want to create withdraw request?</ModalHeader>
      <ModalContent>
        <AsForm control={control} errors={errors} size="large">
          <AsInput
            name="amount"
            required
            label="Withdraw Amount"
            placeholder="How much money do you want to withdraw?"
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
          className="mt-5"
          loading={isPending}
          disabled={isPending}
          onClick={handleSubmit(handleUserSubmit)}
          primary
        >
          Submit
        </Button>
      </ModalActions>
    </Modal>
  );
};

export default WithdrawReqModal;
