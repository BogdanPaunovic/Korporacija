using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Projekat_Web_Backend.Models
{
    [Table("Vehicle")]
    public class Vehicle
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

        public virtual List<Job> Jobs { get; set; }

        [JsonIgnore]
        public Hangar Hangar { get; set; }
    }
}