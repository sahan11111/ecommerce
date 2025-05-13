import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import SingleProduct from './SingleProduct';
import { useState,useEffect } from 'react';
import Testimonial from './Testimonial';
import SingleVendor from './SingleVendor';
import SingleCategory from './SingleCategory';
function Home(){
  

  // const products=[
  //   {
  //     id: 1, title: 'Product 1', price: 29.99,
  //   },
  //   {
  //     id: 2, title: 'Product 2', price: 39.99, 
  //   },
  //   {
  //     id: 3, title: 'Product 3', price: 49.99,
  //   },
  //   {
  //     id: 4, title: 'Product 4', price: 59.99,
  //   },
  //   {
  //     id: 5, title: 'Product 5', price: 69.99,
  //   },
  //   {
  //     id: 6, title: 'Product 6', price: 79.99,
  //   },
  //   {
  //     id: 7, title: 'Product 7', price: 89.99,
  //   },
  //   {
  //     id: 8, title: 'Product 8', price: 99.99,
  //   },
  // ]
  const baseUrl = 'http://127.0.0.1:8000/api';
  const [products, setProducts] = useState([]);
  const [ReviewList, setReviewList] = useState([]);
  const [VendorList,setVendorList]=useState([]);
  const [CategoriesList,setCategoriesList]=useState([]);

  useEffect(() => {
    fetchData(baseUrl + '/products'); // Adjusted API URL if needed
    fetchTestimonialData(baseUrl+'/productrating/');
    fetchPopularVendors(baseUrl+'/vendors/?fetch_limit=4');
    fetchPopularCategory(baseUrl+'/categories/?fetch_limit=4')
  }, []);

  function fetchData(baseurl) {
    fetch(baseurl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results);
        const sorted = [...data.results].sort((a, b) => b.id - a.id);
        setProducts(sorted.slice(0, 4));
      })
      .catch((error) => console.error("Fetch error:", error));
  }

  function fetchTestimonialData(baseurl){
    fetch(baseurl)
    .then((response)=>response.json())
    .then((data)=>{
        console.log(data);
        setReviewList(data.results);
    });
}

  function fetchPopularVendors(baseurl){
    fetch(baseurl)
    .then((response)=>response.json())
    .then((data)=>{
        console.log(data);
        setVendorList(data.results);
    });
}
  function fetchPopularCategory(baseurl){
    fetch(baseurl)
    .then((response)=>response.json())
    .then((data)=>{
        console.log(data);
        setCategoriesList(data.results);
    });
}
console.log(CategoriesList);
  return(
        <main className='mt-4'>
          <div className="container">
            {/* Latest Product  */}
              <h3 className='mb-4'>Latest Product<Link to='/products' className='float-end btn btn-dark '>View All Products<i class="fa-solid fa-arrow-right-long"></i></Link></h3>
              <div className="row mb-4">
                        {
                            // Products.slice(0, 4).map((product,index)=><SingleProduct product={product} />)
                            products.map((product)=><SingleProduct product={product} />)

                        }
            </div>
            {/* End Latest Product  */}
            {/* Popular Categories  */}
            <h3 className='mb-4'>Popular Categories<Link to='/categories' className='float-end btn btn-dark '>View All Categories<i class="fa-solid fa-arrow-right-long"></i></Link></h3>
              <div className="row mb-4">
              {
                CategoriesList.map((category) => (
                  <SingleCategory key={category.id} category={category} />
                ))
              }
            </div>
            {/* End Popular Categories  */}
              {/* Popular Product  */}
              <h3 className='mb-4'>Popular Products<a href='#' className='float-end btn btn-dark '>View All Products<i class="fa-solid fa-arrow-right-long"></i></a></h3>
                <div className="row mb-4">
                  {/* Product Box */}
                <div className="col-12 col-md-3 mb-4" >
              <div className="card shadow h-100 d-flex flex-column" >
                <img src={logo} className="card-img-top" alt="..."/>
                <div className="card-body">
                  <h4 className="card-title">Product title</h4>
                  <h5 className="card-title text-muted">Price :Rs 500</h5>
                </div>
                <div className='card-footer'>
                <button title='Add to Cart' className='btn btn-success btn-sm'><i className="fa-solid fa-cart-plus "></i></button>
                <button title='Add to Wistlist' className='btn btn-danger btn-sm ms-1'><i className="fa-solid fa-heart "></i></button>
              </div>
              </div>
              </div>
              {/* Product Box End */}
              {/* Product Box */}
              <div className="col-12 col-md-3 mb-4" >
            <div className="card shadow h-100 d-flex flex-column" >
              <img src={logo} className="card-img-top" alt="..."/>
              <div className="card-body">
                <h4 className="card-title">Product title</h4>
                <h5 className="card-title text-muted">Price :Rs 500</h5>
              </div>
              <div className='card-footer'>
              <button title='Add to Cart' className='btn btn-success btn-sm'><i className="fa-solid fa-cart-plus "></i></button>
              <button title='Add to Wistlist' className='btn btn-danger btn-sm ms-1'><i className="fa-solid fa-heart "></i></button>
            </div>
            </div>
            </div>
            {/* Product Box End */}
              {/* Product Box */}
              <div className="col-12 col-md-3 mb-4" >
            <div className="card shadow h-100 d-flex flex-column" >
              <img src={logo} className="card-img-top" alt="..."/>
              <div className="card-body">
                <h4 className="card-title">Product title</h4>
                <h5 className="card-title text-muted">Price :Rs 500</h5>
              </div>
              <div className='card-footer'>
              <button title='Add to Cart' className='btn btn-success btn-sm'><i className="fa-solid fa-cart-plus "></i></button>
              <button title='Add to Wistlist' className='btn btn-danger btn-sm ms-1'><i className="fa-solid fa-heart "></i></button>
            </div>
            </div>
            </div>
            {/* Product Box End */}
              {/* Product Box */}
              <div className="col-12 col-md-3 mb-4" >
            <div className="card shadow h-100 d-flex flex-column" >
              <img src={logo} className="card-img-top" alt="..."/>
              <div className="card-body">
                <h4 className="card-title">Product title</h4>
                <h5 className="card-title text-muted">Price :Rs 500</h5>
              </div>
              <div className='card-footer'>
              <button title='Add to Cart' className='btn btn-success btn-sm'><i className="fa-solid fa-cart-plus "></i></button>
              <button title='Add to Wistlist' className='btn btn-danger btn-sm ms-1'><i className="fa-solid fa-heart "></i></button>
            </div>
            </div>
            </div>
            {/* Product Box End */}
            
            </div>
            {/* End Popular Product  */}
            {/* Popular Sellers  */}
            <h3 className='mb-4'>Popular Seller<Link to='/vendors' className='float-end btn btn-dark '>View All Sellers<i class="fa-solid fa-arrow-right-long"></i></Link></h3>
            <div className="row mb-4">
                        {
                        VendorList.map((vendor)=><SingleVendor vendor={vendor} />)

                        }
            </div>
            {/* End Popular Sellers  */}
            {/* Rating and Review */}
            <div id="carouselExampleIndicators" className="carousel slide my-4 border bg-dark text-white p-5 " data-bs-ride="true">
              <div className="carousel-indicators">
                  {
                    ReviewList && ReviewList.map((item, index) => {
                      return (
                        <button type='button' data-bs-target='#carouselExampleIndicators' className='active' aria-current='true' data-bs-slide-to={index} aria-label={index}></button>
                      );
                    })
                  }

              </div>
              <div className="carousel-inner">
              {
                ReviewList && ReviewList.map((item, index) => {
                  return (
                    <Testimonial index={index} key={index} item={item} />
                  );
                })
              }
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          {/* End Rating and Review */}
          </div>
        </main>
  )
}
export default Home;
