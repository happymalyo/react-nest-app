import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { GoogleIcon, FacebookIcon, SitemarkIcon } from "../ui/CustomIcons";
import { toast } from "react-toastify";
import { register } from "../../services/authService";
import { validateEmail, validatePassword } from "../../utils/authUtils";
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

export default function SignUpCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    setEmailError(emailValidation || null);
    setPasswordError(passwordValidation || null);
    setConfirmPasswordError(
      password !== confirmPassword ? "Mot de passe doit être identique" : null
    );

    if (emailValidation || passwordValidation || password !== confirmPassword) {
      toast.error("Mot de passe ou email erroné");
      return;
    }

    try {
      setLoading(true);
      await register(email, password); // Call register function from authService
      toast.success("Inscription reussie!");
      navigate("/login"); // Redirect to login page after successful registration
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
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
        S'inscrire
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
          <FormLabel htmlFor="password">Mot de passe</FormLabel>
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
        <FormControl>
          <FormLabel htmlFor="confirmPassword">
            Confirmer le mot de passe
          </FormLabel>
          <TextField
            error={!!confirmPasswordError}
            helperText={confirmPasswordError}
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="••••••"
            autoComplete="new-password"
            required
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormControl>
        <Button type="submit" fullWidth variant="contained" disabled={loading}>
          {loading ? "Inscription en cours..." : "Sign up"}
        </Button>
        <Typography sx={{ textAlign: "center" }}>
          Vous avez déjà de compte ?{" "}
          <Button onClick={() => navigate("/login")} sx={{ cursor: "pointer" }}>
            Se connecter
          </Button>
        </Typography>
      </Box>
      <Divider>or</Divider>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert("S'inscrire avec Google")}
          startIcon={<GoogleIcon />}
        >
          S'inscrire avec Google
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert("S'inscrire avec Facebook")}
          startIcon={<FacebookIcon />}
        >
          S'inscrire avec Facebook
        </Button>
      </Box>
    </Card>
  );
}
