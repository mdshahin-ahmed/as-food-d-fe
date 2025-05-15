import React from "react";
import {
  Button,
  FormField,
  Modal,
  ModalActions,
  ModalContent,
  ModalHeader,
} from "semantic-ui-react";
import { AsForm, AsInput } from "./form";

function DeleteModal({
  open = false,
  onClose,
  onConfirm,
  isLoading = false,
  modalHeader = "Delete!!!",
  modalContent = "Are you sure you want to Delete?",
  confirmText = "Delete",
  isManual = false,
  confirm = false,
}) {
  const [inputText, setInputText] = React.useState("");
  if (!open) return null;

  return (
    <Modal
      closeIcon
      size="tiny"
      centered={false}
      open={Boolean(open)}
      onClose={onClose}
    >
      <ModalHeader>{modalHeader}</ModalHeader>
      <ModalContent>
        {!isManual && modalContent}
        {isManual && (
          <AsForm>
            <FormField>
              <label>
                To confirm, type &quot;<b>DELETE</b>&quot; in the text below
              </label>
              <AsInput
                type="text"
                value={inputText}
                onChange={(e, { value }) => setInputText(value)}
              />
            </FormField>
          </AsForm>
        )}
      </ModalContent>
      <ModalActions>
        <Button basic onClick={onClose}>
          Cancel
        </Button>
        <Button
          disabled={isLoading || (isManual && inputText !== "DELETE")}
          loading={isLoading}
          color={confirm ? "primary" : "red"}
          onClick={onConfirm}
        >
          {confirmText}
        </Button>
      </ModalActions>
    </Modal>
  );
}

export default DeleteModal;
