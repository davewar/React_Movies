import {   Button,   createMuiTheme,  Tab,  Tabs,   TextField,   ThemeProvider, makeStyles } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useEffect, useState, useRef } from "react";
import CustomPagination from "../Components/CustomPagination";
import SingleContent from "../Components/SingleContent";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const useStyles = makeStyles({

    toolbar:{
        
        position: "fixed",
        right: 15,
        top: 20,
        background: 'black',        
        color: 'white',
        zIndex: 100,
    },
})

const Search = () => {

        const [data, setData] = useState([]);
        const [loading, setLoading] = useState(true)
        const [error, setError] = useState("")
        const [page, setPage] = useState(1);
        const [numOfPages, setNumOfPages] = useState();
        const [type, setType] = useState(0);
        const [searchText, setSearchText] = useState("");
        const isMounted = useRef(false);
        const end = useRef(null)
        const classes = useStyles()  

        const darkTheme = createMuiTheme({
            palette: {
            type: "dark",
            primary: {
                main: "#fff",
            },
            },
        });

        //getData
    const fetchData = async ()=>{

              if(!setSearchText){
                setData([])
                setError(false)
                return
              }

              // reset - if selecting a lot genres, there are no items then when unclicking gentres we need to reset error message
            setError(false)

            try{

                 const res = await fetch(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
          process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`)
             
             
                 if(res.status=== 422){ 
                        
                        setData([])
                         setLoading(false)

                  } else if(res.status >=200 && res.status <=299){

                            const resData = await res.json()
                            // console.log(resData);
                            //err
                            if(resData.results.length === 0){

                                setError(true)
                                setLoading(false)
                                setData([])
                                
                                return

                            }
                            // all gd
                            // console.log(resData)
                            setData(resData.results)
                            setNumOfPages(resData.total_pages)
                            setLoading(false) 

                } else{

                     setError(true)
                     setLoading(false)
                   

                        
                 }   


            }catch(err){
                 console.log(err.message);
                setError(true)
                setLoading(false)

            }

        }


    //scroll to navigation page area
        const endOfPage = ()=> {

             end.current.scrollIntoView({
                behavior: "smooth"                
            })

        }




  useEffect(() => {

    window.scroll(0, 0);

    if(!data && !searchText){
       isMounted.current = false;
    }


     if(isMounted.current){
         fetchData()
     }else{
       isMounted.current = true;
       setLoading(false)
     }
    
     return ()=> setData([])
    // eslint-disable-next-line
  }, [type, page]);

  

  return (
    <div>
      
         <span className="pageTitle">Search</span>

      <ThemeProvider theme={darkTheme}>
        <div className="search">
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Search"
            variant="filled"
            onChange={(e) => {
                setError("");
               setSearchText(e.target.value)
            }}
          />
          <Button
            onClick={()=>{

                setError("")
                setData([])
              
              if(!searchText){
                return 
              }             
              fetchData()

            }}
            variant="contained"
            style={{ marginLeft: 10 }}
          >
            <SearchIcon fontSize="large" />
          </Button>
        </div>
        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          style={{ paddingBottom: 5 }}
          aria-label="disabled tabs example"
        >
          <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search TV Series" />
        </Tabs>
        
      </ThemeProvider>
      
      <div style={style__trending}>

          {
            loading && <div>Loading .... </div>
          }

          {
            numOfPages > 1 && (

                <Button className={classes.toolbar} variant="contained" color="default" onClick={endOfPage}
              >

                      <ArrowDownwardIcon />

                </Button>

            )

          }




          {data &&
            data.map((c) => (
              <SingleContent
                key={c.id}
                id={c.id}
                poster={c.poster_path}
                title={c.title || c.name}
                date={c.first_air_date || c.release_date}
                media_type={type ? "tv" : "movie"}
                vote_average={c.vote_average}
              />
            ))}
          {(searchText && error ) ?
            (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>): null}

      </div>

      { (numOfPages > 1 && searchText && data) ? (

        <>

          <div ref={end}></div>
          <CustomPagination setPage={setPage} numOfPages={numOfPages} />

        </>
      ): null}

    </div>
  );
};

export default Search;

const style__trending = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
}
