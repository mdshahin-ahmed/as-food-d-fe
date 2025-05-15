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
import AsToast from "./AsToast";
import { AsForm, AsInput, AsSelect } from "./form";
import { paymentMethod } from "../../constant/common.constant";
import { RechargeBalanceSchema } from "../../validations/user.schema";
import { joiResolver } from "@hookform/resolvers/joi";
import { useAuth } from "../../context/app/useAuth";

const RechargeModal = ({ onClose, open = true }) => {
  const { setUser } = useAuth();
  const client = useClient();
  const queryClient = useQueryClient();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    resolver: joiResolver(RechargeBalanceSchema),
  });

  let addAmount;

  const amount = watch("amount");
  if (amount) {
    addAmount = amount - (amount / 1000) * 15;
  }

  const { mutate, isPending } = useMutation({
    mutationFn: (data) =>
      client("statement/recharge", { data, method: "POST" }),
    onSuccess: (res) => {
      queryClient.refetchQueries({
        queryKey: ["statement-recharge"],
        type: "active",
      });
      onClose();
      AsToast.success(
        <div className="errorToast">
          <AiOutlineCheckCircle /> &nbsp;
          <span>Recharged Successfully!</span>
        </div>
      );
      setUser((prev) => ({ ...prev, balance: res?.newBalance }));
    },
  });

  const handleAddBalance = (data) => {
    mutate({ ...data, amount: addAmount, exactAmount: data?.amount });
  };

  return (
    <Modal
      closeIcon
      size="tiny"
      centered={false}
      open={Boolean(open)}
      onClose={onClose}
    >
      <ModalHeader>You want to recharge?</ModalHeader>
      <ModalContent>
        <h5 className="mb-0">
          BKash Payment: <span className="balanceCount">01303565316</span>
        </h5>
        <h5 className="mb-1 mt-1">
          BKash & Nagad Send Money:{" "}
          <span className="balanceCount">01784135726</span>
        </h5>
        <span
          className="c-red fw-bold mb-4 d-flex"
          style={{ backgroundColor: "#7767130" }}
        >
          বিঃদ্রঃ: সর্বনিম্ন ৫০ টাকা রিচার্জ করতে হবে। ট্রানজেকশন নম্বর এবং
          মোবাইল নম্বর ভুল হলে লেনদেন গ্রহণ করা হবে না এবং জরিমানাও করা হতে
          পারে।
        </span>
        <AsForm control={control} errors={errors} size="large">
          <AsSelect
            name="type"
            required
            label="Payment Method"
            placeholder="Select method"
            options={paymentMethod}
          />
          <AsInput
            name="mobile"
            required
            label="Mobile Number"
            placeholder="Enter Your Mobile Number"
            mobile={16}
            computer={16}
            type="number"
          />
          <AsInput
            name="transactionNumber"
            required
            label="Transaction Number"
            placeholder="Enter Transaction Number"
            mobile={16}
            computer={16}
          />
          <AsInput
            name="amount"
            required
            label="Amount"
            placeholder="Enter Amount"
            mobile={16}
            computer={16}
            type="number"
          />
        </AsForm>
        Amount will be added:{" "}
        <span className="headerBalanceCount"> {addAmount || 0}</span>
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
          Recharge
        </Button>
      </ModalActions>
    </Modal>
  );
};

export default RechargeModal;
