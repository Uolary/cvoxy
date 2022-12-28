import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import classNames from "classnames";
import {useCallback, useEffect, useMemo, useState} from "react";
import {Box, Button, Paper, Typography} from "@mui/material";
import styles from './Auth.module.scss';
import logo from './img/logo.svg';
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import {useDispatch} from "react-redux";

const theme = createTheme();

const Auth = () => {
  const dispatch = useDispatch();

  const bgClassList = useMemo(() => [styles.bg1, styles.bg2, styles.bg3, styles.bg4], []);
  const authActions = {
    signIn: 'signIn',
    signUp: 'signUp',
  };

  const [indexBgClass, setIndexBgClass] = useState(0);
  const [activeAction, setActiveAction] = useState(null);

  const onClickAction = useCallback((action) => {
    setActiveAction(action);
  }, []);

  useEffect(() => {
    const intervalChangeBg = setInterval(() => {
      setIndexBgClass((prev) => {
        if (bgClassList[prev + 1]) {
          return prev + 1;
        } else {
          return 0;
        }
      });
    }, 10000);

    // dispatch({type: 'isLoggedIn/out'});

    return () => clearInterval(intervalChangeBg);
  }, [bgClassList]);

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main">
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          className={classNames(styles.authWrap, bgClassList[indexBgClass])}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className={styles.authInner}>
          <Box
            className={styles.authContent}
          >
            <img src={logo} alt="Logo" className={styles.logo} />
            {
              !activeAction && (
                <Typography component="h3" sx={{mb: 4}}>
                  Share your skills and professional achievements.
                  Here you can structure all your experience, plans and show your achievements to your
                  colleagues and future employers.
                </Typography>
              )
            }
            {
              !activeAction && (
                <Box>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{mb: 2, mr: 1}}
                    onClick={() => onClickAction(authActions.signIn)}
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    sx={{mb: 2, ml: 1}}
                    onClick={() => onClickAction(authActions.signUp)}
                  >
                    Sign Up
                  </Button>
                </Box>
              )
            }
            {
              activeAction === authActions.signIn && (
                <>
                  <SignIn />
                  <Button
                    type="submit"
                    fullWidth
                    variant="outlined"
                    size="large"
                    sx={{mt: 1, mb: 2}}
                    onClick={() => onClickAction(null)}
                  >
                    Back
                  </Button>
                </>
              )
            }
            {
              activeAction === authActions.signUp && (
                <>
                  <SignUp />
                  <Button
                    type="submit"
                    fullWidth
                    variant="outlined"
                    size="large"
                    sx={{mt: 1, mb: 2}}
                    onClick={() => onClickAction(null)}
                  >
                    Back
                  </Button>
                </>
              )
            }
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Auth;
