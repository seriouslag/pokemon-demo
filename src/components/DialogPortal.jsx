import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import React, { useEffect } from 'react';
import { BehaviorSubject } from 'rxjs';

export class DialogService {
  static instance;
  dialog = new BehaviorSubject(null);

  static getInstance() {
    if (!DialogService.instance) {
      DialogService.instance = new DialogService();
    }

    return DialogService.instance;
  }

  setDialog(event) {
    this.dialog.next(event);
  }

  getDialog() {
    return this.dialog;
  }
}

export const DialogPortal = ({
  dialogService,
}) => {

  const [dialogEvent, setDialogEvent] = React.useState(null);

  const isOpen = dialogEvent?.type === 'openModal';
  const title = dialogEvent?.type === 'openModal' ? dialogEvent.title : '';
  const element = dialogEvent?.type === 'openModal' ? dialogEvent.modal : null;
  const ariaLabelledBy = dialogEvent?.type === 'openModal' ? dialogEvent.options?.ariaLabelledBy : '';
  const ariaDescribedBy = dialogEvent?.type === 'openModal' ? dialogEvent.options?.ariaDescribedBy : '';


  useEffect(() => {
    const subscription = DialogService.getInstance().getDialog().subscribe((event) => {
      setDialogEvent(event);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [dialogService]);

  const onClose = () => {
    dialogEvent?.type === 'openModal' && dialogEvent.options?.onClose?.();
    dialogService.setDialog({
      type: 'closeModal',
    });
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        onClose();
      }}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{element}</DialogContent>
    </Dialog>
  );
};

export default DialogPortal;
