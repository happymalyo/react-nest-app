import React from "react";
import { Alert, Button, Snackbar } from "@mui/material";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}
const DISMISSED_KEY = "sckoob-install-prompt-dismissed";

export default function InstallPrompt() {
  const [installEvent, setInstallEvent] = React.useState<BeforeInstallPromptEvent | null>(null);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches || window.localStorage.getItem(DISMISSED_KEY)) return;
    const capturePrompt = (event: Event) => { event.preventDefault(); setInstallEvent(event as BeforeInstallPromptEvent); setOpen(true); };
    const installed = () => { setOpen(false); setInstallEvent(null); };
    window.addEventListener("beforeinstallprompt", capturePrompt);
    window.addEventListener("appinstalled", installed);
    return () => { window.removeEventListener("beforeinstallprompt", capturePrompt); window.removeEventListener("appinstalled", installed); };
  }, []);
  const dismiss = () => { window.localStorage.setItem(DISMISSED_KEY, new Date().toISOString()); setOpen(false); };
  const install = async () => {
    if (!installEvent) return;
    await installEvent.prompt();
    const { outcome } = await installEvent.userChoice;
    if (outcome === "dismissed") dismiss(); else setOpen(false);
    setInstallEvent(null);
  };
  return <Snackbar open={open} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} sx={{ bottom: { xs: 82, md: 24 } }}><Alert severity="info" variant="filled" onClose={dismiss} action={<Button color="inherit" size="small" onClick={install}>Install</Button>}>Install Sckoob for faster, app-like access.</Alert></Snackbar>;
}
