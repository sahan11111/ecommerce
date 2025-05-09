import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import SingleRelatedProduct from './SingleRelatedProduct';

function VendorDetail(){
    const baseUrl='http://127.0.0.1:8000/api';
    const [VendorData, setVendorData] = useState(null);
    const [productList, setproductList] = useState([]);
    const {vendor_id} = useParams();
    
   
    useEffect(() => {
        fetchData(`${baseUrl}/vendor/${vendor_id}/`);
        fetchProductData(`${baseUrl}/vendor/${vendor_id}/products/`);

    }, [vendor_id]); 


    
    function fetchProductData(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setproductList(data.results);
        });
    }
        function fetchData(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setVendorData(data);
        });
    }
    console.log(VendorData);
    return (
  <section className="container mt-4">
    <div className="row mb-4">
      {VendorData ? (
        <>
        <div className="col-3">
          <img src={VendorData.profile_img} className="img-thumbnail" alt="" />
        </div>
        <div className='col-9'>
          <h4><i class="fa-solid fa-circle-user"></i> {VendorData.user.first_name} {VendorData.user.last_name}</h4>
          <p>Total Products ({VendorData.total_products})</p>
          <p><i class="fa-solid fa-phone"></i> {VendorData.mobile}</p>
        </div>
        </>
      ) : (
        <div>Loading vendor details...</div>
      )}
    </div>
    {/* 
        <h3 className='mb-4'>All Products</h3>
        <div className="row mb-4">
            {
                productList.map((product,index)=><SingleProduct product={product} />)
            }
        </div> */}
{productList.length > 0 && (
    <>
        <h3 className="mt-5 mb-2 text-center">Products</h3>
        <div
        id="ProductSlider"
        className="carousel carousel-dark slide bg-light border mt-4"
        data-bs-ride="carousel"
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
        <div className="carousel-inner">
            {productList.map((product, index) => (
            <div
                className={`carousel-item ${index === 0 ? 'active' : ''}`}
                key={index}
            >
                <SingleRelatedProduct product={product} />
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
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#ProductSlider"
            data-bs-slide="next"
        >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </button>
        </div>
    </>
)}

  </section>
);

}
export default VendorDetail;