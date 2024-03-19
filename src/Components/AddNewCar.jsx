import React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddNewCar(props){
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState({
        brand: '',
        model: '',
        color: '',
        fuel: '',
        modelYear: 0,
        price: 0
    });

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e)=>{
        setCar({...car, [e.target.name]: e.target.value})
    }
    const addCar = () =>{
        props.saveCar(car);
        handleClose();
    }

    return(
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add new car
            </Button>
            <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    const email = formJson.email;
                    console.log(email);
                    handleClose();
                },
            }}
        >
            <DialogTitle>New car information</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        name="brand"
                        value={car.brand}
                        label="Brand"
                        onChange={e=>handleInputChange(e)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        name="model"
                        value={car.model}
                        label="Model"
                        onChange={e=>handleInputChange(e)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        name="color"
                        value={car.color}
                        label="Color"
                        onChange={e=>handleInputChange(e)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        name="fuel"
                        value={car.fuel}
                        label="Fuel"
                        onChange={e=>handleInputChange(e)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        name="modelYear"
                        value={car.modelYear}
                        label="Model Year"
                        onChange={e=>handleInputChange(e)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        name="price"
                        value={car.price}
                        label="Price"
                        onChange={e=>handleInputChange(e)}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={addCar}>Save</Button>
            </DialogActions>
        </Dialog>
        </div>
    )
}