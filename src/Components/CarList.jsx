import React, { useEffect } from 'react';
import { useState, useRef } from 'react';

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import Snackbar from '@mui/material/Snackbar';
import AddNewCar from './AddNewCar';
import EditCar from './EditCar';
import { Stack } from '@mui/material';

export default function CarList(){
    const [cars, setCars] = useState([]);
    const [open, setOpen] = useState(false);
    const gridRef = useRef();
    const gridApiRef = useRef();
    const [columnDefs, setColumnDefs] = useState([
        {field: 'brand', checkboxSelection: true},
        {field: 'model'},
        {field: 'color'},
        {field: 'fuel'},
        {field: 'modelYear'},
        {field: 'price'},
        {sortable: false, filter: false, headerCheckboxSelection: false,
            cellRenderer: (params)=>{
                return(<EditCar car={params.data} editCar={editCar} />);
        }},
        {sortable: false, filter: false, headerCheckboxSelection: false,
        cellRenderer: (params)=>{
            return(
                <>
                <Button size="small" color='error' onClick={()=>handleDeleteRow(params.data._links.self.href)}>Delete</Button>
                </>
            );
        }},
    ]);
    const defaultColDef ={
        flex:1,
        sortable: true,
        filter:true,
        floatingFilter: true,
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
    const handleDeleteRow = (link)=>{
        // console.log(link); 
        if(window.confirm('Are you sure?')) {
            fetch(link, {method: 'DELETE'})
            .then(response => fetchData())
            .catch(err => console.error(err))
        setOpen(true);
        }
    }
    const editCar = (car, link)=> {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(car)
        })
        .then(response => fetchData())
        .catch(err => console.error(err))

    }
    const saveCar = (car) => {
        fetch('https://carrestservice-carshop.rahtiapp.fi/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(car)
        })
        .then(response => fetchData())
        .catch(err => console.error(err))
    }

    const handleDeleteSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return(
        <>
            <Stack direction='row' margin={1} spacing={2} justifyContent='center'>
            <AddNewCar saveCar={saveCar} />
            <Button variant='contained' size='small' color='secondary' startIcon={<DownloadIcon />} sx={{mt:1} } onClick={() =>handleExport()}>Download export file</Button>
            </Stack>
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
                    pagination= {true}
                    paginationPageSizeSelector= {false}
                    paginationPageSize={6}
                />
            </div> 
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleDeleteSnackClose}
                message="Car deleted"
            />
        </>
    )
}