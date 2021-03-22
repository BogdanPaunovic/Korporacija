using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Projekat_Web_Backend.Models
{
    [Table("Hangar")]
    public class Hangar
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Name")]
        [MaxLength(255)]
        public string Name { get; set; }

        [Column("Type")]
        [MaxLength(255)]
        public string Type { get; set; }

        [Column("NumberOfVehicles")]
        public int NumberOfVehicles { get; set; }
        
        public virtual List<Vehicle> Vehicles { get; set; }

        [JsonIgnore]
        public Corporation Corporation { get; set; }
    }
}