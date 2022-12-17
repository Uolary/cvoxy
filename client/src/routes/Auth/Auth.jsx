import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import classNames from "classnames";
import {useEffect, useMemo, useState} from "react";
import {Box, Paper, Typography} from "@mui/material";
import styles from './Auth.module.scss';
import SignIn from "./SignIn";

const theme = createTheme();

const Auth = () => {
  const bgClassList = useMemo(() => [styles.bg1, styles.bg2, styles.bg3, styles.bg4], []);
  const [indexBgClass, setIndexBgClass] = useState(0);

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

    return () => clearInterval(intervalChangeBg);
  }, [bgClassList]);

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          className={classNames(styles.authWrap, bgClassList[indexBgClass])}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            className={styles.authContent}
          >
            <Typography component="h1" variant="h3">
              Cvoxy
            </Typography>
            <SignIn />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Auth;
