import VendorSidebar from './VendorSidebar';
import { useState,useEffect } from 'react';
import Chart from "react-apexcharts";
function DailyReport(){
    const baseUrl = 'http://127.0.0.1:8000/api';
    const vendor_id = localStorage.getItem('vendor_id');
    const [Date, setDate] = useState([]);
    const [Data,setData]=useState([]);

    useEffect(()=>{
        fetch_report(baseUrl+'/vendor-daily-report/'+vendor_id);
    },[vendor_id]);

    
    function fetch_report(baseUrl){
        fetch(baseUrl)
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data.show_chart_daily_orders);
            setDate(data.show_chart_daily_orders.date);
            setData(data.show_chart_daily_orders.data);
        });
    }
    const chartOptions={
        options: {
            chart: {
              id: "basic-bar"
            },
            xaxis: {
              categories: Date
            }
          },
          series: [
            {
              name: "orders",
              data: Data
            }
          ]
    };
    const chartElement=                        
    <Chart options={chartOptions.options} series={chartOptions.series} type="bar" width="500"/>
    return(
<div className="container mt-4">
            <div className="row ">
                <div className="col-md-3 col-12 mb-2">
                    <VendorSidebar/>
                </div>
                <div className="col-md-9 col-12 mb-2">
                    <h3>Daily Report</h3>
                    <div className='row mt-2'>                        
                        {chartElement}
                    </div>
                </div>
                
            </div>
        </div>
    )
}
export default DailyReport;