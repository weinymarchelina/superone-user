import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  IconButton,
  Button,
  Typography,
} from "@mui/material";

const links = ["Store", "Favorite", "Cart", "Transaction", "Account"];

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  // const [anchorElNav, setAnchorElNav] = useState(null);

  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };

  return (
    <AppBar
      className="nav-container"
      sx={{ px: 2, zIndex: 100 }}
      position="static"
      style={{ position: "fixed" }}
    >
      <Container maxWidth="xxl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            LOGO
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              alignItems: "center",
            }}
          >
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              LOGO
            </Box>

            {session && (
              <Box>
                <IconButton
                  size="large"
                  onClick={() => router.push("/cart")}
                  color="inherit"
                >
                  <ShoppingCartIcon />
                </IconButton>
                <IconButton
                  size="large"
                  // onClick={() => router.push("/whatsapp")}
                  color="inherit"
                >
                  <a href="https://wa.me/message/PHWP2UJ7Q6PKL1">
                    <img src="/whatsapp-icon.svg" style={{ width: "22px" }} />
                  </a>
                </IconButton>
              </Box>
            )}
          </Box>

          {session && (
            <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
              {links.map((link) => (
                <Typography
                  variant="text"
                  sx={{ paddingLeft: 2, letterSpacing: "1px" }}
                  key={link}
                >
                  <Link href={`/${link.toLowerCase()}`}>
                    {link.toUpperCase()}
                  </Link>
                </Typography>
              ))}
              <Typography
                variant="text"
                sx={{ paddingLeft: 2, letterSpacing: "1px" }}
                key="whatsapp"
              >
                <a href="https://wa.me/message/PHWP2UJ7Q6PKL1">WHATSAPP</a>
              </Typography>
            </Box>
          )}

          {!session && (
            <>
              <Button
                onClick={() => {
                  signIn(null, {
                    callbackUrl: `${window.location.origin}/store`,
                  });
                }}
                variant="outlined"
                color="secondary"
                sx={{ ml: 2 }}
              >
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
