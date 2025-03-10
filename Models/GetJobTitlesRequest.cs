namespace JobTitle.Models
{
    public class GetJobTitlesRequest
    {
        public string JobRole { get; set; }
        public string Title { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedOn { get; set; }
        public string? ModifiedBy { get; set; }
        public string? ModifiedOn { get; set; }
    }
}