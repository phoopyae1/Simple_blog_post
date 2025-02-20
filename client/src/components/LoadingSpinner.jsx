import { Box, CircularProgress, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { memo } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "50vh",
    gap: theme.spacing(2),
    padding: theme.spacing(2),
  },
  spinner: {
    color: theme.palette.primary.main,
  },
  message: {
    textAlign: "center",
    maxWidth: "80%",
    wordBreak: "break-word",
  },
}));

const LoadingSpinner = ({
  message = "Loading...",
  size = 60,
  thickness = 4,
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.root} role="progressbar" aria-label={message}>
      <CircularProgress
        size={size}
        thickness={thickness}
        className={classes.spinner}
      />
      <Typography
        variant="h6"
        color="textSecondary"
        className={classes.message}
      >
        {message}
      </Typography>
    </Box>
  );
};

LoadingSpinner.propTypes = {
  message: PropTypes.string,
  size: PropTypes.number,
  thickness: PropTypes.number,
};

export default memo(LoadingSpinner);
