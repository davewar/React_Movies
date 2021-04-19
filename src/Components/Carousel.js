import React, {useState, useEffect} from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { img_300, noPicture } from "../config/config";
import './Carousel.css'

const handleDragStart = (e) => e.preventDefault();


const Carousel = ({ id, media_type }) => {

        const [data, setData] = useState();

        const items = data?.map((c) => (
                    <div className="carouselItem">
                    <img
                        src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
                        alt={c?.name}
                        onDragStart={handleDragStart}
                        className="carouselItem__img"
                    />
                    <b className="carouselItem__txt">{c?.name}</b>
                    </div>
                ));


                const responsive = {

                    0: {
                    items: 3,
                    },
                    512: {
                    items: 5,
                    },
                    1024: {
                    items: 7,
                    },
                };

const fetchData = async ()=>{

        try{  

            const res = await fetch(`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)

            // console.log("res,",res);               

            const resData = await res.json()                           
            // all gd
            // console.log("RESDATA",resData.cast)
            setData(resData.cast)

            }catch(err){
                console.log(err.message);
        
            }

        }



        useEffect(() => {
            fetchData();
            // eslint-disable-next-line
        }, []);

  return (
    <AliceCarousel
        mouseTracking
      infinite
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      items={items}
      autoPlay />
  );
}



export default Carousel