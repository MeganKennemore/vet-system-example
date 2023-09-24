import { Box } from "@mui/material";

const Home: React.FC = () => {
  return (
    <Box 
      component="main" 
      sx={{ 
        position: "absolute", 
        right: 0, 
        flexGrow: 1, 
        p: {
          xs: 1,
          md: 3,
        },
        paddingTop: {
          xs: 8,
          md: 8
        }, 
        width: { 
          xs: "100%", 
          md: `calc(100% - 240px)` 
        } 
      }}
    >
      HI THIS IS HOME
      {/**
       * Put whatever I think should go on the homepage here
       */}
    </Box>
  )
};

export default Home;