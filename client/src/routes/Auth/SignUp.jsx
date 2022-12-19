import {Alert, Box, Button, Checkbox, CircularProgress, FormControlLabel, TextField, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import {useState} from "react";
import styles from "./Auth.module.scss";
import authService from "../../http/services/authService";

const SignUp = () => {
  const [error, setError] = useState('');
  const [isLoading, toggleLoading] = useState(false);

  const submitHandle = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    toggleLoading(true);

    try {
      const userData = await authService.signUp(data.get('user-name'), data.get('email'), data.get('password'));

      console.log('userData', userData);
    } catch (error) {
      const {message} = error.response?.data;

      setError(message || error.message);
    }

    toggleLoading(false);
  }

  return (
    <>
      <Typography component="h2" variant="h4">
        Sign up
      </Typography>
      <Box
        component="form"
        sx={{mt: 1}}
        onSubmit={submitHandle}
        className={styles.signInForm}
      >
        {
          isLoading && (
            <div className={styles.preloader}>
              <CircularProgress />
            </div>
          )
        }
        <div className={isLoading ? styles.opacityHide : ''}>
          <TextField
            margin="normal"
            autoComplete="user-name"
            name="user-name"
            required
            fullWidth
            id="user-name"
            label="User name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
          />
          <Grid item xs={12} sx={{textAlign: 'left'}}>
            <FormControlLabel
              control={<Checkbox required value="allowExtraEmails" color="primary" />}
              label="I consent to the processing of personal data."
            />
          </Grid>
          {
            error && (
              <Alert sx={{mt: 2}} severity="error">{error}</Alert>
            )
          }
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            size="large"
            sx={{mt: 3}}
          >
            Sign Up
          </Button>
        </div>
      </Box>
    </>
  );
};

export default SignUp;
