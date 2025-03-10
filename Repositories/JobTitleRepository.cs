using Dapper;
using JobTitle.Models;
using System.Data;

using Microsoft.Data.SqlClient;

namespace JobTitle.Repositories
{
    public class JobTitleRepository
    {

        private readonly string _connectionString;

        public JobTitleRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public async Task<int> InsertJobTitleAsync(JobTitleRequest request)
        {
            using (IDbConnection db = new SqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@JobRole", request.JobRole);
                parameters.Add("@Title", request.Title);
                parameters.Add("@CreatedBy", request.CreatedBy);
                parameters.Add("@CreatedOn", request.CreatedOn);
                parameters.Add("@ModifiedBy", request.ModifiedBy);
                parameters.Add("@ModifiedOn", request.ModifiedOn);

                return await db.ExecuteScalarAsync<int>("InsertJobTitle", parameters, commandType: CommandType.StoredProcedure);
            }
        }
        public async Task UpdateJobTitleNewAsync(UpdateJobTitleRequest request)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.ExecuteAsync("UpdateJobTitleNew",
                    new
                    {
                        OldTitle = request.OldTitle,
                        OldRole = request.OldRole,
                        JobRole = request.JobRole,
                        Title = request.Title,
                        CreatedBy = request.CreatedBy,
                        CreatedOn = request.CreatedOn,
                        ModifyBy = request.ModifyBy,
                        ModifyOn = request.ModifyOn
                    },
                    commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<List<GetJobTitlesRequest>> GetAllJobTitlesAsync()
        {
            using var connection = new SqlConnection(_connectionString);
            var result = await connection.QueryAsync<GetJobTitlesRequest>(
                "GetAllJobTitles",
                commandType: CommandType.StoredProcedure
            );
            return result.AsList();
        }
    }
}
