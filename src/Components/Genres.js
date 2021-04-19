import { Chip } from "@material-ui/core";
import { useEffect } from "react";



const Genres = ({  selectedGenres,  setSelectedGenres,  genres,  setGenres,  type,  setPage,}) => {


  const handleAdd = (genre) => {
      //add the item to the selected items array
    setSelectedGenres([...selectedGenres, genre]);
    //remove the clicked item to the genres array
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleRemove = (genre) => {
      //remove the clicked item from the selected item array
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
      //add the item to the genres array
    setGenres([...genres, genre]);
    setPage(1);
  };

   const handleClear = () => {
      
      const items = [...genres, ...selectedGenres]

      const orderedItems = items.sort(function(a, b) {
              let nameA = a.name.toUpperCase(); 
              let nameB = b.name.toUpperCase(); 
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }

              return 0;
            })

        setSelectedGenres([]) 
        setGenres(orderedItems)
      
       setPage(1);
  };


      const fetchData = async ()=>{

            try{

                const res = await fetch(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
                  
                  const resData = await res.json()
                          
                  setGenres(resData.genres)
                        


            }catch(err){
                 console.log(err.message);
              
            }

        }

  useEffect(() => {

      fetchData();

      return () => { 
          setGenres([]); 
          };

      // eslint-disable-next-line
  }, []);

  return (
    <div >

        {selectedGenres.map((item) => (
        <Chip
          style={{ margin: 2 }}
          label={item.name}
          key={item.id}
          color="primary"
          clickable
          size="small"
          onDelete={() => handleRemove(item)}
        />
      ))}
     {genres.map((item) => (
        <Chip
          style={{ margin: 2 }}
          label={item.name}
          key={item.id}
          clickable
          size="small"
          onClick={() => handleAdd(item)}
        />
      ))}
      {
        selectedGenres.length > 0 &&
      
                <Chip
                  style={{ margin: 2,  }}
                  label="Clear"
                  color="secondary"
                  key="movie"
                  clickable
                  size="small"
                  onClick={() =>handleClear()}
                />

      }

    </div>
  );
};

export default Genres;
