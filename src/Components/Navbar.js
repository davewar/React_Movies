import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import MovieIcon from '@material-ui/icons/Movie';
import SearchIcon from "@material-ui/icons/Search";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    backgroundColor: 'white',
    color: 'black',
    zIndex: 100,
  },
});

const Navbar = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const history = useHistory();

  useEffect(() => {
   if (value === 0) {
      history.push("/");
    } else if (value === 1) {
      history.push("/search");
    } 
  }, [value, history]);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      
          <BottomNavigationAction
            style={{ color: "black" }}
            label="Movies"
            icon={<MovieIcon />}
          />
         
          <BottomNavigationAction
            style={{ color: "black" }}
            label="Search"
            icon={<SearchIcon />}
          />
    </BottomNavigation>
  );
}

export default Navbar;