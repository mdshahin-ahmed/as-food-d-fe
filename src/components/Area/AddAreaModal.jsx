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
import { areaSchema } from "../../validations/areaSchema";
import AsToast from "../common/AsToast";
import { AsForm, AsInput } from "../common/form";
import { useEffect } from "react";

const AddAreaModal = ({ onClose, open = true }) => {
  const { name, id } = open;
  console.log(name);

  const client = useClient();
  const queryClient = useQueryClient();
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      name: name || "",
    },
    resolver: joiResolver(areaSchema),
  });

  useEffect(() => {
    if (name) {
      reset({ name: name });
    } else {
      reset({ name: "" });
    }
  }, [name]);

  const { mutate: addAreaMutate, isPending } = useMutation({
    mutationFn: (data) => client("area", { data: data }),
    onSuccess: () => {
      onClose();
      queryClient.refetchQueries({
        queryKey: ["area-list"],
        type: "active",
      });
      AsToast.success(
        <div className="errorToast">
          <AiOutlineCheckCircle /> &nbsp;
          <span>Area Added</span>
        </div>
      );
    },
  });

  const { mutate: updateAreaMutate, isPending: isPendingUpdate } = useMutation({
    mutationFn: (data) => client(`area/${id}`, { data: data, method: "PATCH" }),
    onSuccess: () => {
      onClose();
      queryClient.refetchQueries({
        queryKey: ["area-list"],
        type: "active",
      });
      AsToast.success(
        <div className="errorToast">
          <AiOutlineCheckCircle /> &nbsp;
          <span>Area Updated</span>
        </div>
      );
    },
  });

  const handleUserSubmit = (data) => {
    if (id) {
      updateAreaMutate(data);
    } else {
      addAreaMutate(data);
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
          <AsInput
            name="name"
            required
            label="Area Name"
            placeholder="Enter area name"
            mobile={16}
            computer={16}
            maxLength={30}
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
          Create
        </Button>
      </ModalActions>
    </Modal>
  );
};

export default AddAreaModal;
