import React, { useState } from "react";
import API from "../utils/api";
import { validateRate, validateYear } from "../utils/helpers";
import { clearInputs } from "../utils/helpers";

function AddModal({ movies, setMovies }) {

    const [movieName, setMovieName] = useState(null);
    const [movieYear, setMovieYear] = useState(null);
    const [movieRate, setMovieRate] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const [error, setError] = useState(false);
    const [existanceError, setExistanceError] = useState(false);
    const [invalidError, setInvalidError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!movieName || !movieYear || !movieRate || !imageURL) {
            setInvalidError(false);
            setExistanceError(false);
            setError(true);
        } else if (!validateRate(movieRate) || !validateYear(movieYear)) {
            setInvalidError(true);
            setExistanceError(false);
            setError(false);
        } else {
            try {
                setError(false);
                setExistanceError(false)
                const response = await API.post('/movies', {
                    name: movieName,
                    year: movieYear,
                    imdb_rate: movieRate,
                    image_url: imageURL
                    // image_url: imageURL ? imageURL : ""
                })
                if (response.status === 201) {
                    if (movies && movies.length)
                        setMovies(prevMovies => [...prevMovies, response.data.data]);
                    else
                        setMovies([response.data.data]);
                }
                setError(false);
                setInvalidError(false);
                setExistanceError(false);
                clearInputs(".movie-input")
            } catch (error) {
                console.log(error);
                setError(false);
                setInvalidError(false);
                setExistanceError(true);
            }
        }


    }

    return (
        <>
            <div className="modal fade" id="addModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add movie</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {existanceError && <p style={{ color: 'red', fontWeight: 400 }}>That movie already exists</p>}
                            {error && <p style={{ color: 'red', fontWeight: 400 }}>Fill required inputs</p>}
                            {invalidError && <p style={{ color: 'red', fontWeight: 400 }}>Invalid input</p>}
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="inputMovieName" className="form-label">Name</label>
                                    <input type="text" className="form-control movie-input" id="inputMovieName" aria-describedby="emailHelp" onChange={(e) => setMovieName(e.target.value)} value={null} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="inputMovieYear" className="form-label">Year</label>
                                    <input type="text" className="form-control movie-input" id="inputMovieYear" onChange={(e) => setMovieYear(e.target.value)} value={null} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="inputMovieRate" className="form-label">IMDB rate</label>
                                    <input type="number" min={0.0} max={9.2} step={0.1} className="form-control movie-input" id="inputMovieRate" aria-describedby="emailHelp" onChange={(e) => setMovieRate(e.target.value)} value={null} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="inputImageURL" className="form-label">Image URL</label>
                                    <input type="text" className="form-control movie-input" id="inputImageURL" onChange={(e) => setImageURL(e.target.value)} value={null} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

// movieYear.length !== 4 || || checkIfNumbers(movieYear)
// const checkIfNumbers = (movieYear) => {
//     if (isNaN(movieYear))
//         return true;
//     return false;
// }

export default AddModal;