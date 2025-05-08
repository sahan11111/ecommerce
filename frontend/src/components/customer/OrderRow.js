import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState ,useContext } from 'react';
import { CurrencyContext } from '../../Context';
function OrderRow(props){
    const index=props.index;
    const item=props.item;
    const {CurrencyData}=useContext(CurrencyContext);
    
    const baseUrl='http://127.0.0.1:8000/api';

    const [TotalDownloads,setTotalDownloads]=useState(item.product.downloads);

    const countDownloads=(product_id)=>{
        const formData = new FormData();
        formData.append('product_id', product_id);
    
        // Submit data
        axios.post(baseUrl + '/update-product-download-count/'+product_id)
        .then(function(response) {
            if (response.data.bool===true){
                setTotalDownloads(++item.product.downloads);
                window.open(
                    item.product.product_file,
                    '_blank'
                )
            }
            
            console.error('Downloads :', response);  
            })
            .catch(function(error) {
                console.error('Downloads Error:', error);
            });
    };
return(
    <tr>
        <td className='text-center'>{index+1}</td>
        <td>
            <Link to={`/product/${item.product.title}/${item.product.id}`}><img  src={item.product.image} className="img-thumbnail" width={80} alt="..."/></Link>
            <Link className='text-dark' to={`/product/${item.product.title}/${item.product.id}`}><label>{item.product.title}</label></Link>
            
        </td>
            { (CurrencyData==='npr'|| CurrencyData===undefined) &&
                <td className='text-center'>Rs. {item.product.price}</td>
            }   
            { (CurrencyData==='usd') &&
                <td className='text-center'>$ {item.product.usd_price}</td>
            }
        <td className='text-center'>
            <span>
                {
                    item.order.order_status===true && <i className='fa fa-check-circle text-success'></i>
                }
                {
                    item.order.order_status===false && <i className='fa fa-spinner fa-spin text-dark'></i>
                }
                
            </span>
        </td>
        <td className='text-center'>
            {
                item.order.order_status===true && <button  onClick={()=>countDownloads(item.product.id)}  className="btn btn-primary btn-sm">Download
                <span className='badge text-dark bg-white ms-1'>{TotalDownloads}</span>
                </button>
            }
            <Link  to={'/customer/add-review/'+item.product.id} className="btn btn-success btn-sm ms-2">Review<i className="fa fa-star ms-1" style={starIcon}></i>
                </Link>
        </td>
    </tr>
);
}
const starIcon = {
    color: 'gold'
  };
export default OrderRow;