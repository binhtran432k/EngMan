import { useAppDispatch, useTypedSelector } from "@/hooks/store";
import { Modal } from "react-bootstrap";
import { closeToast, selectToast } from "./toastSlice";

function ToastModal() {
  const toast = useTypedSelector(selectToast);
  const dispatch = useAppDispatch();
  return (
    <Modal show={toast.isShow} onHide={() => dispatch(closeToast())}>
      <Modal.Header closeButton>
        <Modal.Title>{toast.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="lblModalMessage">{toast.body}</Modal.Body>
      {toast.footer && <Modal.Footer>{toast.footer}</Modal.Footer>}
    </Modal>
  );
}

export default ToastModal;
