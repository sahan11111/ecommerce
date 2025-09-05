import { Link } from 'react-router-dom';
import SingleVendor from './SingleVendor';
import { useState, useEffect } from 'react';

function AllVendors() {
    const baseUrl = 'http://127.0.0.1:8000/api';
    const [VendorList, setVendorList] = useState([]);
    const [totalResult, setTotalResults] = useState(0);
    const limit = 8;

    useEffect(() => {
        fetchData(`${baseUrl}/vendors/`);
    }, []);

    function fetchData(baseurl) {
        fetch(baseurl)
            .then((response) => response.json())
            .then((data) => {
                setVendorList(data.results);
                setTotalResults(data.count);
            });
    }

    function changeUrl(baseurl) {
        fetchData(baseurl);
    }

    const totalPages = Math.ceil(totalResult / limit);
    const links = [];
    for (let i = 1; i <= totalPages; i++) {
        links.push(
            <li className='page-item' key={i}>
                <Link
                    onClick={(e) => {
                        e.preventDefault();
                        changeUrl(`${baseUrl}/vendors/?page=${i}`);
                    }}
                    to={`/vendors/?page=${i}`}
                    className='page-link'
                >
                    {i}
                </Link>
            </li>
        );
    }

    return (
        <section className="container mt-4">

            <h3 className='mb-4'>All Sellers ({totalResult})</h3>
            <div className="row mb-4">
                {VendorList.map((vendor) => (
                    <SingleVendor vendor={vendor} key={vendor.id} />
                ))}
            </div>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {links}
                </ul>
            </nav>

        </section>
    );
}

export default AllVendors;
