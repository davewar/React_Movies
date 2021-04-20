import React, {useEffect, useState, useRef} from 'react'
import SingleContent from '../Components/SingleContent'
import CustomPagination from '../Components/CustomPagination'
import Genres from '../Components/Genres'
import useGenre from '../hooks/useGenre'
import { Button, makeStyles } from "@material-ui/core";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const useStyles = makeStyles({

    toolbar:{        
        position: "fixed",
        right: 15,
        top: 50,
        background: 'black',        
        color: 'white',
        zIndex: 100,
    },
})

const Movies = () => {

        
        const [data, setData] = useState([]);
        const [loading, setLoading] = useState(true)
        const [error, setError] = useState(false)
        const [page, setPage] = useState(1);
        const [numOfPages, setNumOfPages] = useState();
        const [selectedGenres, setSelectedGenres] = useState([]);
        const [genres, setGenres] = useState([]);
        const genreforURL = useGenre(selectedGenres)
        const end = useRef(null)
        const classes = useStyles()  



        //getdata
        const fetchData = async ()=>{

            // reset - if selecting a lot genres, there are no items then when unclicking gentres we need to reset error message
            setError(false)
            

            try{

                // const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`)
                
                const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`)
                                  
                
                // console.log("res,",res);

                 if(!res.ok){
                                         
                       setError(true)
                       setLoading(false)
                       alert("Issue found. Please try again")
                        

                  } else if(res.status >=200 && res.status <=299){

                            const resData = await res.json()

                            //err
                            if(resData.success === "false" || resData.results.length === 0){
                               
                                setError(true)
                                setLoading(false)
                                setData([])
                                // alert("Issue found. Please try again")
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
                    //  alert("Issue found. Please try again")

                        
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
            fetchData()         
            // eslint-disable-next-line
        }, [page, genreforURL])


        
    return (
        <>
             {
                loading && <div>Loading........</div>
            }

            <div>

                    
                 <span className="pageTitle">Genres</span>

                  <Genres 
                        type="movie"
                        selectedGenres={selectedGenres}
                        setSelectedGenres={setSelectedGenres}
                        genres={genres}
                        setGenres={setGenres}
                        setPage={setPage}
                />

                {
                     numOfPages > 1 && (

                         <Button className={classes.toolbar} variant="contained" color="default" onClick={endOfPage}
                        >

                                <ArrowDownwardIcon />

                         </Button>

                     )

                }
               

                    <div style={style__trending}>

                    {
                    data && data.map((item) => (

                        <SingleContent
                            key={item.id}
                            id={item.id}
                            poster={item.poster_path}
                            title={item.title || item.name}
                            date={item.first_air_date || item.release_date}
                            media_type="movie"
                            vote_average={item.vote_average}
                        />
                    ))
                    }
                </div>

                {
                error && <div>No results found.</div>
                }

                

                {numOfPages > 1 && (

                    <>
                        <div ref={end}></div>
                        <CustomPagination setPage={setPage} page={Number(page)} numOfPages={numOfPages} />
                    </>
                 )}

                 
            </div>    


        </>
    )
}

export default Movies

const style__trending = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
}


