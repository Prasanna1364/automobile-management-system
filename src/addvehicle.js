import React from "react";
import './addvehicle.css';
import { callApi, errorResponse, getSession } from './main';

const tablestyle = { "width": "100%" };
const size = { "fontSize": "14px", "color": "black" };
const buto = { "width": "8px", "color": "aqua", "fontWeight": "bold", "textAlign": "center" };

class AddVehicle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicleType: '',
            vehicleModel: '',
            vehicleNumber: '',
            dateOfPurchase: '',
            totalAmount: '',
            savedSuccessfully: false // Add a state to track successful save
        };
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }

    saveDetails = () => {
        const uname = getSession("sid");
        const url = "http://localhost:5000/home/addvehicle";

        const { vehicleType, vehicleModel, vehicleNumber, dateOfPurchase, totalAmount } = this.state;

        const data = JSON.stringify({
            vehicleType,
            vehicleModel,
            vehicleNumber,
            dateOfPurchase,
            totalAmount,
        });

        callApi("POST", url, data, this.handleSuccess, this.handleError);
    };

    handleSuccess = () => {
        this.setState({
            vehicleType: '',
            vehicleModel: '',
            vehicleNumber: '',
            dateOfPurchase: '',
            totalAmount: '',
            savedSuccessfully: true // Update state to indicate successful save
        });
    }

    handleError = (error) => {
        alert("Error occurred while saving details: " + error.message);
    }

    render() {
        const { vehicleType, vehicleModel, vehicleNumber, dateOfPurchase, totalAmount, savedSuccessfully } = this.state;

        return (
            <div className='fullheight'>
                <div className='cpcon'>
                    <h2 style={size}>Add Vehicle Details</h2>
                    <table style={tablestyle}>
                        <tr>
                            <td style={size}>Vehicle Type <input type='text' id='vehicleType' value={vehicleType} onChange={this.handleChange} className='tbox' /></td>
                        </tr>
                        <tr>
                            <td style={size}>Vehicle Model <input type='text' id='vehicleModel' value={vehicleModel} onChange={this.handleChange} className='tbox' /></td>
                        </tr>
                        <tr>
                            <td style={size}>Vehicle Number<input type='text' id='vehicleNumber' value={vehicleNumber} onChange={this.handleChange} className='tbox' /></td>
                        </tr>
                        <tr>
                            <td style={size}>Date of Purchase <input type='text' id='dateOfPurchase' value={dateOfPurchase} onChange={this.handleChange} className='tbox' /></td>
                        </tr>
                        <tr>
                            <td style={size}>Total Amount<input type='text' id='totalAmount' value={totalAmount} onChange={this.handleChange} className='tbox' /></td>
                        </tr>
                        <tr>
                            <td style={buto}><button className='button' onClick={this.saveDetails}>Save</button></td>
                        </tr>
                        {savedSuccessfully && <tr><td><div>Saved details successfully!</div></td></tr>}
                    </table>
                </div>
            </div>
        );
    }
}

export default AddVehicle;
