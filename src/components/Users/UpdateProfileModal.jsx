import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FiTrash2 } from "react-icons/fi";
import {
  Button,
  FormField,
  FormInput,
  GridColumn,
  Modal,
  ModalActions,
  ModalContent,
  ModalHeader,
} from "semantic-ui-react";
import { useClient } from "../../hooks/pure/useClient";
import { imageUpload } from "../../utils/cloud-method";
import AsToast from "../common/AsToast";

const UpdateProfileModal = ({ onClose, open = true }) => {
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(false);

  const client = useClient();
  const queryClient = useQueryClient();

  const { handleSubmit } = useForm({
    defaultValues: {},
  });

  const { mutate: updateUserProfile, isPending } = useMutation({
    mutationFn: (data) => client(`user/profile`, { data, method: "PATCH" }),
    onSuccess: () => {
      onClose();
      queryClient.refetchQueries({
        queryKey: ["me"],
        type: "active",
      });
      AsToast.success(
        <div className="errorToast">
          <AiOutlineCheckCircle /> &nbsp;
          <span>Profile Picture Updated Successfully</span>
        </div>
      );
    },
  });

  const { mutate: mutationImageUpload, isPending: isImageUploadPending } =
    useMutation({
      mutationFn: imageUpload,
      onSuccess: (res) => {
        updateUserProfile({ imageUrl: res?.secure_url });
      },
      onError: () => {},
    });

  const handleAddBalance = () => {
    if (!file) {
      setFileError(true);
      return;
    }
    if (file.size > 5000000)
      return AsToast.error(
        <div className="errorToast">
          <FiTrash2 /> &nbsp;<span>File Size Must Be Less Than 5mb.</span>
        </div>
      );
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "asfood");
    formData.append("cloud_name", "diqirua3k");
    mutationImageUpload(formData);
  };

  return (
    <Modal
      closeIcon
      size="tiny"
      centered={false}
      open={Boolean(open)}
      onClose={onClose}
    >
      <ModalHeader>You want to update profile?</ModalHeader>
      <ModalContent>
        <GridColumn mobile={16} computer={8}>
          <FormField required>
            <label>Select Image</label>
            <FormInput
              className="import-file-input"
              accept="image/*"
              type="file"
              error={
                fileError && {
                  content: "Please select a image",
                }
              }
              onChange={(e) => {
                setFileError(false);
                if (e.target.files[0].size < 5000000) {
                  setFile(e.target.files[0]);
                } else {
                  AsToast.error(
                    <div className="errorToast">
                      <FiTrash2 /> &nbsp;
                      <span>File Size Must Be Less Than 5mb.</span>
                    </div>
                  );
                }
              }}
            />
          </FormField>
        </GridColumn>
      </ModalContent>
      <ModalActions>
        <Button basic onClick={onClose}>
          Cancel
        </Button>
        <Button
          loading={isImageUploadPending || isPending}
          disabled={isImageUploadPending || isPending}
          onClick={handleSubmit(handleAddBalance)}
          color="primary"
        >
          Update
        </Button>
      </ModalActions>
    </Modal>
  );
};

export default UpdateProfileModal;
