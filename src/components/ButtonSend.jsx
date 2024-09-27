import * as React from "react"
import PropTypes from "prop-types"
import Backdrop from "@mui/material/Backdrop"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { useSpring, animated } from "@react-spring/web"
import UploadImage from "./UploadImage"
import CloseIcon from "@mui/icons-material/Close"

const Fade = React.forwardRef(function Fade(props, ref) {
  const { children, in: open, onClick, onEnter, onExited, ownerState, ...other } = props
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    config: {
      duration: open ? 200 : 50,
    },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });
  
  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  )
})

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
}

export default function ButtonSend() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Button onClick={handleOpen}>
        <button className="flex items-center space-x-2 text-white px-6 py-4" id="SendImg">
          <span className="text-base lg:text-1xl">Send</span>
          <img src="/upload.png" alt="Icon" className="w-6 h-6" />
        </button>
      </Button>

      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}>
        <Fade in={open}>
          <Box className="modal-container">
            <CloseIcon
              style={{ position: "absolute", top: "10px", right: "10px", cursor: "pointer", color: "grey" }}
              onClick={handleClose}
            />
            <Typography id="spring-modal-description" sx={{ mt: 2 }}>
              <UploadImage />
              <div className="text-white text-[0.7rem] mt-5">
                Note : Setelah upload, gambar tidak akan langsung muncul di web.
                <br />
                Perlu di acc oleh pemilik web
              </div>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}