import Sidebar from './Sidebar';
import axios from 'axios';
import { useState } from 'react';

const baseUrl = 'http://127.0.0.1:8000/api';

function ChangePassword() {
  const [PasswordData, setPasswordData] = useState({
    password: '',
    c_password: '',
  });
  const [ConfirmError, setConfirmError] = useState(false);
  const [message, setMessage] = useState('');  // State to store success/error message

  const inputHandler = (event) => {
    const { name, value } = event.target;
    const updatedData = {
      ...PasswordData,
      [name]: value,
    };
    setPasswordData(updatedData);

    if (updatedData.password !== updatedData.c_password) {
      setConfirmError(true);
    } else {
      setConfirmError(false);
    }
  };

  const customer_id = localStorage.getItem('customer_id');

  const submitHandler = (event) => {
    event.preventDefault(); // Prevent form reload

    // Validate password match
    if (PasswordData.password !== PasswordData.c_password) {
      setConfirmError(true);
      return; // Prevent submission if passwords don't match
    }
    setConfirmError(false);

    // Prepare data to send (JSON format)
    const data = {
      password: PasswordData.password,
    };

    // Submit data
    axios
      .put(baseUrl + '/customer-change-password/' + customer_id + '/', data)
      .then(function (response) {
        console.log(response);
        window.location.reload();
        // Show success message
        setMessage({ type: 'success', text: 'Password changed successfully!' });
      })
      .catch(function (error) {
        console.error('Error:', error);
        // Show error message
        setMessage({ type: 'error', text: 'There was an error changing the password.' });
      });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 col-12 mb-2">
        <Sidebar/>
        </div>
        <div className="col-md-9 col-12 mb-2">
          {/* Show password mismatch error */}
          {ConfirmError && (
            <p className="text-danger">Password does not match</p>
          )}

          {/* Show success or error message */}
          {message && (
            <div
              className={`alert alert-${message.type === 'success' ? 'success' : 'danger'}`}
              role="alert"
            >
              {message.text}
            </div>
          )}

          <div className="card">
            <h4 className="card-header">Change Password</h4>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="pwd" className="form-label">
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={inputHandler}
                  value={PasswordData.password}
                  className="form-control"
                  id="pwd"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="cpwd" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="c_password"
                  onChange={inputHandler}
                  value={PasswordData.c_password}
                  className="form-control"
                  id="cpwd"
                />
              </div>
              <button
                type="button"
                onClick={submitHandler}
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
