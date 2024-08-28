import { useState, useEffect } from "react";
import "./Employee.css";  

import ModalUpdate from "./ModalUpdate";
import ModalAddEmployee from "./ModalAddEmployee";
import ModalDelete from "./ModalDelete";

const EmployeesTable = () => {
    const [employees, setEmployees] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState({
        id: '',
        firstName: '',
        lastName: '',
        age: '',
        sex: ''
    });
    const [employeeToDelete, setEmployeeToDelete] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetch("api/employee/GetEmployees")
            .then(response => response.json())
            .then(responseJson => {
                setEmployees(responseJson);
            })
            .catch(error => console.error("Error fetching employees:", error));
    }, []);

    const deleteEmployee = (id) => {
        fetch(`api/employee/DeleteEmployee/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(responseJson => {
                setEmployees(responseJson);
            })
            .catch(error =>
                console.error("Error deleting employee:", error)
            );
    };

    const handleDeleteClick = (employee) => {
        setEmployeeToDelete(employee);
        setIsConfirmationModalOpen(true);
    };

    const confirmDelete = () => {
        if (employeeToDelete) {
            deleteEmployee(employeeToDelete.id);
            setIsConfirmationModalOpen(false);
            setEmployeeToDelete(null);
        }
    };

    const openModal = (employee) => {
        setSelectedEmployee(employee);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedEmployee({
            id: '',
            firstName: '',
            lastName: '',
            age: '',
            sex: ''
        });
        setIsModalOpen(false);
    };

    const validations = (employee) => {
        if (employee.firstName === '') {
            setErrorMessage("Invalid First Name");
            return false;
        }

        if (employee.lastName === '') {
            setErrorMessage("Invalid Last Name");
            return false;
        }
        if (employee.age < 18 || employee.age > 100) {
            setErrorMessage("Age is not in range");
            return false;
        }
        if (employee.sex?.toUpperCase() !== 'M' && employee.sex?.toUpperCase() !== 'F') {
            setErrorMessage("Gender Invalid");
            return false;
        }
        return true;
    };

    const updateEmployee = () => {
        if (!validations(selectedEmployee)) {
            return;
        }

        fetch(`api/employee/UpdateEmployee/${selectedEmployee.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(selectedEmployee)
        })
            .then(response => response.json())
            .then(responseJson => {
                setEmployees(responseJson);
                closeModal();
            })
            .catch(error =>
                console.error("Error updating employee:", error)
            ).finally(() => {
                setErrorMessage("");
            });
    };

    const addEmployee = (employee) => {
        if (!validations(employee)) {
            return;
        }

        employee.sex = employee?.sex?.toUpperCase();

        fetch('api/employee/AddEmployee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee)
        })
            .then(response => response.json())
            .then(responseJson => {
                setEmployees(responseJson);
                setIsAddModalOpen(false);
            })
            .catch(error => console.error("Error adding employee:", error))
            .finally(() => {
                setErrorMessage("");
            });
    };

    return (
        <div className="container">
            <h1>Employees</h1>
            <div className="row">
                <div className="col-sm-12">
                    {employees.length > 0 ? (
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>First and Last Name</th>
                                        <th>Years</th>
                                        <th>Sex</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees?.map((item) => (
                                        <tr key={item?.id}>
                                            <td>{item?.id}</td>
                                            <td>{item?.firstName} {item?.lastName}</td>
                                            <td>{item?.age}</td>
                                            <td>{item?.sex}</td>
                                            <td>
                                                <button onClick={() => handleDeleteClick(item)} className="btn btn-danger">Delete</button>
                                                <button onClick={() => openModal(item)} className="btn btn-primary">Modify</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <h1>There are no employees in the DB</h1>
                    )}

                    <button onClick={() => setIsAddModalOpen(true)} className="btn btn-success">Add New</button>
                </div>
            </div>

            {/* Modales */}
            {isModalOpen && (
                <ModalUpdate
                    selectedEmployee={selectedEmployee}
                    setSelectedEmployee={setSelectedEmployee}
                    closeModal={closeModal}
                    updateEmployee={updateEmployee}
                    errorMessage={errorMessage}
                />
            )}
            {isAddModalOpen && (
                <ModalAddEmployee
                    onClose={() => setIsAddModalOpen(false)}
                    onAdd={addEmployee}
                    errorMessage={errorMessage}
                />
            )}

            {isConfirmationModalOpen && (
                <ModalDelete
                    isOpen={isConfirmationModalOpen}
                    onClose={() => setIsConfirmationModalOpen(false)}
                    onConfirm={confirmDelete}
                    message="Are you sure you want to delete this employee?"
                />
            )}
        </div>
    );
}

export default EmployeesTable;
