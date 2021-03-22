using Microsoft.EntityFrameworkCore.Migrations;

namespace Projekat_Web_Backend.Migrations
{
    public partial class V4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MyHangar",
                table: "Worker");

            migrationBuilder.DropColumn(
                name: "MyJob",
                table: "Worker");

            migrationBuilder.DropColumn(
                name: "MyVehicle",
                table: "Worker");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "MyHangar",
                table: "Worker",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MyJob",
                table: "Worker",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MyVehicle",
                table: "Worker",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
