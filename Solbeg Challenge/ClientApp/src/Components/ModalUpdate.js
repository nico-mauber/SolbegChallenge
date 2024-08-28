const ModalUpdate = ({ selectedEmployee, setSelectedEmployee, closeModal, updateEmployee, errorMessage = '' }) => {

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedEmployee((prevEmployee) => ({
            ...prevEmployee,
            [name]: value,
        }));
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Modify Employee</h2>
                <form>
                    <div className="form-group">
                        <label>First Name:</label>
                        <input
                            type="text"
                            name="firstName"
                            value={selectedEmployee.firstName || ''}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name:</label>
                        <input
                            type="text"
                            name="lastName"
                            value={selectedEmployee.lastName || ''}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Age:</label>
                        <input
                            type="number"
                            name="age"
                            value={selectedEmployee.age || ''}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Sex:</label>
                        <input
                            type="text"
                            name="sex"
                            value={selectedEmployee.sex || ''}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                </form>
                <h6>{errorMessage}</h6>
                <div className="modal-actions">
                    <button onClick={closeModal} className="btn btn-secondary">Cancel</button>
                    <button onClick={updateEmployee} className="btn btn-primary">Confirm</button>
                </div>
            </div>
        </div>
    );
};

export default ModalUpdate;
