using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Projekat_Web_Backend.Models
{
    [Table("Corporation")]
    public class Corporation
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Name")]
        [MaxLength(255)]
        public string Name { get; set; }
        
        public virtual List<Hangar> Hangari { get; set; }
    }
}