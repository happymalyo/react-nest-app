import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { Bell as BellIcon } from "@phosphor-icons/react/dist/ssr/Bell";
import { Users as UsersIcon } from "@phosphor-icons/react/dist/ssr/Users";
import ArticleIcon from "@mui/icons-material/Article";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../services/authService";

const drawerWidth = 240;
export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({
  children,
}: LayoutProps): React.JSX.Element | null {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Remove the token from localStorage
    navigate("/login"); // Redirect to login page
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Box
          component="header"
          sx={{
            borderBottom: "1px solid var(--mui-palette-divider)",
            backgroundColor: "white",
            position: "sticky",
            top: 0,
            zIndex: "var(--mui-zIndex-appBar)",
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              minHeight: "64px",
              px: 2,
            }}
          >
            <Stack
              sx={{ alignItems: "center" }}
              direction="row"
              spacing={2}
            ></Stack>
            <Stack sx={{ alignItems: "center" }} direction="row" spacing={2}>
              <Tooltip title="Notifications">
                <Badge badgeContent={4} color="success" variant="dot">
                  <IconButton>
                    <BellIcon />
                  </IconButton>
                </Badge>
              </Tooltip>
              <Avatar src="/assets/avatar.png" sx={{ cursor: "pointer" }} />
              <Tooltip title="Se deconnecter">
                <IconButton onClick={handleLogout}>
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        </Box>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {["Utilisateurs", "Articles"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <Link
                to={index === 0 ? "/app/users" : "/app/articles"}
                style={{ textDecoration: "none", width: "100%" }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <UsersIcon /> : <ArticleIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
