import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
} from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";

type ConfirmDeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
};

export const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onDelete,
}: ConfirmDeleteModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose} modal>
      <DialogHeader>
        <DialogHeader>Delete Entry</DialogHeader>
        <DialogClose />
      </DialogHeader>
      <DialogContent>
        <DialogDescription>
          Are you sure you want to delete this entry? This action cannot be
          undone.
        </DialogDescription>
      </DialogContent>
      <DialogFooter>
        <Button variant="destructive" onClick={onDelete}>
          Delete
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogFooter>
    </Dialog>
  );
};
