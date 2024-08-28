using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Solbeg_Challenge.Models;
using Solbeg_Challenge.Services;

namespace Solbeg_Challenge.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {


        private readonly IEmployeeService _employeeService;

        public EmployeeController( IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet]
        [Route("GetEmployees")]
        public IActionResult GetEmployees()
        {
            try
            {
                List<Employee> employees = _employeeService.GetEmployees();
                return StatusCode(StatusCodes.Status200OK, employees);
            }
            catch (Exception ex)
            {
                var errorResponse = new { Message = ex.Message };
                return StatusCode(StatusCodes.Status500InternalServerError, errorResponse);
            }
        }

        [HttpDelete]
        [Route("DeleteEmployee/{employeeId}")]
        public IActionResult DeleteEmployee(int employeeId)
        {
            var employees = _employeeService.DeleteEmployee(employeeId);
            return GetEmployees();
        }

        [HttpPut]
        [Route("UpdateEmployee/{employeeId}")]
        public IActionResult UpdateEmployee(Employee employee)
        {
            var employees = _employeeService.UpdateEmployee(employee);
            return GetEmployees();
        }

        [HttpPost]
        [Route("AddEmployee")]
        public IActionResult AddEmployee([FromBody] Employee employee)
        {
            try
            {
                var employees = _employeeService.AddEmployee(employee);
                return GetEmployees();
            }
            catch (Exception ex)
            {
                var errorResponse = new { Message = ex.Message };
                return StatusCode(StatusCodes.Status500InternalServerError, errorResponse);
            }


        }

    }
}
