import Sidebar from "./Sidebar";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const baseUrl='http://127.0.0.1:8000/api';

function AddReview() {
    const {product_id}=useParams();
    var customer_id=localStorage.getItem('customer_id');
    const [ErrorMsg,setErrorMsg]=useState('');
    const [SuccessMsg,setSuccessMsg]=useState('');
    const [ReviewFormData,setReviewFormData]=useState({
        'review':'',
        'rating':1
    });
    const inputHandler=(event)=>{
        setReviewFormData({
            ...ReviewFormData,
            [event.target.name]:event.target.value
        });
    };
    const submitHandler=(event)=>{
        event.preventDefault();
        const formData=new FormData();
        formData.append('review',ReviewFormData.review);
        formData.append('rating',ReviewFormData.rating);
        formData.append('customer',customer_id);
        formData.append('product',product_id);

        //Subimt Data
        axios.post(baseUrl + '/productrating/', formData)
        .then(function(response) {
            if (response.status !== 201) {
                setSuccessMsg('');
                setErrorMsg('Review not Added');
            } else {
                setSuccessMsg('Review Added Successfully');
                setErrorMsg('');
                setReviewFormData({
                    review: '',
                    rating: 1,  // Reset to 1, not empty string
                });
            }
        })
        .catch(function(error) {
            console.log(error);
            setErrorMsg('Something went wrong. Please try again.');
            setSuccessMsg('');
        });
    
                
    };
    const disableBtn=(ReviewFormData.review===''||ReviewFormData.rating==='');
    return(
        <div className="container mt-4">
        <div className="row ">
            <div className="col-md-3 col-12 mb-2">
                <Sidebar/>
            </div>
                <div className="col-md-9 col-12 mb-2">
                        <div className='col-4 mb-4'>
                            <div className='card '>
                                <h4 className="card-header">Add Review</h4>
                                <div className="card-body">
                                    {ErrorMsg && <p className="alert alert-danger">{ErrorMsg}</p>}
                                    {SuccessMsg && <p className="alert alert-success">{SuccessMsg}</p>}

                                    <form onSubmit={submitHandler}>
                                        <div className="mb-3">
                                            <label htmlFor="review" className="form-label">
                                                Review
                                            </label>
                                            <textarea
                                                className="form-control"
                                                name="review"
                                                onChange={inputHandler}
                                                value={ReviewFormData.review}
                                                id="review"
                                                rows="4"
                                                placeholder="Write your review here..."
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="rating" className="form-label">
                                                Rating
                                            </label>
                                            <select
                                                className="form-control text-center"
                                                name="rating"
                                                onChange={inputHandler}
                                                value={ReviewFormData.rating}
                                                id="rating"
                                            >
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={disableBtn}
                                            className="btn btn-primary w-100"
                                        >
                                            Submit Review
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>                   

                    </div>
                </div>      
        </div>
    );
}
export default AddReview;