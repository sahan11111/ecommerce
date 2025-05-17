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
                <div className="card-footer">
                    <span style={{ fontWeight: "600", fontSize: "0.95rem" }}>
                        Categories:
                    </span>
                    {props.vendor.category.map((cat, index) => (
                        <Link
                        key={index}
                        to={`/category/${cat.title}/${cat.id}`}
                        style={{
                            display: "inline-block",
                            marginLeft: "8px",
                            marginTop: "4px",
                            padding: "6px 14px",
                            backgroundColor: "#ffffff",
                            borderRadius: "20px",
                            color: "#000",
                            textDecoration: "none",
                            fontSize: "0.85rem",
                            border: "1px solid #ccc",
                            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.08)",
                            transition: "all 0.2s ease-in-out"
                        }}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = "#007bff";
                            e.target.style.color = "#fff";
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = "#ffffff";
                            e.target.style.color = "#000";
                        }}
                        >
                        {cat.title}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SingleVendor;
