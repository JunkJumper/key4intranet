using key4.HttpExceptions;
using key4intranet.Api.Docs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Newtonsoft.Json;
using System;
using System.IO;
using System.Threading.Tasks;

namespace key4intranet.Api.Controllers
{

    [ApiController]
    [Authorize]
    public class DownloadController : ControllerBase
    {
        private readonly IDocumentManager _documentManager;

        public DownloadController(IDocumentManager documentManager)
        {
            _documentManager = documentManager ?? throw new ArgumentNullException(nameof(documentManager));
        }

        [Route("api/download/id/{fileId}/")]
        public Task<ActionResult> SearchFile(String fileId)
        {
            if (_documentManager.dl.HasFile(fileId))
            {
                return DownloadFile(_documentManager.dl.GetDocumentFromLibrary(fileId));
            }
            else
            {
                throw new HttpNotFoundException("error - file not found in library");
            }
        }

        [Route("api/download/getLibrary/")]
        public IActionResult getFilesFromLibraryToJSON()
        {
            _documentManager.KnowAllDocuments();
            return Ok(_documentManager.dl.GetAllDocuments());
        }

        [Route("api/download/getLibrary/{group}/")]
        public IActionResult getFilesFromLibraryToJSONwithSpecificDepartment(String group)
        {
            _documentManager.KnowAllDocuments();
            return Ok(_documentManager.dl.GetAllDocumentsFromGroup(_documentManager.GetDepartement(group)));
        }

        [HttpGet]
        private async Task<ActionResult> DownloadFile(Document d)
        {
            // validation and get the file

            var filePath = d.getPath();
            if (!System.IO.File.Exists(filePath))
            {
                await System.IO.File.WriteAllTextAsync(filePath, d.fileName);
            }

            var provider = new FileExtensionContentTypeProvider();
            if (!provider.TryGetContentType(filePath, out var contentType))
            {
                contentType = "application/octet-stream";
            }

            var bytes = await System.IO.File.ReadAllBytesAsync(filePath);
            return File(bytes, contentType, Path.GetFileName(filePath));
        }

    }
}
