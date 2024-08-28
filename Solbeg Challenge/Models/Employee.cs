using System;
using System.Collections.Generic;

namespace Solbeg_Challenge.Models
{
    public partial class Employee
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public int? Age { get; set; }
        public string? Sex { get; set; }
    }
}
