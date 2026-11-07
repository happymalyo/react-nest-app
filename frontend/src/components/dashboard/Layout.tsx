import * as React from "react";
import { AppBar, Avatar, Badge, Box, BottomNavigation, BottomNavigationAction, CssBaseline, Divider, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Stack, Toolbar, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Article, BarChart, ChatBubbleOutline, ForumOutlined, HomeOutlined, Logout, Menu, NotificationsOutlined, PersonOutline, WorkOutline } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";
import InstallPrompt from "../pwa/InstallPrompt";

const drawerWidth = 264;
const primaryNavigation = [
  { label: "Home", path: "/", icon: <HomeOutlined /> },
  { label: "Discussions", path: "/app/discussions", icon: <ForumOutlined /> },
  { label: "Jobs", path: "/app/jobs", icon: <WorkOutline /> },
  { label: "Salaries", path: "/app/salaries", icon: <BarChart /> },
  { label: "Messages", path: "/app/messages", icon: <ChatBubbleOutline /> },
  { label: "Profile", path: "/app/profile", icon: <PersonOutline /> },
];
const managementNavigation = [
  { label: "Articles", path: "/app/articles", icon: <Article /> },
  { label: "Users", path: "/app/users", icon: <PersonOutline /> },
];

export interface LayoutProps { children: React.ReactNode }

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileDrawerOpen, setMobileDrawerOpen] = React.useState(false);
  const navigateTo = (path: string) => { navigate(path); setMobileDrawerOpen(false); };

  const navigationList = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Toolbar sx={{ minHeight: "72px !important", gap: 1.25 }}>
        <Box className="brand-mark" aria-hidden="true">S</Box>
        <Typography variant="h5" fontWeight={800} color="primary.main">Sckoob</Typography>
      </Toolbar>
      <Divider />
      <List sx={{ px: 1.5, py: 2 }}>
        {primaryNavigation.map((item) => <ListItemButton key={item.path} selected={location.pathname === item.path} onClick={() => navigateTo(item.path)} sx={{ borderRadius: 2, mb: 0.5, minHeight: 48 }}><ListItemIcon sx={{ minWidth: 42 }}>{item.icon}</ListItemIcon><ListItemText primary={item.label} /></ListItemButton>)}
      </List>
      <Divider sx={{ mx: 2 }} />
      <Typography variant="overline" color="text.secondary" sx={{ px: 3, pt: 2 }}>Manage</Typography>
      <List sx={{ px: 1.5 }}>
        {managementNavigation.map((item) => <ListItemButton key={item.path} selected={location.pathname.startsWith(item.path)} onClick={() => navigateTo(item.path)} sx={{ borderRadius: 2 }}><ListItemIcon sx={{ minWidth: 42 }}>{item.icon}</ListItemIcon><ListItemText primary={item.label} /></ListItemButton>)}
      </List>
    </Box>
  );
  const currentItem = [...primaryNavigation, ...managementNavigation].find(({ path }) => path === "/" ? location.pathname === "/" : location.pathname.startsWith(path));

  return <Box sx={{ display: "flex", minHeight: "100dvh", bgcolor: "#f6f8fb" }}>
    <CssBaseline />
    <AppBar position="fixed" color="inherit" elevation={0} sx={{ width: { md: `calc(100% - ${drawerWidth}px)` }, ml: { md: `${drawerWidth}px` }, borderBottom: "1px solid", borderColor: "divider" }}>
      <Toolbar sx={{ minHeight: "72px !important", px: { xs: 2, sm: 3 } }}>
        {!isDesktop && <IconButton edge="start" onClick={() => setMobileDrawerOpen(true)} aria-label="Open navigation"><Menu /></IconButton>}
        <Typography variant="h6" fontWeight={700} sx={{ ml: isDesktop ? 0 : 1 }}>{currentItem?.label ?? "Sckoob"}</Typography>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ ml: "auto" }}>
          <Tooltip title="Notifications"><IconButton aria-label="Notifications"><Badge variant="dot" color="primary"><NotificationsOutlined /></Badge></IconButton></Tooltip>
          <Avatar sx={{ width: 34, height: 34, bgcolor: "primary.main" }}>S</Avatar>
          <Tooltip title="Log out"><IconButton aria-label="Log out" onClick={() => { logout(); navigate("/login"); }}><Logout /></IconButton></Tooltip>
        </Stack>
      </Toolbar>
    </AppBar>
    <Drawer variant="permanent" open sx={{ display: { xs: "none", md: "block" }, width: drawerWidth, "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" } }}>{navigationList}</Drawer>
    <Drawer variant="temporary" open={mobileDrawerOpen} onClose={() => setMobileDrawerOpen(false)} ModalProps={{ keepMounted: true }} sx={{ display: { xs: "block", md: "none" }, "& .MuiDrawer-paper": { width: drawerWidth } }}>{navigationList}</Drawer>
    <Box component="main" sx={{ flexGrow: 1, width: { md: `calc(100% - ${drawerWidth}px)` }, pt: "72px", pb: { xs: "calc(78px + env(safe-area-inset-bottom))", md: 3 } }}><Box sx={{ width: "100%", maxWidth: 1280, mx: "auto", p: { xs: 2, sm: 3 } }}>{children}</Box></Box>
    {!isDesktop && <BottomNavigation showLabels value={primaryNavigation.findIndex(({ path }) => path === location.pathname)} onChange={(_, index) => navigate(primaryNavigation[index].path)} sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: theme.zIndex.appBar, height: "calc(64px + env(safe-area-inset-bottom))", pb: "env(safe-area-inset-bottom)", borderTop: "1px solid", borderColor: "divider" }}>{primaryNavigation.slice(0, 5).map((item) => <BottomNavigationAction key={item.path} label={item.label} icon={item.icon} />)}</BottomNavigation>}
    <InstallPrompt />
  </Box>;
}
