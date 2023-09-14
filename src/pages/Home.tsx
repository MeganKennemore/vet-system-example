import { Box } from "@mui/material";

const Home: React.FC = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` } }}>
      HI THIS IS HOME
      {/**
       * Put whatever I think should go on the homepage here
       */}
    </Box>
  )
};

export default Home;