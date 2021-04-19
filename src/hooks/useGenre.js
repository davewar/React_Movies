const useGenre = (selectedGenres)=>{
          
    if (selectedGenres.length < 1) return "";

    const GenreIds = selectedGenres.map((item) => item.id);

      return GenreIds.join(',')

}

export default useGenre;