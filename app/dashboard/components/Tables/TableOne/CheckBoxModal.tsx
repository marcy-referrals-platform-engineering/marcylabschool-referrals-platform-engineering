import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',

  boxShadow: 24,
  p: 4,
};

export default function CheckBoxModal({conditionTrue, handler} : {conditionTrue: string, handler: any}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {

    setOpen(true)
    handler()
  };
  const handleClose = () => setOpen(false);

  return (
    <div className='w-6'>
        <div
        onClick={() => handleOpen()}
                    className={`w-6 overflow-hidden relative h-6 flex items-center justify-center rounded ${
                      conditionTrue ? "bg-green-200" : "bg-red-200"
                    }`}
                  >
                    <div className='absolute'></div>
                    {conditionTrue ? (
                      <span className="text-green-600">&#10003;</span>
                    ) : (
                      <span className="text-red-600">×</span>
                    )}
                  </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}


