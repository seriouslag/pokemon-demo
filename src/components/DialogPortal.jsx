import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import React, { useEffect } from 'react';
import { BehaviorSubject } from 'rxjs';

export class DialogService {
  /** @singleton */
  static instance;
  #dialog = new BehaviorSubject(null);

  /** Creates or returns the already created singleton instance */
  static getInstance() {
    if (!DialogService.instance) {
      DialogService.instance = new DialogService();
    }

    return DialogService.instance;
  }

  /** Set dialog event */
  setDialog(event) {
    this.#dialog.next(event);
  }

  /** Gets a reference to the current dialog */
  getDialog() {
    return this.#dialog;
  }
}

/**
 * DialogPortal subscribes to events in the provided instance
 * of DialogService and updates the UI on event change
 */
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
