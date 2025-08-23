import { Link, useParams } from 'react-router-dom';
import SingleProduct from './SingleProduct';
import { useState, useEffect } from 'react';

function CategoryProducts() {
    const baseUrl = 'http://127.0.0.1:8000/api';
    const [Products, setProducts] = useState([]);
    const [totalResult, setTotalResults] = useState(0);
    const { category_slug, category_id } = useParams();

    useEffect(() => {
        fetchData(`${baseUrl}/products/?category=${category_id}`);
    }, [category_id]);

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
    const limit = 8; // same as AllProducts
    const totalLinks = Math.ceil(totalResult / limit);

    for (let i = 1; i <= totalLinks; i++) {
        links.push(
            <li key={i} className="page-item">
                <Link
                    onClick={() =>
                        changeUrl(`${baseUrl}/products/?category=${category_id}&page=${i}`)
                    }
                    to={`/category/${category_slug}/${category_id}/?page=${i}`}
                    className="page-link"
                >
                    {i}
                </Link>
            </li>
        );
    }

    return (
        <section className="container mt-4">
            {/* Category Products */}
            <h3 className="mb-4">All Products in {category_slug} ({totalResult})</h3>
            <div className="row mb-4">
                {Products.map((product, index) => (
                    <SingleProduct key={product.id || index} product={product} />
                ))}
            </div>
            <nav aria-label="Page navigation example">
                <ul className="pagination">{links}</ul>
            </nav>
            {/* End Category Products */}
        </section>
    );
}

export default CategoryProducts;
