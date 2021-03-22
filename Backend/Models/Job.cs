using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Projekat_Web_Backend.Models
{
    [Table("Job")]
    public class Job
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Name")]
        public string Name { get; set; }

        [Column("Salary")]
        public int Salary { get; set; }
        
        [Column("MaxWorkers")]
        public int MaxWorkers { get; set; }
        
        public virtual List<Worker> Workers { get; set; }

        [JsonIgnore]
        public Vehicle Vehicle { get; set; }
    }
}