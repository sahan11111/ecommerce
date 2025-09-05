import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SingleRelatedProduct from './SingleRelatedProduct';
// ✅ Import only Carousel from Bootstrap
import { Carousel } from 'bootstrap';

function VendorDetail() {
  const baseUrl = 'http://127.0.0.1:8000/api';
  const [VendorData, setVendorData] = useState(null);
  const [productList, setProductList] = useState([]);
  const { vendor_id } = useParams();

  useEffect(() => {
    fetchData(`${baseUrl}/vendor/${vendor_id}/`);
    fetchProductData(`${baseUrl}/vendor/${vendor_id}/products/`);
  }, [vendor_id]);

  useEffect(() => {
    if (productList.length > 0) {
      const myCarousel = document.querySelector('#ProductSlider');
      if (myCarousel) {
        new Carousel(myCarousel, {
          interval: 2000, // Auto switch every 2 seconds
          ride: 'carousel'
        });
      }
    }
  }, [productList]);

  function fetchProductData(baseurl) {
    fetch(baseurl)
      .then((response) => response.json())
      .then((data) => {
        setProductList(data.results);
      });
  }

  function fetchData(baseurl) {
    fetch(baseurl)
      .then((response) => response.json())
      .then((data) => {
        setVendorData(data);
      });
  }

  return (
    <section className="container mt-4">
      <div className="row mb-5">
        {VendorData ? (
          <>
            <div className="col-3">
              <img
                src={VendorData.profile_img}
                className="img-thumbnail shadow-sm rounded"
                alt="Vendor"
              />
            </div>
            <div className="col-9 d-flex flex-column justify-content-center">
              <h3 className="fw-bold text-dark mb-2">
                <i className="fa-solid fa-circle-user text-primary me-2"></i>
                {VendorData.user.first_name} {VendorData.user.last_name}
              </h3>
              <p className="text-muted mb-1">
                <i className="fa-solid fa-box me-2 text-secondary"></i>
                Total Products ({VendorData.total_products})
              </p>
              <p className="mb-0">
                <i className="fa-solid fa-phone me-2 text-success"></i>
                {VendorData.mobile}
              </p>
            </div>
          </>
        ) : (
          <div>Loading vendor details...</div>
        )}
      </div>

      {productList.length > 0 && (
        <>
          <h3 className="mt-4 mb-4 text-center fw-bold">
            <span className="border-bottom border-3 border-primary pb-1">
              Products
            </span>
          </h3>

          <div
            id="ProductSlider"
            className="carousel carousel-dark slide shadow-sm rounded p-4 bg-light"
          >
            {/* Indicators */}
            <div className="carousel-indicators">
              {productList.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#ProductSlider"
                  data-bs-slide-to={index}
                  className={index === 0 ? 'active' : ''}
                  aria-current={index === 0 ? 'true' : undefined}
                  aria-label={`Slide ${index + 1}`}
                ></button>
              ))}
            </div>

            {/* Slides */}
            <div className="carousel-inner text-center">
              {productList.map((product, index) => (
                <div
                  className={`carousel-item ${index === 0 ? 'active' : ''}`}
                  key={index}
                >
                  <div className="d-flex justify-content-center">
                    <div className="card shadow-sm border-0" style={{ width: '18rem' }}>
                      <SingleRelatedProduct product={product} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Controls */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#ProductSlider"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#ProductSlider"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default VendorDetail;
