import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import ForgotPassword from "./ForgotPassword";
import { GoogleIcon, FacebookIcon, SitemarkIcon } from "../ui/CustomIcons";
import { toast } from "react-toastify";
import { login } from "../../services/authService";
import { validateEmail } from "../../utils/authUtils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

export default function SignInCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emailValidation = validateEmail(email);

    if (emailValidation) setEmailError(emailValidation);
    else setEmailError(null);

    if (emailValidation) {
      toast.error("Verifier votre email ou mot de passe");
      return;
    }

    try {
      await login(email, password);
      toast.success("Authentification reussie!");
      // Redirect to /app
      navigate("/");
    } catch (error: any) {
      toast.error("Verifier votre email ou mot de passe");
    }
  };

  return (
    <Card variant="outlined">
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <SitemarkIcon />
      </Box>
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        Se connecter
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}
      >
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            error={!!emailError}
            helperText={emailError}
            id="email"
            type="email"
            name="email"
            placeholder="your@email.com"
            autoComplete="off"
            autoFocus
            required
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <FormLabel htmlFor="password">Mot de passe</FormLabel>
            <Link
              component="button"
              type="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{ alignSelf: "baseline" }}
            >
              Avez-vous oublié votre mot de passe ?
            </Link>
          </Box>
          <TextField
            error={!!passwordError}
            helperText={passwordError}
            id="password"
            type="password"
            name="password"
            placeholder="••••••"
            autoComplete="off"
            required
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <ForgotPassword open={open} handleClose={handleClose} />
        <Button type="submit" fullWidth variant="contained">
          Se connecter
        </Button>
        <Typography sx={{ textAlign: "center" }}>
          Vous n'avez pas de compte ?{" "}
          <span>
            <Button
              onClick={() => navigate("/signup")}
              sx={{ cursor: "pointer" }}
            >
              S'inscrire
            </Button>
          </span>
        </Typography>
      </Box>
      <Divider>ou</Divider>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert("Se connecter avec Google")}
          startIcon={<GoogleIcon />}
        >
          Se connecter avec Google
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert("Se connecter avec Facebook")}
          startIcon={<FacebookIcon />}
        >
          Se connecter avec Facebook
        </Button>
      </Box>
    </Card>
  );
}
