import NavigationBar from "./NavigationBar";
import { Box } from "@mui/material";

const Wrapper = ({ children }) => {
  return (
    <>
      <NavigationBar />
      <Box
        sx={{
          width: "100%",
          height: "92vh",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: "linear-gradient(black, #252525)",
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default Wrapper;
