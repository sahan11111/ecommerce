function Testimonial(props) {
    const index = props.index;
    const item = props.item;
    let _class = '';
    if (index === 0) {
        _class = 'active';
    }
    var _stars=[];
    for (let i = 0; i<item.rating; i++){
      _stars.push('<i className="fa fa-star text-warning"></i>');
    }


    return (
        <div className={`carousel-item ${_class}`}>
            <figure className="text-center">
                <h5>{item.product.title}</h5>
                <blockquote className="blockquote">
                    <p>{item.review}</p>
                </blockquote>
                <figcaption className="blockquote-footer">
                  {
                    _stars.map((item,index)=><i className='fa fa-star text-warning'></i>)
                  }
                    <cite title="Source Title">{`${item.customer.user.first_name} ${item.customer.user.last_name}`}</cite>
                </figcaption>
            </figure>
        </div>
    );
}

export default Testimonial;
