import React from 'react'
import Pagination from '@material-ui/lab/Pagination';
import { createMuiTheme, ThemeProvider, Typography } from "@material-ui/core";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const CustomPagination = ({page, setPage, numOfPages = 10 }) => {

    const handlePageChange = (page) => {
       
        setPage(page);
        window.scroll(0, 0);
  };

    return (
        
        <div
            style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: 10,
             }}
         >
              <ThemeProvider theme={darkTheme}>

                          <Typography>Page: {page}</Typography>
                        <Pagination
                        count={numOfPages}
                        onChange={(e) => handlePageChange(e.target.textContent)}
                            // onClick={(e) => console.log(e.target)}    
                        color="primary"
                        variant="outlined"
                        shape="rounded"
                        page={page}
                          hideNextButton
                          hidePrevButton
                          siblingCount={10}
                        boundaryCount={3}
                          
                        />
        </ThemeProvider>
        </div>

     
    )
}

export default CustomPagination
