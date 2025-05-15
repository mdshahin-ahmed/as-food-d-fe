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
import {
  mealNameOptions,
  orderTypeOptions,
} from "../../constant/common.constant";
import { useClient } from "../../hooks/pure/useClient";
import { cancelReqVSchema } from "../../validations/cancelReq.schema";
import AsToast from "../common/AsToast";
import { AsForm, AsSelect, AsTextArea } from "../common/form";

const AddBillModal = ({ onClose, open = true }) => {
  const client = useClient();
  const queryClient = useQueryClient();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      mealName: "",
      mealType: "",
      reason: "",
    },
    resolver: joiResolver(cancelReqVSchema),
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
      <ModalHeader>You want to create cancel request?</ModalHeader>
      <ModalContent>
        <h5 className="mb-0" style={{ color: "blue" }}>
          অর্ডার বাতিল করার সময়সূচি
        </h5>
        <h5 className="mb-1 mt-1">সকাল: সকাল ৭:00 টা</h5>
        <h5 className="mb-1 mt-1">দুপুর: সকাল ১০:০০ টা</h5>
        <h5 className="mb-1 mt-1">রাত: বিকেল ২:০০ টা</h5>
        <span
          className="c-red fw-bold mb-4 d-flex"
          style={{ backgroundColor: "#7767130" }}
        >
          বিঃদ্রঃ: উপরোক্ত সময়ের মধ্যে Cancel Request পাঠালে টাকা ফেরত দেওয়া হবে
          অন্যথায় খাবার বিক্রি হলে টাকা ফেরত দেওয়া হবে।
        </span>

        <AsForm control={control} errors={errors} size="large">
          <AsSelect
            name="mealType"
            required
            label="Meal Type"
            placeholder="Select Meal Type"
            options={orderTypeOptions || []}
            mobile={16}
            computer={16}
          />
          <AsSelect
            name="mealName"
            required
            label="Meal Name"
            placeholder="Select Meal Name"
            options={mealNameOptions || []}
            mobile={16}
            computer={16}
          />
          <AsTextArea
            maxLength={100}
            name="reason"
            required
            label="Cancel Reason"
            placeholder="Please provide a valid reason"
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

export default AddBillModal;
