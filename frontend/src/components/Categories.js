import logo from '../logo.svg';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

function Categories(){
  
      const baseUrl='http://127.0.0.1:8000/api';
      const [categories, setCategories] = useState([]);
      const [totalResult,setTotalResults]=useState(0);

      useEffect(() => {
          fetchData(baseUrl+'/categories');
      },[]);

      function fetchData(baseurl){
          fetch(baseurl)
          .then((response)=>response.json())
          .then((data)=>{setCategories(data.results);
          setTotalResults(data.count);
          });
      }
      function changeUrl(baseurl) {
          fetchData(baseurl);
      }

      var links=[];
      var limit=12;
      var totalLinks=totalResult/limit;
      for (let i=1; i<=totalLinks;i++){
          links.push(<li class='page-item'><Link
              onClick={() => changeUrl(baseUrl+`/categories/?page=${i}`)}
              to={`/categories/?page=${i}`}
              className='page-link'
          >
              {i}
          </Link></li>)
      }

    return(
       <section className="container mt-4">
{/*  Categories  */}
<h3 className='mb-4'>All Categories</h3>
<div className="row mb-2">
  {
    categories.map((category) =>
      <div className="col-12 col-md-3 mb-4" key={category.id}>
        <div className="card shadow h-100 d-flex flex-column">
          <Link to={`/category/${category.title}/${category.id}`}>
            <img
              src={category.image}
              className="card-img-top"
              alt={category.title}
              style={{ height: "180px", objectFit: "cover" }} // Image consistency
            />
          </Link>
          <div className="card-body d-flex flex-column">
            <h4 className="card-title">
              <Link to={`/category/${category.title}/${category.id}`}>
                <label>{category.title}</label>
              </Link>
            </h4>
            <label className="card-text">{category.detail}</label>
          </div>
          <div className='card-footer mt-auto'>
            Product Downloads: {category.total_downloads}
          </div>
        </div>
      </div>
    )
  }
</div>
{/* End  Categories  */}

    <nav aria-label="Page navigation example">
    <ul class="pagination">
{links}
    </ul>
    </nav>
</section>
    )
}
export default Categories;
