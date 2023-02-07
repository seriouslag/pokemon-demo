import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import React, { useEffect } from 'react';
import { BehaviorSubject } from 'rxjs';

export type ModalValue = string | React.ReactNode | null;

export type OpenModalEvent = {
  type: 'openModal';
  modal: ModalValue;
  title?: string;
  options?: {
    onClose?: () => void;
    ariaLabelledBy?: string;
    ariaDescribedBy?: string;
  }
}

export type CloseModalEvent = {
  type: 'closeModal';
}

export type ModalEvents = OpenModalEvent | CloseModalEvent;

export class DialogService {
  private static instance: DialogService;
  private dialog = new BehaviorSubject<ModalEvents|null>(null);

  public static getInstance(): DialogService {
    if (!DialogService.instance) {
      DialogService.instance = new DialogService();
    }

    return DialogService.instance;
  }

  public setDialog(event: ModalEvents): void {
    this.dialog.next(event);
  }

  public getDialog() {
    return this.dialog;
  }
}

export const DialogPortal: React.FC<{
  dialogService: DialogService;
}> = ({
  dialogService,
}) => {

  const [dialogEvent, setDialogEvent] = React.useState<ModalEvents|null>(null);

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
