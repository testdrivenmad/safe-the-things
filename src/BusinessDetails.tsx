import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";

interface BusinessDetailsProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
function BusinessDetails(props: BusinessDetailsProps) {
  const { open, setOpen } = props;
  return (
    <Dialog fullScreen open={open} onClose={() => setOpen(false)}>
      <IconButton onClick={() => setOpen(false)}>
        <Close />
      </IconButton>
    </Dialog>
  );
}

export default BusinessDetails;
