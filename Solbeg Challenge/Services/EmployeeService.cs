using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Solbeg_Challenge.Models;
using Solbeg_Challenge.Repos;

namespace Solbeg_Challenge.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepo;

        public EmployeeService(IEmployeeRepository employeeRepo)
        {
            _employeeRepo = employeeRepo;
        }


        public List<Employee> GetEmployees()
        {
            return _employeeRepo.GetEmployees();
        }
        public List<Employee> DeleteEmployee(int employeeId)
        {
            return _employeeRepo.DeleteEmployee(employeeId);
        }

        public bool UpdateEmployee(Employee employee)
        {
            return _employeeRepo.UpdateEmployee(employee);
        }

        public List<Employee> AddEmployee(Employee employee)
        {

            return _employeeRepo.AddEmployee(employee);
        }


    }
}
