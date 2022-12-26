import {Alert, Box, Button, CircularProgress, TextField, Typography} from "@mui/material";
import {useCallback, useState} from "react";
import authService from "../../http/services/authService";
import styles from './Auth.module.scss';
import {useNavigate} from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [isLoading, toggleLoading] = useState(false);

  const submitHandle = useCallback(async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    toggleLoading(true);

    try {
      const userData = await authService.signIn(data.get('user-name'), data.get('password'));

      if (userData.id) {
        navigate('/', {replace: true});
      }
    } catch (error) {
      const {message} = error.response?.data;

      setError(message || error.message);
    }

    toggleLoading(false);
  }, []);

  return (
    <>
      <Typography component="h2" variant="h4">
        Sign in
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
            required
            fullWidth
            id="user-name"
            label="User name"
            name="user-name"
            autoComplete="user-name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {
            error && (
              <Alert sx={{mt: 2}} severity="error">{error}</Alert>
            )
          }
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{mt: 3}}
          >
            Sign In
          </Button>
        </div>
      </Box>
    </>
  )
};

export default SignIn;
