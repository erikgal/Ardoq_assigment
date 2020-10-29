import { useState, useEffect } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core';
import Service from "./Service";


function App() {
  const [stationStatus, setStationStatus] = useState([]);
  const [stationInfo, setStationInfo] = useState([])
  const [station, setStation] = useState({name: null})

  useEffect(() => {
    fetchData()
    const timer = setInterval(() => {
      fetchData()
    },
      60000); //The API refreshes every minute
    return () => clearTimeout(timer);
  }, [])

  const fetchData = () => {
    Service.getBikeInfo().then(result => {
      setStationInfo(result.data.stations);
    });
    Service.getBikeStatus().then(result => {
      setStationStatus(result.data.stations)
    })
    console.log("Data Updated")
  }

  const handleChange = (event, value) => {
    for(let i = 0; i < stationInfo.length; i++){
      if(stationInfo[i].name === value){
        setStation({...stationInfo[i], index: i})
        break
      }
    }
  }

  const MyTable = () => {
    if(station.name !== null){
      return (
        <TableContainer component={Paper} style={{}}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>{station.name}</TableCell>
                <TableCell align="center">Adress</TableCell>
                <TableCell align="center">Available Bikes</TableCell>
                <TableCell align="center">Available Docks</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                  <TableRow key={station.station_id}>
                    <TableCell > </TableCell>
                    <TableCell  align="center">{station.address}</TableCell>
                    <TableCell  align="center">{stationStatus[station.index].num_bikes_available}</TableCell>
                    <TableCell  align="center">{stationStatus[station.index].num_docks_available}</TableCell>
                  </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )
    }
  }

  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Choose a station you want to checkout bellow
        </Typography>

        <Autocomplete
          id="combo-box-demo"
          options={stationInfo.map(station => { return station.name })}
          getOptionLabel={(option) => option}
          style={{ width: 300, paddingBottom: 20 }}
          renderInput={(params) => <TextField {...params} label="Stations" variant="outlined" />}
          onChange={handleChange}
          defaultValue={""}
          value={station.name}
        />
        {MyTable()}
      </Grid>
    </Container>
  );
}
const useStyles = makeStyles({
  container: {
    height: "100vh",
    paddingTop: "10px",
    paddingRight: "10px",
    paddingLeft: "10px",
    background: "lightblue",
    border: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    height: "90vh",
    paddingTop: "10px",
    paddingRight: "10px",
    paddingLeft: "10px",
    background: "lightblue",
    border: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  table: {
    minWidth: 550,
  },
});

export default App;
