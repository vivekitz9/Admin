import { Box, CardContent, Card } from "@mui/material";
import indexStyle from "../../styles/Index/indexStyle";
import UserSummary from "./UserSummary";
import { PieChart, BarChart } from "@mui/x-charts";

const Index = () => {
  const data = [
    { id: 0, value: 10, label: "series A" },
    { id: 1, value: 15, label: "series B" },
    { id: 2, value: 20, label: "series C" },
  ];
  return (
    <Box sx={indexStyle.mainContainer}>
      <UserSummary />
      <Box sx={indexStyle.graphContainer}>
        <Card /* sx={{ margin: "auto", width: "95.5%" }} */>
          <CardContent>
            <PieChart series={[{ data }]} width={500} height={350} />
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <BarChart
              xAxis={[
                { scaleType: "band", data: ["group A", "group B", "group C"] },
              ]}
              series={[
                { data: [4, 3, 5] },
                { data: [1, 6, 3] },
                { data: [2, 5, 6] },
              ]}
              width={600}
              height={400}
            />
          </CardContent>
        </Card>
      </Box>
      <Box>
        <Card>
          <CardContent>
            <BarChart
              xAxis={[
                { scaleType: "band", data: ["group A", "group B", "group C"] },
              ]}
              series={[
                { data: [4, 3, 5] },
                { data: [1, 6, 3] },
                { data: [2, 5, 6] },
              ]}
              width={600}
              height={400}
            />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
export default Index;
