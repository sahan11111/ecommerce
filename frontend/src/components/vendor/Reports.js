import VendorSidebar from './VendorSidebar';
import { Link } from 'react-router-dom';

function Reports() {
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-3 col-12 mb-2">
                    <VendorSidebar />
                </div>
                <div className="col-md-9 col-12 mb-2">
                    <div className='row'>

                        {/* Daily Report */}
                        <div className='col-md-4 mb-3'>
                            <div className='card shadow-sm border-0 h-100 report-card'>
                                <div className='card-body text-center'>
                                    <i className="bi bi-calendar-day fs-1 text-primary mb-2"></i>
                                    <h5 className="text-muted">Daily Report</h5>
                                    <Link to='/vendor/daily-report' className='btn btn-outline-primary mt-2'>View</Link>
                                </div>
                            </div>
                        </div>

                        {/* Monthly Report */}
                        <div className='col-md-4 mb-3'>
                            <div className='card shadow-sm border-0 h-100 report-card'>
                                <div className='card-body text-center'>
                                    <i className="bi bi-calendar-month fs-1 text-success mb-2"></i>
                                    <h5 className="text-muted">Monthly Reports</h5>
                                    <Link to='/vendor/monthly-report' className='btn btn-outline-success mt-2'>View</Link>
                                </div>
                            </div>
                        </div>

                        {/* Yearly Report */}
                        <div className='col-md-4 mb-3'>
                            <div className='card shadow-sm border-0 h-100 report-card'>
                                <div className='card-body text-center'>
                                    <i className="bi bi-calendar3 fs-1 text-warning mb-2"></i>
                                    <h5 className="text-muted">Yearly Reports</h5>
                                    <Link to='/vendor/yearly-report' className='btn btn-outline-warning mt-2'>View</Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Custom Styles */}
            <style>{`
                .report-card:hover {
                    transform: translateY(-5px);
                    transition: 0.3s ease;
                    box-shadow: 0 6px 20px rgba(0,0,0,0.1);
                }
            `}</style>
        </div>
    );
}

export default Reports;
