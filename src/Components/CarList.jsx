import React, { useEffect } from 'react';
import { useState, useRef } from 'react';

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import Button from '@mui/material/Button';

export default function CarList(){

    const [car, setCar] = useState(
        {
        brand: '',
        model: '',
        color: '',
        fuel: '',
        modelYear: '',
        price: ''
        }
    );
    const [cars, setCars] = useState([]);
    const gridRef = useRef();
    const gridApiRef = useRef();
    const [columnDefs, setColumnDefs] = useState([
        {field: 'brand', checkboxSelection: true},
        {field: 'model'},
        {field: 'color'},
        {field: 'fuel'},
        {field: 'modelYear'},
        {field: 'price'}
    ]);
    const defaultColDef ={
        flex:1,
        sortable: true,
        editable: true,
        filter:true,
        floatingFilter: true
    };

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://carrestservice-carshop.rahtiapp.fi/cars')
        .then( response =>{
            if (!response.ok)
                throw new Error(response.statusText);
            return response.json();
        } )
        .then( data => setCars(data._embedded.cars))
        .catch( err => console.error(err))
    };

    const handleExport = () =>{
       gridApiRef.current.exportDataAsCsv();
    }

    return(
        <>
            <Button color='secondary' onClick={() =>handleExport()}>Download export file</Button>
            <div className="ag-theme-material" style={{width: 1200, height: 500}}>
                <AgGridReact 
                    ref={gridRef}
                    onGridReady={ params => { 
                        gridRef.current = params.api; 
                        gridApiRef.current = params.api}
                    }
                    rowData={cars}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                />
            </div> 
        </>
    )
}