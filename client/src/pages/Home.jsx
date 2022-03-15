import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation/Navigation"
import MovieCard from "../components/MovieCard";
import API from "../utils/api";
import AddModal from "../components/AddModal";
import { GiFilmProjector } from "react-icons/gi"
import Fact from "../components/Fact";

function Home() {


    const [movies, setMovies] = useState([]);

    useEffect(() => {

        const getMovies = async () => {
            let response = await API.get('/movies');
            setMovies(response.data.data);
        }
        const editBackground = () => {
            document.body.style.backgroundColor = '#101820FF'
            document.body.style.overflowX = "hidden"
        }
        editBackground();
        getMovies();
    }, [])

    return (
        <>
            <Navigation></Navigation>
            <AddModal movies={movies} setMovies={setMovies}></AddModal>
            <div className="container" style={{ overflowX: "hidden", marginTop: 75 }}>
                <div className="row">
                    <div className="col">
                        <GiFilmProjector data-bs-toggle="modal" data-bs-target="#addModal" size="3em" style={{ cursor: "pointer", marginBottom: 20, color: "white" }}></GiFilmProjector>
                        <span className="text-white">Add movie</span>
                    </div>
                </div>
                <div className="row">
                    {movies && movies.length
                        ?
                        movies.map((movie) => {
                            return (
                                <div className="col-sm-12 col-md-6 col-lg-4 mb-5" key={movie.id} >
                                    <MovieCard movie={movie} movies={movies} setMovies={setMovies} image_url={movie.image_url}></MovieCard>
                                </div>
                            )
                        })
                        :
                        <div className="col-sm-12">
                            <p style={{ color: "#FEE715FF", fontSize: 20 }}>Click on film projector to add your first movie!</p>
                        </div>
                    }
                </div>
            </div>
            <Fact></Fact>
        </>
    )

}

export default Home;