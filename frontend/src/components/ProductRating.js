import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';



function ProductRating() {
    const baseUrl = 'http://127.0.0.1:8000/api';
    const [productData, setproductData] = useState([]);
    const { product_id } = useParams();

    useEffect(() => {
        fetchData(`${baseUrl}/product/${product_id}/`);
    }, [product_id]);

    function fetchData(url) {
        fetch(url)
            .then((res) => res.json())
            .then((data) => setproductData(data))
            .catch((err) => console.error("Error fetching product data:", err));
    }

    // Star Renderer
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<i key={`full-${i}`} className="fa fa-star text-warning"></i>);
        }
        if (halfStar) {
            stars.push(<i key="half" className="fa fa-star-half-o text-warning"></i>);
        }
        return stars;
    };

    return (
        <div className="container my-5">
            {/* Product Header */}
            <div className="card shadow-sm p-4">
                <div className="d-flex flex-column flex-md-row align-items-center gap-4">
                    <img src={productData.image} className="img-thumbnail rounded" width={150} alt={productData.title} />
                    <div>
                        <h2 className="fw-bold">{productData.title}</h2>
                        <div className="d-flex align-items-center">
                            {renderStars(productData.avg_rating || 0)}
                            <span className="ms-2 text-muted">({productData.avg_rating?.toFixed(2) || 0})</span>
                        </div>
                    </div>
                </div>

                {/* Ratings Breakdown */}
                <div className="mt-4">
                    <h5 className="fw-bold">Ratings </h5>
                    {productData.product_rating && productData.product_rating.length > 0 ? (
                        [5, 4, 3, 2, 1].map((star) => {
                            const filtered = productData.product_rating.filter((r) => parseInt(r.split('-')[0].trim()) === star);
                            const percentage = (filtered.length / productData.product_rating.length) * 100 || 0;

                            return (
                                <div key={star} className="mb-3">
                                    <div className="d-flex align-items-center">
                                        <span style={{ minWidth: 110, whiteSpace: 'nowrap' }}>
                                            {Array.from({ length: star }).map((_, i) => (
                                                <i key={i} className="fa fa-star text-warning me-1"></i>
                                            ))}
                                        </span>
                                        <div className="flex-grow-1 mx-3">
                                            <div className="progress" style={{ height: "10px" }}>
                                                <div
                                                    className="progress-bar bg-warning"
                                                    role="progressbar"
                                                    style={{ width: `${percentage}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                        <span className="text-muted">{filtered.length}</span>
                                    </div>
                                    {filtered.length > 0 && (
                                        <ul className="ms-4 mt-1 text-secondary small">
                                            {filtered.map((review, i) => (
                                                <li key={i}>{review.split('-').slice(1).join('-').trim()}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-muted">No ratings yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductRating;
