using Microsoft.EntityFrameworkCore.Migrations;

namespace Projekat_Web_Backend.Migrations
{
    public partial class V6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "MyHangar",
                table: "Worker",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MyJob",
                table: "Worker",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MyVehicle",
                table: "Worker",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
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
    }
}
