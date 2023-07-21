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
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ width: "100%" }}
        scroll="body"
      >
        <Box
          sx={{
            backgroundColor: "#60ced2",
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2,
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
        <Box p="32px">
          <Box>
            <Typography
              fontSize="20px"
              color="#292929"
              variant="h4"
              textAlign="center"
            >
              Share group
            </Typography>
            <Typography
              fontSize="16px"
              color="#4f4f4f"
              mt="12px"
              mb="40px"
              textAlign="center"
              variant="subtitle1"
            >
              Send the link below to invite students to the group.
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "#f0f0f0",
              width: "100%",
              height: "55px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: "10px",
              p: "0px 5px 0px 15px",
            }}
          >
            <Box display="flex" alignItems="center" width="100%">
              <Button
                sx={{
                  background: "#f9f9f9",
                  color: "#000",
                  "&:hover": {
                    background: "#bebebe",
                  },
                  width: "36px",
                  height: "36px",
                  m: "0px 8px",
                }}
              >
                <Iconify icon="basil:copy-outline" width={16} height={16} />
              </Button>
              <Box ml="10px">
                <Typography>Invite link Edit</Typography>
                <Typography>flip.com/906e3999</Typography>
              </Box>
            </Box>
            <Button
              variant="contained"
              sx={{
                background: "#d1329e",
                "&:hover": {
                  background: "#c31a8b",
                },
                width: "64px",
                height: "36px",
                m: "6px 12px",
              }}
            >
              Copy
            </Button>
          </Box>
          <Box mt="20px" ml="15px">
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
                sx={{
                  fontSize: "24px",
                }}
              >
                <FormControlLabel
                  value="anyone"
                  control={
                    <Radio
                      sx={{
                        "&.Mui-checked": {
                          color: "#d1329e",
                        },
                      }}
                    />
                  }
                  label={
                    <Typography color="#292929" variant="h6">
                      Anyone with the link can join
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="one"
                  control={
                    <Radio
                      sx={{
                        "&.Mui-checked": {
                          color: "#d1329e",
                        },
                      }}
                    />
                  }
                  label={
                    <Typography color="#292929" variant="h6">
                      Only people you approve can join
                    </Typography>
                  }
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
          <Box ml="15px">
            <Typography
              variant="h6"
              fontSize="16px"
              m="0px 0px 13px"
              color="#292929"
            >
              Other ways to add students:
            </Typography>
            <Button
              variant="contained"
              startIcon={<SiGoogleclassroom />}
              sx={{
                width: "100%",
                borderRadius: "8px",
                p: "16px",
                m: "0px 0px 12px",
                color: "#292929",
                background: "#f0f0f0",
                "&:hover": {
                  background: "#b7b5b5",
                  boxShadow: "none",
                },
                fontSize: "16px",
                fontWeight: "400",
                justifyContent: "space-between",
              }}
            >
              Google Classroom
              <AiOutlineArrowRight style={{ marginLeft: "auto" }} />
            </Button>
            <Button
              startIcon={<MdOutlineMail />}
              sx={{
                width: "100%",
                borderRadius: "8px",
                p: "16px",
                m: "0px 0px 12px",
                color: "#292929",
                background: "#f0f0f0",
                "&:hover": {
                  background: "#b7b5b5",
                  boxShadow: "none",
                },
                fontSize: "16px",
                fontWeight: "400",
                justifyContent: "space-between",
              }}
            >
              Email address or domain
              <AiOutlineArrowRight
                style={{ marginLeft: "auto", backgroundColor: "#f9f9f9" }}
              />
            </Button>
            <Button
              sx={{
                textDecoration: "underline",
                color: "#292929",
                "&hover": {
                  backgroundColor: "none",
                  background: "none",
                },
              }}
            >
              By username
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
