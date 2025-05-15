import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import AsToast from "./AsToast";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useMutation } from "@tanstack/react-query";
import {
  Button,
  Modal,
  ModalActions,
  ModalContent,
  ModalHeader,
} from "semantic-ui-react";
import { AsForm, AsInput } from "./form";
import { useClient } from "../../hooks/pure/useClient";
import { changePasswordSchema } from "../../validations/signin/signin.schema";

const ChangePasswordModal = ({ onClose, open = true }) => {
  const client = useClient();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: joiResolver(changePasswordSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data) =>
      client("auth/change-password", { data, method: "POST" }),
    onSuccess: () => {
      //   queryClient.refetchQueries({
      //     queryKey: ["statement-recharge"],
      //     type: "active",
      //   });
      onClose();
      AsToast.success(
        <div className="errorToast">
          <AiOutlineCheckCircle /> &nbsp;
          <span>Password Changed Successfully!</span>
        </div>
      );
    },
  });

  const handleAddBalance = (data) => {
    delete data.confirmPass;
    mutate(data);
  };

  return (
    <Modal
      closeIcon
      size="tiny"
      centered={false}
      open={Boolean(open)}
      onClose={onClose}
    >
      <ModalHeader>You want to change password?</ModalHeader>
      <ModalContent>
        <AsForm control={control} errors={errors} size="large">
          <AsInput
            name="oldPass"
            required
            label="Old Password"
            placeholder="Enter Your Old Password"
            mobile={16}
            computer={16}
          />
          <AsInput
            name="newPass"
            required
            label="New Password"
            placeholder="Enter Your New Password"
            mobile={16}
            computer={16}
          />
          <AsInput
            name="confirmPass"
            required
            label="Confirm Password"
            placeholder="Enter Confirm Password"
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
          onClick={handleSubmit(handleAddBalance)}
          color="primary"
        >
          Change
        </Button>
      </ModalActions>
    </Modal>
  );
};

export default ChangePasswordModal;
