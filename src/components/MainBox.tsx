import { Box } from "@mui/material";

interface MainBoxProps {
  children: any;
  height?: string;
  paddingTop?: any;
};

const MainBox: React.FC<MainBoxProps> = (props) => {
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
        paddingTop: !!props.paddingTop ? props.paddingTop : {
          xs: 8,
          md: 8
        }, 
        width: { 
          xs: "100%", 
          md: `calc(100% - 240px)` 
        },
        height: !!props.height ? props.height : 'auto'
      }}
    >
      {props.children}
    </Box>
  );
};

export default MainBox;