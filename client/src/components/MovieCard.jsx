import React from "react";
import API from "../utils/api"
import { MdDelete } from "react-icons/md"
import defaultImage from "../assets/defaultImage.jpg"

function MovieCard({ movie, movies, setMovies, image_url }) {

    const [imageUrl, setImageUrl] = React.useState(image_url)

    const handleDelete = async (id) => {
        try {
            let response = await API.delete(`/movies/${id}`);
            if (response.status === 200) {
                let tempArray = movies.filter(movie => {
                    return movie.id !== id
                })
                setMovies(tempArray);
                // setMovies(movies.filter(movie => {
                //     return movie.id !== id
                // }))
            }
        } catch (error) {
            return;
        }
    }

    const checkForErrors = () => {
        setImageUrl(defaultImage);
    }

    return (
        <>
            <div className="card" style={{ backgroundColor: "#FEE715FF" }}>
                <img src={imageUrl} onError={checkForErrors} style={{ width: "100%", height: "300px" }} className="card-img-top" alt="Movie" />
                <h5 className="card-header">{movie.name}</h5>
                <div className="card-body">
                    <p className="card-title" style={{ fontWeight: 500, fontSize: 18 }}>Year: {movie.year}</p>
                    <p className="card-text" style={{ fontWeight: 500, fontSize: 18 }}>IMDb rate: {movie.imdb_rate}</p>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <MdDelete size="2em" style={{ cursor: "pointer" }} onClick={(e) => { handleDelete(movie.id) }}></MdDelete>
                    </div>
                </div>
            </div>
        </>
    )
}




export default MovieCard;