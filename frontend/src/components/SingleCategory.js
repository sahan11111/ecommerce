//Packages
import { Link } from 'react-router-dom';

function SingleCategory({ category }) {
    return (
        <div className="col-12 col-md-3 mb-4">
            <div className="card shadow h-100 d-flex flex-column">
                <Link to={`/category/${category.title}/${category.id}`}>
                    <img src={category.image} className="card-img-top" alt={category.title} style={{ height: "180px", objectFit: "cover" }}  />
                </Link>
                <div className="card-body">
                    <h4 className="card-title"><Link to={`/category/${category.title}/${category.id}`}>{category.title}</Link></h4>
                </div>
                <div className="card-footer">
                    Total Products: {category.total_products}
                </div>
            </div>
        </div>
    );
}

export default SingleCategory;

            