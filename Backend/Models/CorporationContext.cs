using Microsoft.EntityFrameworkCore;

namespace Projekat_Web_Backend.Models
{
    public class CorporationContext : DbContext
    {
        public DbSet<Corporation> Corporations { get; set;}
        public DbSet<Hangar> Hangars { get; set;}
        public DbSet<Vehicle> Vehicles { get; set;}
        public DbSet<Job> Jobs { get; set; }
        public DbSet<Worker> Workers { get; set;}

        public CorporationContext(DbContextOptions options) : base(options)
        {

        }
    }
}