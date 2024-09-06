import { Box, Button, IconButton, useTheme } from "@mui/material";
import {
  GithubIcon,
  GolangIcon,
  HeartIcon,
  ReactjsIcon,
} from "../assets/icons";

function Footer() {
  const theme = useTheme();

  const handleOpenUrl = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "0px",
        left: "0px",
        backgroundColor: theme.palette.primary.main,
        width: "100%",
        height: "50px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <Box>Made with</Box>
        <IconButton
          onClick={() => {
            handleOpenUrl("https://en.wikipedia.org/wiki/Love");
          }}
        >
          <HeartIcon
            style={{
              fill: theme.palette.secondary.main,
              height: "20px",
            }}
          />
        </IconButton>
        <Box>by</Box>
        <Button
          onClick={() => {
            handleOpenUrl("https://github.com/pooulad");
          }}
          sx={{
            color: theme.palette.text.primary,
            textDecoration: "underline",
          }}
        >
          Pooulad
        </Button>
        <Box>with</Box>
        <IconButton
          onClick={() => {
            handleOpenUrl("https://go.dev/");
          }}
        >
          <GolangIcon
            style={{
              fill: theme.palette.secondary.main,
              height: "20px",
            }}
          />
        </IconButton>
        <Box>and</Box>
        <IconButton
          onClick={() => {
            handleOpenUrl("https://react.dev/");
          }}
        >
          <ReactjsIcon
            style={{
              fill: theme.palette.secondary.main,
              height: "20px",
            }}
          />
        </IconButton>
      </Box>
      <IconButton
        onClick={() => {
          handleOpenUrl("https://github.com/pooulad/infomosaic");
        }}
      >
        <GithubIcon
          style={{
            fill: theme.palette.secondary.main,
            height: "30px",
          }}
        />
      </IconButton>
    </Box>
  );
}

export default Footer;
