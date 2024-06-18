import { Box, Button, Container, Stack, Typography } from "@mui/material";
import LogoCompleteImg from "../assets/logo-complete.svg";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{ width: "100vw", height: "100vh", margin: 0, padding: 0 }}
    >
      <Stack height="100%" direction="row" alignItems="stretch" spacing={0}>
        <Box
          component="aside"
          flex={1}
          sx={{ backgroundColor: "primary.main" }}
        ></Box>
        <Stack
          component="main"
          direction="row"
          flex={1}
          alignItems="center"
          justifyContent="center"
        >
          <Stack
            width="100%"
            maxWidth={400}
            height="100%"
            direction="column"
            alignSelf="center"
            alignItems="center"
            justifyContent="center"
            spacing={4}
          >
            <Box width="100%">
              <img src={LogoCompleteImg} width="100%" />
            </Box>
            <Typography variant="body1" color="GrayText">
              Uma maneira rápida de gerenciar o cardápio e os pedidos do seu
              restaurante!
            </Typography>
            <Button
              variant="contained"
              fullWidth
              onClick={() => navigate("/criar-restaurante")}
            >
              Crie seu restaurante!
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};
