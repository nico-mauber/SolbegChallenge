import { useState } from "react";

const ModalAddEmployee = ({ onClose, onAdd, errorMessage='' }) => {
    const [newEmployee, setNewEmployee] = useState({
        firstName: '',
        lastName: '',
        age: '',
        sex: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEmployee({
            ...newEmployee,
            [name]: value
        });
    };

    const handleAdd = () => {
        onAdd(newEmployee); 
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Add New Employee</h2>
                <form>
                    <div className="form-group">
                        <label>First Name:</label>
                        <input
                            type="text"
                            name="firstName"
                            value={newEmployee.firstName}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name:</label>
                        <input
                            type="text"
                            name="lastName"
                            value={newEmployee.lastName}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Age:</label>
                        <input
                            type="number"
                            name="age"
                            value={newEmployee.age}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Sex:</label>
                        <input
                            type="text"
                            name="sex"
                            value={newEmployee.sex}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                </form>
                <h6>{errorMessage}</h6>
                <div className="modal-actions">
                    <button onClick={onClose} className="btn btn-secondary">Cancel</button>
                    <button onClick={handleAdd} className="btn btn-primary">Add</button>
                </div>
            </div>
        </div>
    );
}

export default ModalAddEmployee;
