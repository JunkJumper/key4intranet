using Microsoft.Extensions.Configuration;
using System;


namespace key4intranet.Api.Docs{
    public interface IDocumentPathManager
    {
        String BuildFullPathToFile(String fileName, String format);
        public String BuildFullPathToFile(String subFolderPath, String fileName, String format);
        public String KnowFolder();
    }

    public class DocumentPathManager : IDocumentPathManager
    {

        private readonly String sourceFolderPath;
        private readonly String ressourcesPath;

        public DocumentPathManager(IConfiguration config)
        {
            sourceFolderPath = config.GetSection("Settings:sourceFolderPath").Value;
            ressourcesPath = config.GetSection("Settings:ressourcesPath").Value;
        }

        private  String BuildFileName(String fileName, String format) {
            return fileName + "." + format.ToLower();
        }

        public  String BuildFullPathToFile(String fileName, String format) {
            return BuildFullPathToFile("", fileName, format);
        }

        public  String BuildFullPathToFile(String subFolderPath, String fileName, String format) {
            return sourceFolderPath + ressourcesPath + subFolderPath + BuildFileName(fileName, format);
        }

        public  String KnowFolder() {
            return sourceFolderPath + ressourcesPath;
        }
    }
}
