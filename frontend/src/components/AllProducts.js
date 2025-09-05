import { Link } from 'react-router-dom';
import SingleProduct from './SingleProduct';
import { useState, useEffect } from 'react';

function AllProducts() {
    const baseUrl = 'http://127.0.0.1:8000/api';
    const [Products, setProducts] = useState([]);
    const [totalResult, setTotalResults] = useState(0);

    useEffect(() => {
        fetchData(baseUrl + '/products');
    }, []);

    function fetchData(baseurl) {
        fetch(baseurl)
            .then((response) => response.json())
            .then((data) => {
                setProducts(data.results);
                setTotalResults(data.count);
            });
    }

    function changeUrl(baseurl) {
        fetchData(baseurl);
    }

    const links = [];
    const limit = 8;
    const totalLinks = Math.ceil(totalResult / limit);

    for (let i = 1; i <= totalLinks; i++) {
        links.push(
            <li key={i} className="page-item">
                <Link
                    onClick={() => changeUrl(`${baseUrl}/products/?page=${i}`)}
                    to={`/products/?page=${i}`}
                    className="page-link"
                >
                    {i}
                </Link>
            </li>
        );
    }

    return (
        <section className="container mt-4">
            {/* Latest Product */}
            <h3 className="mb-4">All Products ({totalResult})</h3>
            <div className="row mb-4">
                {Products.map((product, index) => (
                    <SingleProduct key={product.id || index} product={product} />
                ))}
            </div>
            <nav aria-label="Page navigation example">
                <ul className="pagination">{links}</ul>
            </nav>
            {/* End Latest Product */}
        </section>
    );
}
export default AllProducts;
