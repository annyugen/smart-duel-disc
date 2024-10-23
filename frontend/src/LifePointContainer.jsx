import { withStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LifePointCalculator from './LifePointCalculator';


const styles = theme => ({
    root: {
      flexGrow: 1
    }
  });
  

function LifePointContainer({ playerName, lifePoint, setLifePoint }) {
    return (
      <Card sx={{ minWidth: 350 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {playerName}
          </Typography>
          <Typography variant="h1">
            {lifePoint}
          </Typography>
        </CardContent>
        <LifePointCalculator currentLifePoint={lifePoint} setLifePoint={setLifePoint}/>
      </Card>
    );
  }
  
  export default withStyles(styles)(LifePointContainer); 