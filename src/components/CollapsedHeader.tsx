import { Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface CollapsedHeaderProps {
  title: string;
  onOpenClick: () => void;
}
const CollapsedHeader: React.FC<CollapsedHeaderProps> = (props) => {
  const { title, onOpenClick } = props;
  const theme = useTheme();
  let isSmallerDevice = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Paper 
      sx={{p: 2}}
      onClick={onOpenClick}
      variant={isSmallerDevice ? "outlined" : "elevation"}
    >
      <Typography
        sx={{ flex: '1 1 100%', display: "inline-flex", alignItems: "center" }}
        variant="h6"
        id={`${title}-collapsed-table-title`}
        component="div"
      >
        {title}
        <KeyboardArrowDownIcon sx={{ margin: "auto", marginLeft: 1 }} />
      </Typography>
    </Paper>
  );
};

export default CollapsedHeader;