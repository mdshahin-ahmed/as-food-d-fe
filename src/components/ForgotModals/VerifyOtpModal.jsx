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
import { verifyOtpSchema } from "../../validations/signin/signin.schema";
import AsToast from "../common/AsToast";
import { AsForm, AsInput } from "../common/form";

const VerifyOtpModal = ({
  onClose,
  open = true,
  setOtp,
  email = "",
  setPasswordCustom,
}) => {
  const client = useClient();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: joiResolver(verifyOtpSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => client("otp/verify", { data, method: "POST" }),
    onSuccess: (res) => {
      setOtp(res?.otp);
      setPasswordCustom(true);
      onClose();
      AsToast.success(
        <div className="errorToast">
          <AiOutlineCheckCircle /> &nbsp;
          <span>OTP Verified!</span>
        </div>
      );
    },
  });

  const handleSendOtp = (data) => {
    mutate({ ...data, email });
  };

  return (
    <Modal
      closeIcon
      size="tiny"
      centered={false}
      open={Boolean(open)}
      onClose={onClose}
    >
      <ModalHeader>Verify your OTP!</ModalHeader>
      <ModalContent>
        <h5 className="mb-0">OTP sent on your email please check!</h5>
        <h5 className="pb-2 mt-0">Email: {email}</h5>
        <AsForm control={control} errors={errors} size="large">
          <AsInput
            name="otp"
            required
            label="Enter your OTP"
            placeholder="Enter your OTP"
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

export default VerifyOtpModal;
