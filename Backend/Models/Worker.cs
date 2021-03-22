using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Projekat_Web_Backend.Models
{
    [Table("Worker")]
    public class Worker
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Name")]
        [MaxLength(255)]
        public string Name { get; set; }

        [Column("Type")]
        public string Type { get; set; }

        [Column("MonthlyExpenses")]
        public int MonthlyExpenses { get; set; }

        [Column("MyHangar")]
        [MaxLength(255)]
        public string MyHangar { get; set; }

        [Column("MyVehicle")]
        [MaxLength(255)]
        public string MyVehicle { get; set; }

        [Column("MyJob")]
        [MaxLength(255)]
        public string MyJob { get; set; }

        [JsonIgnore]
        public Job Job { get; set; }
    }
}