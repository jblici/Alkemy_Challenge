import React from 'react';
import {Modal, Button} from 'react-bootstrap'
import Select from 'react-select';

function NewTransaction({show, handleClose}) {

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>New Transaction</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input className='form-control' type='number' min='0' placeholder='$' />
                <div className="mb-3 form-check">
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="Income"/>
                        <label className="form-check-label" htmlFor="inlineCheckbox1">Income</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="Expense"/>
                        <label className="form-check-label" htmlFor="inlineCheckbox2">Expense</label>
                    </div>
                </div>
                <div className='row'>
                    <div className="mb-3 col-6">
                        <label htmlFor="category" className="form-label">Category</label>
                        <Select className="" options={options} id="category"/>
                    </div>
                    <div className="mb-3 col-6">
                        <label htmlFor="date" className="form-label">Date</label>
                        <input type="date" className="form-control" id="description"/>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea rows="2" className="form-control" id="description"/>
                </div>
            </Modal.Body>
            <Modal.Footer centered='true'>
                <Button variant="danger" onClick={handleClose}>Cancel</Button>
                <Button variant="primary" onClick={handleClose}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default NewTransaction;