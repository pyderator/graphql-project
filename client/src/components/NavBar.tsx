import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Head from "next/head";
import React from "react";
import NextLink from "next/link";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useLogOutMutation, useUserQueryQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      width: "100%",
    },
  }),
);

export default function NavBar() {
  const classes = useStyles();
  const [{ data, fetching }] = useUserQueryQuery({
    pause: isServer,
  });
  const [{}, logout] = useLogOutMutation();
  let body = null;
  if (fetching) {
  } else if (!data?.QueryYourself?.user) {
    body = (
      <>
        <NextLink href="/login">
          <Button
            color="primary"
            variant="contained"
            className={classes.menuButton}
          >
            Login
          </Button>
        </NextLink>
        <NextLink href="/register">
          <Button
            color="primary"
            variant="contained"
            className={classes.menuButton}
          >
            Register
          </Button>
        </NextLink>
      </>
    );
  } else {
    body = (
      <>
        <NextLink href="/login">
          <Button
            color="default"
            variant="outlined"
            className={classes.menuButton}
          >
            {data.QueryYourself.user.username}
          </Button>
        </NextLink>
        <Button
          color="primary"
          variant="contained"
          className={classes.menuButton}
          onClick={async () => await logout()}
        >
          Logout
        </Button>
      </>
    );
  }
  return (
    <div>
      <Head>
        <title>App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={classes.root}>
        <AppBar position="static" color="secondary">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h5"
              className={classes.title}
              style={{ flexGrow: 1 }}
            >
              App
            </Typography>
            {body}
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
}
