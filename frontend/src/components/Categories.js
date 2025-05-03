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
 
{/* Category Box */}
{
                categories.map((category)=>
            
                <div className="col-12 col-md-3 mb-4" >
                  <div className="card shadow" >
                    <img src={logo} className="card-img-top" alt={category.title}/>
                      <div className="card-body">
                        <h4 className="card-title"><Link to={`/category/${category.title}/${category.id}`}><lable>{category.title}</lable></Link></h4>
                    </div>
                      <div className='card-footer'>
                        Product Downloads : 234
                      </div>
                  </div>
                </div>
)
}
{/* Category Box End */}

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
