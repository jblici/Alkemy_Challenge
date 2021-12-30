import React from 'react';
import {Container, Form} from 'react-bootstrap'
import Select from 'react-select';

function NewTransaction(props) {

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    return (
        <Container style={{width: '25%'}}>
            <Form>
                <input className='form-control' type='number' min='0' placeholder='$' />
                <div className="mb-3 form-check">
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="Income"/>
                        <label class="form-check-label" for="inlineCheckbox1">Income</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="Expense"/>
                        <label class="form-check-label" for="inlineCheckbox2">Expense</label>
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
                <button type="submit" className="btn btn-primary">Submit</button>
            </Form>
        </Container>
    );
}

export default NewTransaction;