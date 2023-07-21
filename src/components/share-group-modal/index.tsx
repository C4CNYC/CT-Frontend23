import { useState } from "react";

import { AiOutlineArrowRight } from "react-icons/ai";
import { MdOutlineMail } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";

import {
  Box,
  Button,
  Dialog,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

import { Iconify } from "../iconify";

interface Prop {
  children: React.ReactElement;
}
export default function ShareGroupModal({
  children,
}: Prop): React.ReactElement {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = useState("anyone");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
  return (
    <>
      <div onClick={handleOpen}>{children}</div>
      <Dialog open={open} onClose={handleClose} sx={{borderRadius: "20px"}}>
        <Box>
          <Box
            sx={{
              backgroundColor: "#60ced2",
              minHeight: "350px",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
              p: 1,
            }}
          >
            <Box display="flex" justifyContent="end" alignItems="center">
              <IconButton
                sx={{
                  color: "white",
                }}
              >
                <Iconify icon="prime:qrcode" width={24} height={24} />
              </IconButton>
              <IconButton onClick={handleClose} sx={{ color: "white" }}>
                <Iconify icon="jam:close-rectangle-f" width={24} height={24} />
              </IconButton>
            </Box>
            <Typography mt="80px" ml="40px" variant="h1" color="white">
              Test
            </Typography>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              mt="20px"
            >
              Share group
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Send the link below to invite students to the group.
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "#f0f0f0",
              width: "400px",
              height: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 3,
              borderRadius: "10px",
              p: "0px 5px 0px 15px",
              ml: 12,
            }}
          >
            <Box display="flex" alignItems="center">
              <IconButton>
                <Iconify icon="basil:copy-outline" width={24} height={24} />
              </IconButton>
              <Box ml="10px">
                <Typography>Invite link Edit</Typography>
                <Typography>flip.com/906e3999</Typography>
              </Box>
            </Box>
            <Button
              variant="contained"
              sx={{
                mr: "8px",
              }}
            >
              Copy
            </Button>
          </Box>
          <Box mt="20px" ml={12}>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="anyone"
                  control={<Radio />}
                  label="Anyone with the link can join"
                  sx={{
                    fontSize: "24px",
                  }}
                />
                <FormControlLabel
                  value="one"
                  control={<Radio />}
                  label="Only people you approve can join"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          <Divider
            variant="middle"
            orientation="horizontal"
            sx={{
              mt: "10px",
              mb: "10px",
              background: "#E6F5FD",
              borderRightWidth: "4px",
              borderRadius: 2,
            }}
          />
          <Box ml={12}>
            <Typography variant="h5">Other ways to add students:</Typography>
            <Button
              startIcon={<SiGoogleclassroom />}
              sx={{ height: "50px", mb: "10px", width: "400px", mt: "10px" }}
            >
              <Typography mr="200px">Google Classroom</Typography>
              <AiOutlineArrowRight />
            </Button>
            <Button
              startIcon={<MdOutlineMail />}
              sx={{ height: "50px", mb: "10px", width: "400px" }}
            >
              <Typography mr="150px">Email address or domain</Typography>
              <AiOutlineArrowRight />
            </Button>
            <Button>By username</Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
