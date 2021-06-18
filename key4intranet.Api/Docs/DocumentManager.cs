using System;
using System.Collections.Generic;
using System.IO;

namespace key4intranet.Api.Docs
{
    public interface IDocumentManager
    {
        public DocumentLibrary dl { get; set; }
        public void KnowAllDocuments();
        public Departement GetDepartement(String file);
    }
    public class DocumentManager : IDocumentManager
    {
        private readonly IDocumentPathManager _documentPathManager; 
        public DocumentLibrary dl { get; set; }


        public DocumentManager(IDocumentPathManager documentPathManager)
        {
            _documentPathManager = documentPathManager ?? throw new ArgumentNullException(nameof(documentPathManager));
            this.dl = new DocumentLibrary();
            KnowAllDocuments();
        }

        public void KnowAllDocuments()
        {
            DirectoryInfo d = new DirectoryInfo(_documentPathManager.KnowFolder());
            List<FileInfo> files = new List<FileInfo>(d.GetFiles("*.*", SearchOption.AllDirectories));
            if (!dl.isEmpty())
            {
                dl.resetLibrary();
            }

            foreach (FileInfo file in files)
            {
                if (!(file.Name.ToLower().Contains(".git")))
                {
                    dl.addToLibrary(new Document(GenerateID(file.Name), file, GetDepartement(file.Name), 1));
                }
            }
        }

        public Departement GetDepartement(String file)
        {
            String check;
            if (file.Length >= 3)
            {
                check = file.Substring(0, 3).ToUpper();
            }
            else
            {
                check = "ERR";
            }
            switch (check)
            {
                case "OPE":
                    return Departement.OPERATIONNEL;
                case "COM":
                    return Departement.COMMERCIAL;
                case "ADM":
                    return Departement.ADMISTRATIF;
                case "DEV":
                    return Departement.DEV;
                case "DIR":
                    return Departement.DIRECTION;
                default:
                    return Departement.ERR;
            }
        }

        private String GenerateID(String file)
        {
            return file.Substring(0, 3).ToUpper() + file.Substring(3, 3);
        }

    }
}
