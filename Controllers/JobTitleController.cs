using JobTitle.Models;
using JobTitle.Repositories;
using Microsoft.AspNetCore.Mvc;



namespace JobTitle.Controllers
{
    [Route("api/jobtitles")]
    [ApiController]
    public class JobTitleController : ControllerBase
    {
        private readonly JobTitleRepository _repository;

        public JobTitleController(JobTitleRepository repository)
        {
            _repository = repository;
        }

        [HttpPost("insert")]
        public async Task<IActionResult> InsertJobTitle([FromBody] JobTitleRequest request)
        {
            if (request == null)
                return BadRequest("Invalid request data.");

            try
            {
                int insertedId = await _repository.InsertJobTitleAsync(request);
                return Ok(new { InsertedID = insertedId, Message = "Job title inserted successfully!" });
            }


            catch (Exception ex)
            {
                return StatusCode(500, new { Error = "An error occurred while inserting the job title.", Details = ex.Message });
            }
        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateJobTitle([FromBody] UpdateJobTitleRequest request)
        {
            if (request == null)
                return BadRequest("Invalid request data.");

            try
            {
                await _repository.UpdateJobTitleNewAsync(request);
                return Ok(new { Message = "Job title updated successfully!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = "An error occurred while updating the job title.", Details = ex.Message });
            }
        }
        [HttpGet("get")]
        public async Task<IActionResult> GetAllJobTitles()
        {
            try
            {
                List<GetJobTitlesRequest> jobTitles = await _repository.GetAllJobTitlesAsync();
                return Ok(jobTitles);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = "An error occurred while fetching job titles.", Details = ex.Message });
            }
        }



    }

}