using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace key4intranet.Api.Docs {
    public interface IDocumentLibrary{
        void resetLibrary();
        Document GetDocumentFromLibrary(String fileId);
        Boolean HasFile(String fileId);
        void addToLibrary(Document d);
        List<Document> GetAllDocuments();
        List<Document> GetAllDocumentsFromGroup(Departement departement);
        Boolean isEmpty();
    }

    public class DocumentLibrary: IDocumentLibrary
    {
        private List<Document> library;

        public DocumentLibrary() {
            library = new List<Document>();
        }

        public void resetLibrary() {
            this.library.Clear();
        }

        public Document GetDocumentFromLibrary(String fileId) {
            Document r;
            if(this.HasFile(fileId)) {
                int iterator = 0;
                int index = -1;
                foreach(Document d in library) {
                    if(d.getId().ToUpper().Equals(fileId.ToUpper())) {
                        index = iterator;
                    }
                    ++iterator;
                }
                r = library[index];
            } else {
               r = new Document();
            }
            return r;
        }

        public Boolean HasFile(String fileId) {
            Boolean r = false;
            foreach(Document d in library) {
                if(d.getId().ToUpper().Equals(fileId.ToUpper())) {
                    return true;
                }
            }
            return r;
        }

        public void addToLibrary(Document d) {
            library.Add(d);
        }

        public List<Document> GetAllDocuments() {
            return this.library;
        }

        public List<Document> GetAllDocumentsFromGroup(Departement departement) {
            List<Document> rl = new List<Document>();
            List<Document> library = this.GetAllDocuments();

            foreach(Document doc in library) {
                if(doc.getGroup().Equals(departement)) {
                    rl.Add(doc);
                }
            }

            return rl;
        }

        public Boolean isEmpty() {
            return (this.library.Count == 0);
        }

    }
}
