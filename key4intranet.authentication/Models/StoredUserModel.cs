using System.Collections.Generic;

namespace key4intranet.authentication.Models
{
    public class StoredUserModel
    {
        public string Id { get; set; }
        public string Mail { get; set; }
        public string Pass { get; set; }
        public string Name { get; set; }
        public List<string> Roles { get; set; }
    }
}
