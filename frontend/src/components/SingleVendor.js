import { Link } from 'react-router-dom';

function SingleVendor(props) {
    return (
        <div className="col-12 col-md-3 mb-4">
            <div className="card shadow h-100 d-flex flex-column">
                {/* Link to the vendor's page */}
                <Link to={`/vendor/${props.vendor.id}`}>
                    <img
                        src={props.vendor.profile_img}
                        className="card-img-top"
                        alt={props.vendor.user.id}
                        style={{ height: "180px", objectFit: "cover" }}
                    />
                </Link>
                <div className="card-body">
                    {/* Displaying the vendor's name */}
                    <h4 className="card-title">
                        <Link to={`/vendor/${props.vendor.id}`}>
                            {props.vendor.user.username} 
                        </Link>
                    </h4>
                </div>
                <div className='card-footer'>
                  Categories : <a href='#'>Python</a>,<a href='#'>PHP</a>
                </div> 
            </div>
        </div>
    );
}

export default SingleVendor;
