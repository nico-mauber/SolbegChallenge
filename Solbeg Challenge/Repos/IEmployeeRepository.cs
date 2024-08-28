using Microsoft.AspNetCore.Mvc;
using Solbeg_Challenge.Models;

namespace Solbeg_Challenge.Repos
{
    public interface IEmployeeRepository
    {
        public List<Employee> GetEmployees();
        public List<Employee> DeleteEmployee(int employeeId);
        public bool UpdateEmployee(Employee employee);
        public List<Employee> AddEmployee(Employee employee);
    }
}
