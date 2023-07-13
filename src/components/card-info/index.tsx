// next
import Image from "next/image";

import { ImTwitter } from "react-icons/im";

// icons
import CircleIcon from "@mui/icons-material/Circle";
// mui
import { Card, Typography } from "@mui/material";
import { Stack } from "@mui/system";

export function CardInfo(): React.ReactElement {
  return (
    <>
      <Card
        sx={(theme) => ({
          minWidth: "328px",
          borderRadius: "16px",
          boxShadow: "none",
          border: "1px solid rgba(145, 158, 171, 0.24)",
          padding: "24px",
          [theme.breakpoints.down(400)]: {
            minWidth: "300px",
          },
        })}
      >
        <Stack>
          <Typography variant="subtitle2" mb="16px">
            “Tweet” Format Slides
          </Typography>
        </Stack>
        <Stack display="flex" direction="row">
          <Stack>
            <Stack
              display="flex"
              direction="row"
              alignItems="center"
              gap="10px"
            >
              <CircleIcon sx={{ fontSize: "8px" }} />
              <Typography fontWeight="400" fontSize="14px">
                Good for beginners
              </Typography>
            </Stack>

            <Stack
              display="flex"
              direction="row"
              alignItems="center"
              gap="10px"
            >
              <CircleIcon sx={{ fontSize: "8px" }} />
              <Typography fontWeight="400" fontSize="14px">
                Simple challenges
              </Typography>
            </Stack>

            <Stack
              display="flex"
              direction="row"
              alignItems="center"
              gap="10px"
            >
              <CircleIcon sx={{ fontSize: "8px" }} />
              <Typography fontWeight="400" fontSize="14px">
                Few words per slide
              </Typography>
            </Stack>
            <Stack display="flex" direction="row" gap="8px" mt="16px">
              <Image
                src="/icons/home/trendingup.png"
                alt={""}
                width="24"
                height="24"
              ></Image>
              <Typography
                variant="body2"
                fontWeight="400"
                fontSize="14px"
                color="#637381"
              >
                See example
              </Typography>
            </Stack>
            <Typography variant="h3" fontWeight="700" fontSize="32px" mt="8px">
              56
            </Typography>
          </Stack>
          <Stack
            sx={(theme) => ({
              ml: "91px",
              mt: "40px",
              [theme.breakpoints.down(400)]: {
                ml: "51px",
              },
            })}
          >
            <ImTwitter color="#00AAEC" size={44} />
          </Stack>
        </Stack>
      </Card>

      {/* card2 */}

      <Card
        sx={(theme) => ({
          minWidth: "328px",
          borderRadius: "16px",
          boxShadow: "none",
          border: "1px solid rgba(145, 158, 171, 0.24)",
          padding: "24px",
          [theme.breakpoints.down(400)]: {
            minWidth: "300px",
          },
        })}
      >
        <Stack>
          <Typography variant="subtitle2" mb="16px">
            “Page” Format Slides
          </Typography>
        </Stack>
        <Stack display="flex" direction="row">
          <Stack>
            <Stack
              display="flex"
              direction="row"
              alignItems="center"
              gap="10px"
            >
              <CircleIcon sx={{ fontSize: "8px" }} />
              <Typography fontWeight="400" fontSize="14px">
                Longer explanations
              </Typography>
            </Stack>

            <Stack
              display="flex"
              direction="row"
              alignItems="center"
              gap="10px"
            >
              <CircleIcon sx={{ fontSize: "8px" }} />
              <Typography fontWeight="400" fontSize="14px">
                Often more advanced
              </Typography>
            </Stack>

            <Stack
              display="flex"
              direction="row"
              alignItems="center"
              gap="10px"
            >
              <CircleIcon sx={{ fontSize: "8px" }} />
              <Typography fontWeight="400" fontSize="14px">
                Very simple to create
              </Typography>
            </Stack>
            <Stack display="flex" direction="row" gap="8px" mt="16px">
              <Image
                src="/icons/home/trendingup.png"
                alt={""}
                width="24"
                height="24"
              ></Image>
              <Typography
                variant="body2"
                fontWeight="400"
                fontSize="14px"
                color="#637381"
              >
                See example
              </Typography>
            </Stack>
            <Typography variant="h3" fontWeight="700" fontSize="32px" mt="8px">
              56
            </Typography>
          </Stack>
          <Stack
            sx={(theme) => ({
              ml: "91px",
              mt: "40px",
              [theme.breakpoints.down(400)]: {
                ml: "51px",
              },
            })}
          >
            <Image
              src="/icons/home/ic_doc.svg"
              width="44"
              height="44"
              alt=""
            ></Image>
          </Stack>
        </Stack>
      </Card>

      {/* card3 */}

      <Card
        sx={(theme) => ({
          minWidth: "328px",
          borderRadius: "16px",
          boxShadow: "none",
          border: "1px solid rgba(145, 158, 171, 0.24)",
          padding: "24px",
          [theme.breakpoints.down(400)]: {
            minWidth: "300px",
          },
        })}
      >
        <Stack>
          <Typography variant="subtitle2" mb="16px">
            Assignments ( GOALs )
          </Typography>
        </Stack>
        <Stack display="flex" direction="row">
          <Stack>
            <Stack
              display="flex"
              direction="row"
              alignItems="center"
              gap="10px"
            >
              <CircleIcon sx={{ fontSize: "8px" }} />
              <Typography fontWeight="400" fontSize="14px">
                Single page slide
              </Typography>
            </Stack>

            <Stack
              display="flex"
              direction="row"
              alignItems="center"
              gap="10px"
            >
              <CircleIcon sx={{ fontSize: "8px" }} />
              <Typography fontWeight="400" fontSize="14px">
                Instructions for completion
              </Typography>
            </Stack>

            <Stack
              display="flex"
              direction="row"
              alignItems="center"
              gap="10px"
            >
              <CircleIcon sx={{ fontSize: "8px" }} />
              <Typography fontWeight="400" fontSize="14px">
                Includes a target date
              </Typography>
            </Stack>
            <Stack
              display="flex"
              direction="row"
              alignItems="center"
              gap="10px"
            >
              <CircleIcon sx={{ fontSize: "8px" }} />
              <Typography fontWeight="400" fontSize="14px">
                Can embed external resources
              </Typography>
            </Stack>
            <Stack display="flex" direction="row" gap="8px" mt="16px">
              <Image
                src="/icons/home/trendingup.png"
                alt={""}
                width="24"
                height="24"
              ></Image>
              <Typography
                variant="body2"
                fontWeight="400"
                fontSize="14px"
                color="#637381"
              >
                See example
              </Typography>
            </Stack>
            <Typography variant="h3" fontWeight="700" fontSize="32px" mt="8px">
              56
            </Typography>
          </Stack>
          <Stack
            sx={(theme) => ({
              ml: "17px",
              mt: "40px",
              [theme.breakpoints.down(400)]: {
                ml: "10px",
              },
            })}
          >
            <Image
              src="/icons/home/ic_ruby.svg"
              width="44"
              height="44"
              alt=""
            ></Image>
          </Stack>
        </Stack>
      </Card>
    </>
  );
}
