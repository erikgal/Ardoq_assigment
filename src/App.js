import { useState, useEffect } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Container, TextField, Typography, Grid } from '@material-ui/core';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [stationStatus, setStationStatus] = useState([]);
  const [stationNames, setStationNames] = useState([])
  const [station, setStation] = useState(null)

  useEffect(() => {
    fetchData()
    const timer = setInterval(() => {
      fetchData()
    },
      60000);
      return () => clearTimeout(timer); //clean-up
  }, [])

  const fetchData = () => {
    fetch("https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json")
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            let tempLst = []
            result.data.stations.map(station => {
              return tempLst.push(station)
            })
            setStationNames(tempLst)
          },
          (error) => {
            setIsLoaded(false);
            console.log(error)
          }
        )
      fetch("https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json")
        .then(res => res.json())
        .then(
          (result) => {
            let tempLst = []
            result.data.stations.map(station => {
              return tempLst.push(station)
            })
            setStationStatus(tempLst)
          },
          (error) => {
            setIsLoaded(false);
            console.log(error)
          }
        )
        console.log("Data Updated")
  }

  const getTable = () => {
    if (station !== null && isLoaded) {
      let elID = null
      for (var i = 0; i < stationNames.length; i++) {
        if (stationNames[i].name === station) {
          elID = i
          break
        }
      }
      const id = elID
      return (
        <TableContainer component={Paper} style={{}}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>{station}</TableCell>
                <TableCell align="center">Adress</TableCell>
                <TableCell align="center">Available Bikes</TableCell>
                <TableCell align="center">Available Docks</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key={station}>
                <TableCell component="th" scope="row"></TableCell>
                <TableCell align="center">{stationNames[id].address}</TableCell>
                <TableCell align="center">{stationStatus[id].num_bikes_available}</TableCell>
                <TableCell align="center">{stationStatus[id].num_docks_available}</TableCell>
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
          options={stationNames.map(station => { return station.name })}
          getOptionLabel={(option) => option}
          style={{ width: 300, paddingBottom: 20 }}
          renderInput={(params) => <TextField {...params} label="Stations" variant="outlined" />}
          onChange={(event, newValue) => setStation(newValue)}
          defaultValue={""}
          value={station}
        />
        {getTable()}
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
