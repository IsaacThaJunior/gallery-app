import React from "react";
import { TextField, Grid, Button, Container } from "@mui/material";

function HouseInfoForm() {
  return (
    <Container>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              variant="outlined"
              name="address"
              // Add any necessary input properties and event handlers
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Number of Bedrooms"
              variant="outlined"
              type="number"
              name="bedrooms"
              // Add any necessary input properties and event handlers
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Price"
              variant="outlined"
              type="number"
              name="price"
              // Add any necessary input properties and event handlers
            />
          </Grid>
          {/* Add more fields for other house information here */}
        </Grid>
        <Button
          sx={{ mt: "1rem" }}
          variant="contained"
          color="primary"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default HouseInfoForm;
