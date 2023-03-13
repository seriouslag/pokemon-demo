import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import React, { useEffect } from 'react';
import { BehaviorSubject, Subject } from 'rxjs';

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
  /** @singleton */
  private static instance: DialogService;
  private dialog = new BehaviorSubject<ModalEvents|null>(null);

  /** Creates or returns the already created singleton instance */
  public static getInstance(): DialogService {
    if (!DialogService.instance) {
      DialogService.instance = new DialogService();
    }

    return DialogService.instance;
  }

  /** Set dialog event */
  public setDialog(event: ModalEvents): void {
    this.dialog.next(event);
  }

  /** Gets a reference to the current dialog */
  public getDialog(): Subject<ModalEvents|null> {
    return this.dialog;
  }
}

/**
 * DialogPortal subscribes to events in the provided instance
 * of DialogService and updates the UI on event change
 */
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
    // Subscribe to dialog events
    const subscription = dialogService.getDialog().subscribe((event) => {
      // Update dialog event when it changes
      setDialogEvent(event);
    });
    return () => {
      // Unsubscribe from dialog events
      subscription.unsubscribe();
    };
  }, [dialogService]);

  const onClose = () => {
    // Call onClose callback if it exists
    dialogEvent?.type === 'openModal' && dialogEvent.options?.onClose?.();
    // Sync the dialog UI state with the dialog service
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
