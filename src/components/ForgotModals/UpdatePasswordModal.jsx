import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation } from "@tanstack/react-query";
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
import { updatePasswordSchema } from "../../validations/signin/signin.schema";
import AsToast from "../common/AsToast";
import { AsForm, AsInput } from "../common/form";

const UpdatePasswordModal = ({
  onClose,
  open = true,
  setOtp,
  setEmail,
  otp,
  email,
}) => {
  const client = useClient();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: joiResolver(updatePasswordSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data) =>
      client("auth/update-password", { data, method: "PATCH" }),
    onSuccess: () => {
      setOtp("");
      setEmail("");
      onClose();
      AsToast.success(
        <div className="errorToast">
          <AiOutlineCheckCircle /> &nbsp;
          <span>Password Updated!</span>
        </div>
      );
    },
  });

  const handleSendOtp = (data) => {
    delete data.confirmPass;
    mutate({ ...data, otp, email });
  };

  return (
    <Modal
      closeIcon
      size="tiny"
      centered={false}
      open={Boolean(open)}
      onClose={onClose}
    >
      <ModalHeader>Update password!</ModalHeader>
      <ModalContent>
        <AsForm control={control} errors={errors} size="large">
          <AsInput
            name="password"
            required
            label="New password"
            placeholder="Enter new password"
            mobile={16}
            computer={16}
            // type="email"
          />
          <AsInput
            name="confirmPass"
            required
            label="Confirm password"
            placeholder="Enter confirm password"
            mobile={16}
            computer={16}
            // type="email"
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
          onClick={handleSubmit(handleSendOtp)}
          color="primary"
          type="submit"
        >
          Verify OTP
        </Button>
      </ModalActions>
    </Modal>
  );
};

export default UpdatePasswordModal;
