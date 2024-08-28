using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Solbeg_Challenge.Models;
using Solbeg_Challenge.Services;

namespace Solbeg_Challenge.Repos
{
    public class EmployeeRepository : IEmployeeRepository
    {

        private readonly SolbegChallengeContext _dbContext;

        public EmployeeRepository(SolbegChallengeContext dbContext)
        {
            _dbContext=dbContext;
        }


        public List<Employee> GetEmployees()
        {
            try
            {
                return _dbContext.Employees.ToList();
            }
            catch (Exception ex)
            {
                // Lanzar una excepción personalizada con un mensaje específico
                throw new Exception("An error occurred while getting employees from the database.", ex);
            }
        }

        public List<Employee> DeleteEmployee(int employeeId)
        {
            var empDel = _dbContext.Employees.FirstOrDefault(x => x.Id == employeeId);
            if (empDel != null)
            {
                _dbContext.Employees.Remove(empDel);
                _dbContext.SaveChanges();
            }

            return _dbContext.Employees.ToList();
        }

        public bool UpdateEmployee(Employee employee)
        {
            var emUpd = _dbContext.Employees.FirstOrDefault(x => x.Id == employee.Id);
            if (emUpd != null)
            {
                emUpd.FirstName = employee.FirstName;
                emUpd.LastName = employee.LastName;
                emUpd.Age = employee.Age;
                emUpd.Sex = employee.Sex;

                _dbContext.SaveChanges();
                return true;
            }
            return false;
        }

        public List<Employee> AddEmployee(Employee employee)
        {
            employee.Id = 0;
            _dbContext.Employees.Add(employee);
            _dbContext.SaveChanges();
            

            return _dbContext.Employees.ToList();

        }

    }
}
