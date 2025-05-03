//Packages
import { Link } from 'react-router-dom';

function SingleRelatedProduct(props){
    return(
        <div className="col-2 offset-5  mb-4" >
            <div className="card shadow h-100 d-flex flex-column" >
                <Link to={`/product/${props.product.title}/${props.product.id}`}>
                    <img src={props.product.image} className="card-img-top" alt="..."/>
                </Link>
                <div className="card-body">
                    <h4 className="card-title"><Link to={`/product/${props.product.title}/${props.product.id}`}>{props.product.title}</Link>
</h4>
                    <h5 className="card-title text-muted">Price :Rs {props.product.price}</h5>
                </div>
                <div className='card-footer'>
                    <button title='Add to Cart' className='btn btn-success btn-sm'><i className="fa-solid fa-cart-plus "></i></button>
                    <button title='Add to Wistlist' className='btn btn-danger btn-sm ms-1'><i className="fa-solid fa-heart "></i></button>
                </div>
            </div>
        </div>
    )
}
export default SingleRelatedProduct;