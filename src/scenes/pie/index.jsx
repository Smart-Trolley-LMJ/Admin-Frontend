import { Box } from "@mui/material";
import Header from "../../components/dashboardComponents/Header";
import PieChart from "../../components/dashboardComponents/PieChart";

const Pie = () => {
  return (
    <Box m="20px">
      <Header title="Pie Chart" subtitle="Simple Pie Chart" />
      <Box height="75vh">
        <PieChart />
      </Box>
    </Box>
  );
};

export default Pie;
