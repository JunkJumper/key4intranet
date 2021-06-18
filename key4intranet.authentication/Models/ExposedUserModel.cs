using System;
using System.Collections.Generic;
using System.Text;

namespace key4intranet.authentication.Models
{
    public class ExposedUserModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public List<string> Roles { get; set; }
        public string Token { get; set; }
    }
}
