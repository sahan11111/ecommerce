import { Link } from 'react-router-dom';
import SingleProduct from './SingleProduct';
import { useState,useEffect } from 'react';
function AllProducts(){
//    const products=[
//         {
//             'title':'Python'
//             ,'price': 29.99
//         },
//         {
//             'title':'JavaScript'
//             ,'price': 19.99
//         },
//         {
//             'title':'React'
//             ,'price': 24.99
//         },
        

//     ]
const baseUrl='http://127.0.0.1:8000/api';
    const [Products, setProducts] = useState([]);
    const [totalResult,setTotalResults]=useState(0);

    useEffect(() => {
        fetchData(baseUrl+'/products');
    },[]);

    function fetchData(baseurl){
        fetch(baseurl)
        .then((response)=>response.json())
        .then((data)=>{setProducts(data.results);
        setTotalResults(data.count);
        });
    }
    function changeUrl(baseurl) {
         fetchData(baseurl);
    }

    var links=[];
    var limit=8;
    var totalLinks=Math.ceil(totalResult / limit);
    for (let i=1; i<=totalLinks;i++){
        links.push(<li class='page-item'>                
        <Link
            onClick={() => changeUrl(`${baseUrl}/products/?page=${i}`)}
            to={`/products/?page=${i}`}
            className='page-link'
        >
            {i}
        </Link></li>)
    }

    return(
        <section className="container mt-4">
        {/* Latest Product  */}
        <h3 className='mb-4'>All Products</h3>
        <div className="row mb-4">
            {
                Products.map((product,index)=><SingleProduct product={product} />)
            }

       
        </div>
        <nav aria-label="Page navigation example">
            <ul class="pagination">

                    {links}

            </ul>
        </nav>
        {/* End Latest Product  */}
    </section >
    )
}
export default AllProducts;