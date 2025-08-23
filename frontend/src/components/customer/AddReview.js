import Sidebar from "./Sidebar";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";

function AddReview() {
  const { product_id } = useParams();
  var customer_id = localStorage.getItem("customer_id");
  const [ErrorMsg, setErrorMsg] = useState("");
  const [SuccessMsg, setSuccessMsg] = useState("");
  const [ReviewFormData, setReviewFormData] = useState({
    review: "",
    rating: 1,
  });

  const inputHandler = (event) => {
    setReviewFormData({
      ...ReviewFormData,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("review", ReviewFormData.review);
    formData.append("rating", ReviewFormData.rating);
    formData.append("customer", customer_id);
    formData.append("product", product_id);

    // Submit Data
    axios
      .post(baseUrl + "/productrating/", formData)
      .then(function (response) {
        if (response.status !== 201) {
          setSuccessMsg("");
          setErrorMsg("Review not Added");
        } else {
          setSuccessMsg("Review Added Successfully");
          setErrorMsg("");
          setReviewFormData({
            review: "",
            rating: 1, // Reset to 1
          });
        }
      })
      .catch(function (error) {
        console.log(error);
        setErrorMsg("Something went wrong. Please try again.");
        setSuccessMsg("");
      });
  };

  const disableBtn = ReviewFormData.review === "" || ReviewFormData.rating === "";

  return (
    <div className="container mt-4">
      <div className="row ">
        <div className="col-md-3 col-12 mb-2">
          <Sidebar />
        </div>
        <div className="col-md-9 col-12 mb-2">
          <div className="col-6 mx-auto mb-4">
            <div className="card shadow-lg border-0 rounded-3">
              <h4 className="card-header bg-primary text-white text-center py-3 rounded-top">
                Add Review
              </h4>
              <div className="card-body p-4">
                {ErrorMsg && (
                  <p className="alert alert-danger text-center">{ErrorMsg}</p>
                )}
                {SuccessMsg && (
                  <p className="alert alert-success text-center">{SuccessMsg}</p>
                )}

                <form onSubmit={submitHandler}>
                  <div className="mb-3">
                    <label htmlFor="review" className="form-label fw-bold">
                      Review
                    </label>
                    <textarea
                      className="form-control border-primary shadow-sm"
                      name="review"
                      onChange={inputHandler}
                      value={ReviewFormData.review}
                      id="review"
                      rows="4"
                      placeholder="Write your review here..."
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="rating" className="form-label fw-bold">
                      Rating
                    </label>
                    {/* ⭐ Custom Star Rating Component */}
                    <StarRating
                      value={ReviewFormData.rating}
                      onChange={(val) =>
                        setReviewFormData({ ...ReviewFormData, rating: val })
                      }
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={disableBtn}
                    className="btn btn-primary w-100 fw-bold shadow-sm py-2 rounded-pill"
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

// ⭐ Reusable Star Rating Component
function StarRating({ value, onChange }) {
  const [hover, setHover] = useState(0);

  return (
    <div className="d-flex justify-content-center gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className="btn p-0 border-0 bg-transparent"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
        >
          <span
            style={{
              fontSize: "1.8rem",
              color: star <= (hover || value) ? "#ffc107" : "#e4e5e9", // Gold or Gray
              cursor: "pointer",
              transition: "color 0.2s",
            }}
          >
            ★
          </span>
        </button>
      ))}
    </div>
  );
}

export default AddReview;
