import React, { useState, useEffect } from "react";
import { callApi, errorResponse } from './main';


const VehicleDetails = () => {
    const [vehicleDetails, setVehicleDetails] = useState([]);

    useEffect(() => {
        fetchVehicleDetails();
    }, []);

    const fetchVehicleDetails = () => {
        const url = "http://localhost:5000/home/vehicledetails"; // Change the URL according to your API endpoint
        callApi("GET", url, null, handleSuccess, handleError);
    };

    const handleSuccess = (response) => {
        setVehicleDetails(response); // Assuming the response is an array of vehicle details objects
    };

    const handleError = (error) => {
        alert("Error occurred while fetching vehicle details: " + error.message);
    };

    return (
        <div className='fullheight'>
            <h2></h2>
            <table>
                <thead>
                    <tr>
                        <td>Vehicle Type</td>
                        <h1></h1>
                        <h1></h1>
                        <td>Vehicle Model</td>
                        <h1></h1>
                        <td>Vehicle Number</td>
                        <h1></h1>
                        <td>Date of Purchase</td>
                        <h1></h1>
                        <td>Total Amount</td>
                        <h1></h1>
                    </tr>
                </thead>
                <tbody>
                    {vehicleDetails.map((vehicle, index) => (
                        <tr key={index}>
                            <td>{vehicle.vehicleType}</td>
                            <td>{vehicle.vehicleModel}</td>
                            <td>{vehicle.vehicleNumber}</td>
                            <td>{vehicle.dateOfPurchase}</td>
                            <td>{vehicle.totalAmount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default VehicleDetails;
