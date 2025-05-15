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
import { sendOtpSchema } from "../../validations/signin/signin.schema";
import AsToast from "../common/AsToast";
import { AsForm, AsInput } from "../common/form";

const SendOtpModal = ({ onClose, open = true, setEmail, setOtpCustom }) => {
  const client = useClient();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: joiResolver(sendOtpSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => client("otp", { data, method: "POST" }),
    onSuccess: (res) => {
      setEmail(res?.email);
      onClose();
      setOtpCustom(true);
      AsToast.success(
        <div className="errorToast">
          <AiOutlineCheckCircle /> &nbsp;
          <span>OTP Sent!</span>
        </div>
      );
    },
  });

  const handleSendOtp = (data) => {
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
      <ModalHeader>Forgot password?</ModalHeader>
      <ModalContent>
        <AsForm control={control} errors={errors} size="large">
          <AsInput
            name="email"
            required
            label="Enter your email to change password"
            placeholder="Enter your email"
            mobile={16}
            computer={16}
            type="email"
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
          Send OTP
        </Button>
      </ModalActions>
    </Modal>
  );
};

export default SendOtpModal;
