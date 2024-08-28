using Microsoft.AspNetCore.Mvc;
using Solbeg_Challenge.Models;

namespace Solbeg_Challenge.Services
{
    public interface IEmployeeService
    {
        public List<Employee> GetEmployees();
        public List<Employee> DeleteEmployee(int employeeId);
        public bool UpdateEmployee(Employee employee);
        public List<Employee> AddEmployee(Employee employee);
    }
}
