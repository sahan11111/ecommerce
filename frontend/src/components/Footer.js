function Footer() {
    return (
      <footer className="container d-flex flex-wrap justify-content-between align-items-center py-3 my-5 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <a href="/" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
            Programming Market Place
          </a>
          <span className="mb-3 mb-md-0 text-body-secondary">© 2025</span>
        </div>
  
        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex pt-2">
          <li className="ms-3">
            <a className="text-muted" href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-facebook fs-2x"></i>
            </a>
          </li>
          <li className="ms-3">
            <a className="text-muted" href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-instagram fs-2x"></i>
            </a>
          </li>
          <li className="ms-3">
            <a className="text-muted" href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-twitter fs-2x"></i>
            </a>
          </li>
        </ul>
      </footer>
    );
  }
  
  export default Footer;
  