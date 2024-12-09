import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import InfinityLinkIndicator from "../base/InfinityLinkIndicator";
import { Box } from "@mui/material";

type InputParametersProps = {
  setArrivalRate: (value: string) => void;
  setServiceRate: (value: string) => void;
  arrivalRate: string;
  serviceRate: string;
  setArrivalTime: (value: string) => void;
  setServiceTime: (value: string) => void;
  arrivalTime: string;
  serviceTime: string;
  initialCutsomers?: number;
  setInitialCustomers?: (value: number) => void;
};

const InputParameters: React.FC<InputParametersProps> = ({
  setArrivalRate,
  setServiceRate,
  arrivalRate,
  serviceRate,
  setArrivalTime,
  setServiceTime,
  arrivalTime,
  serviceTime,
}) => {
  return (
    <Grid container spacing={2}>
      {/* Service Rate-Time */}
      <Grid size={{ xs: 12, sm: 6 }} container spacing={0} alignItems="center">
        {/* Service Rate-Time Infinity Link Indicator */}
        <Grid
          size={{ xs: 1 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "100%",
              justifyContent: "center",
            }}
          >
            <InfinityLinkIndicator />
          </Box>
        </Grid>
        {/* Service Rate-Time Input Fields */}
        <Grid size={{ xs: 11 }}>
          <Grid container spacing={2}>
            {/* Service Rate */}
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Service Rate (μ)"
                value={serviceRate}
                onChange={(e) => {
                  setServiceRate(e.target.value);
                  const serviceTime = 1 / parseFloat(e.target.value);
                  if (!serviceTime || isNaN(serviceTime)) {
                    setServiceTime("");
                  } else {
                    setServiceTime(serviceTime.toString());
                  }
                }}
                placeholder="Enter service rate"
                fullWidth
              />
            </Grid>

            {/* Service Time */}
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Service Time (1/μ)"
                value={serviceTime}
                onChange={(e) => {
                  setServiceTime(e.target.value);
                  const serviceRate = 1 / parseFloat(e.target.value);
                  if (!serviceRate || isNaN(serviceRate)) {
                    setServiceRate("");
                  } else {
                    setServiceRate(serviceRate.toString());
                  }
                }}
                placeholder="Enter service time"
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>{" "}
        {/* Service Rate-Time Input Fields */}
      </Grid>
      {/* Service Rate-Time And Infinity Link Indicator  */}

      {/* Arrival Rate-Time And Infinity Link Indicator */}
      <Grid size={{ xs: 12, sm: 6 }} container spacing={0} alignItems="center">
        {/* Arrival Rate-Time Infinity Link Indicator */}
        <Grid
          size={{ xs: 1 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "100%",
              justifyContent: "center",
            }}
          >
            <InfinityLinkIndicator />
          </Box>
        </Grid>

        {/* Arrival Rate-Time Input Fields */}
        <Grid size={{ xs: 11 }}>
          <Grid container spacing={2}>
            {/* Arrival Rate */}
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Arrival Rate (λ)"
                value={arrivalRate}
                onChange={(e) => {
                  setArrivalRate(e.target.value);
                  const arrivalTime = 1 / parseFloat(e.target.value);
                  if (!arrivalTime || isNaN(arrivalTime)) {
                    setArrivalTime("");
                  } else {
                    setArrivalTime(arrivalTime.toString());
                  }
                }}
                placeholder="Enter arrival rate"
                fullWidth
              />
            </Grid>

            {/* Arrival Time */}
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Arrival Time (1/λ)"
                value={arrivalTime}
                onChange={(e) => {
                  setArrivalTime(e.target.value);
                  const arrivalRate = 1 / parseFloat(e.target.value);
                  if (!arrivalRate || isNaN(arrivalRate)) {
                    setArrivalRate("");
                  } else {
                    setArrivalRate(arrivalRate.toString());
                  }
                }}
                placeholder="Enter arrival time"
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default InputParameters;
