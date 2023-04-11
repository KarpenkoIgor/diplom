import React from 'react';
import './Navbar.css';

const Navbar = function () {

    return(
        <div id="drawing-navbar">
            <button id="step-back">Step Back</button>
            <button id="step-forvard">Step Forvard</button>
            <button id="inspect-button">Inspect</button>
            <button id="delete-button">Delete</button>
            <button id="selection-button">Selection</button>
            <button id="change-button">Change</button>
            <button id="adding-line-button">Add Line</button>
            <button id="edit-connections-button">Edit Connections</button>
            <button id="prohibtions-button">Prohibtions</button>
            <button id="edit-traffic-light-button">Edit Traffic Light</button>            
        </div>
    );
}

export default Navbar;