using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.IO;

namespace key4intranet.Api.Docs {

    [Serializable]
    public class Document {
 
        public String id {get;}
        [JsonIgnore]
        private FileInfo file; //for back-end usage
        public String fileName {get;} //for front-end usage
        public String extension {get;}
        [JsonConverter(typeof(StringEnumConverter))]
        public Departement group {get;}
        public int permissionLevel {get;}
        
        public Document(String i_d, FileInfo f, Departement depart, int permission_level) {
            this.id = i_d;
            this.file = f;
            this.fileName = f.Name.Split(".")[0].Substring(6);
            this.extension = f.Extension.Substring(1);
            this.group = depart;
            this.permissionLevel = permission_level;
        }
        
        public Document() {
        }

        public String getId() {
            return this.id;
        }

        public String getPath() {
            return this.file.FullName;
        }

        public Departement getGroup() {
            return this.group;
        }
    }
}
