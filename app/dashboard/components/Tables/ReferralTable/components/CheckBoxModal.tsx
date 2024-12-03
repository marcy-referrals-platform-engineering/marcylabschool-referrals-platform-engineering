import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import ReferralService from "@/app/services/ReferralService";
import { useStore } from "@/app/state/useStore";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  borderRadius: "3px",
  p: 4,
  padding: "3rem",
};

export default function CheckBoxModal({
  conditionTrue,
  condition,
  handler,
  points,
  data,
  setUpdatedByUser
}: {
  conditionTrue: string;
  handler: any;
  condition: any;
  points: number;
  data: any;
  setUpdatedByUser: any
}) {
  const { user } = useStore();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleContinue = async () => {
    setUpdatedByUser(true); // Mark as user-initiated update
    handleClose()
    try {
      console.log(data.id, data.milestone);
      await ReferralService.updateReferralStatus(data.id, data.milestone);
      handler(); // Update the parent component's local state
    } catch (error) {
      console.error("Error updating referral status:", error);
    } 
  };
  
  return (
    <div className={` ${user?.role === 'ADMIN' && 'cursor-pointer'} w-6`}>
      <div
        onClick={() => handleOpen()}
        className={` ${user?.role === 'USER' && 'pointer-events-none '} w-6  overflow-hidden relative h-6 flex items-center justify-center  rounded ${
          conditionTrue ? "bg-green-200" : "bg-red-200"
        }`}
      >
        <div className="absolute"></div>
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
          <h1 className=" text-[2rem] text-center pb-5">ARE YOU SURE?</h1>
          <h1 className="text-[1rem]" id="modal-modal-title">
            You are attempting to mark milestone '{condition}'{" "}
            {conditionTrue ? "as incomplete" : " as complete"} for canidate{" "}
            <span className="font-medium">{data.canidate}</span>
          </h1>
          <h1 className="text-[1rem] pt-4" id="modal-modal-title">
            Doing so will{" "}
            {conditionTrue ? (
              <span>
                take{" "}
                <span className="font-bold text-red-500">{points} points</span>{" "}
                away from thier referrer,{" "}
                <span className="font-medium">{data.referrer}.</span>
              </span>
            ) : (
              <span>
                award{" "}
                <span className="text-green-500 font-bold">
                  {points} points
                </span>{" "}
                to their referrer,{" "}
                <span className="font-medium">{data.referrer}</span>{" "}
              </span>
            )}
          </h1>
          <div className="flex gap-3 pt-10 justify-center m-auto">
            <button
              className="p-2 text-[0.9rem]   text-red-500  hover:opacity-50 duration-200 rounded px-2 bg-red-100 "
              onClick={() => handleClose()}
            >
              CANCEL
            </button>
            <button
              className="p-2 text-[0.9rem] px-2 hover:opacity-50 rounded bg-green-100 text-green-500   duration-200"
              onClick={() => handleContinue()}
            >
              CONTINUE
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
