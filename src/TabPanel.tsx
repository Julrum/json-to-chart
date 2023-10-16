import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

const TabPanel = ({
  children,
  value,
  index,
  ...other
}: {
  children?: ReactNode;
  index: number;
  value: number;
}) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
  >
    {value === index && (
      <Box sx={{ p: 3 }}>
        <Typography>{children}</Typography>
      </Box>
    )}
  </div>
);

export default TabPanel;
