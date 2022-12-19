import {Box, Button, Checkbox, FormControlLabel, TextField, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";

const SignUp = () => {
  return (
    <>
      <Typography component="h2" variant="h4">
        Sign up
      </Typography>
      <Box component="form" noValidate sx={{mt: 1}}>
        <TextField
          margin="normal"
          autoComplete="given-name"
          name="firstName"
          required
          fullWidth
          id="name"
          label="Name"
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
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label="I consent to the processing of personal data."
          />
        </Grid>
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
      </Box>
    </>
  );
};

export default SignUp;
