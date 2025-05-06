import VendorSidebar from './VendorSidebar';
import { useState,useEffect } from 'react';
import Chart from "react-apexcharts";
function MonthlyReport(){
    const baseUrl = 'http://127.0.0.1:8000/api';
    const vendor_id = localStorage.getItem('vendor_id');
    const [Month, setMonth] = useState([]);
    const [Data,setData]=useState([]);

    useEffect(()=>{
        fetch_report(baseUrl+'/vendor-daily-report/'+vendor_id);
    },[vendor_id]);

    
    // function getMonthName(monthNumber){
    //     const date=new Date();
    //     date.setMonth(monthNumber-1);

    //     return date.toLocaleString('en-US',{
    //         month:'long',
    //     });
    // }

    function fetch_report(baseUrl){
        fetch(baseUrl)
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data.show_chart_monthly_orders);
            setMonth(data.show_chart_monthly_orders.month);
            setData(data.show_chart_monthly_orders.data);
        });
    }
    const chartOptions={
        options: {
            chart: {
              id: "basic-bar"
            },
            xaxis: {
              categories: Month
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
                    <h3>Monthly Report</h3>
                    <div className='row mt-2'>                        
                        {chartElement}
                    </div>
                </div>
                
            </div>
        </div>
    )
}
export default MonthlyReport;