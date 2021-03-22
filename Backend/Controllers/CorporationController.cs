using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Projekat_Web_Backend.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Cors;

namespace Projekat_Web_Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CorporationController : ControllerBase
    {

        public CorporationContext Context { get; set; }

       public CorporationController(CorporationContext context)
        {
            Context = context;
        }

        [Route("GetCorporations")]
        [HttpGet]
        public async Task<List<Corporation>> GetCorporations()
        {
            return await Context.Corporations.Include(h => h.Hangari)
            .ThenInclude(v => v.Vehicles)
            .ThenInclude(j => j.Jobs)
            .ThenInclude(w => w.Workers).ToListAsync();
        }

        [Route("GetHangars")]
        [HttpGet]
        public async Task<List<Hangar>> GetHangars()
        {
            return await Context.Hangars.Include(q => q.Vehicles).ToListAsync();
        }

        [Route("GetVehicles")]
        [HttpGet]
        public async Task<List<Vehicle>> GetVehicles()
        {
            return await Context.Vehicles.Include(q => q.Jobs).ToListAsync();
        }

        [Route("GetJobs")]
        [HttpGet]
        public async Task<List<Job>> GetJobs()
        {
            return await Context.Jobs.Include(q => q.Workers).ToListAsync();
        }

        [Route("PostHangar/{idCorporation}")]
        [HttpPost]
        public async Task<ActionResult<Hangar>> PostHangar(int idCorporation, [FromBody] Hangar hangar)
        {
            var corporation = await Context.Corporations.FindAsync(idCorporation);
            if(corporation == null)
                return StatusCode(404);

            if(hangar.Type != "Vazduh" && hangar.Type != "Zemlja" && hangar.Type != "Voda")
                return StatusCode(406);

            hangar.Corporation = corporation;
            Context.Hangars.Add(hangar);
            await Context.SaveChangesAsync();
            Hangar result = Context.Hangars.FirstOrDefault(h => h.Name == hangar.Name);
            if(result == null)
                return BadRequest("Hangar ne postoji!");

            return result;
        }

        [Route("PostVehicle/{idHangar}")]
        [HttpPost]
        public async Task<ActionResult<Vehicle>> PostVehicle(int idHangar, [FromBody] Vehicle vehicle)
        {
            var hangar = await Context.Hangars.FindAsync(idHangar);
            if(hangar == null)
                return StatusCode(404);
            
            if(vehicle.Type != hangar.Type)
                return StatusCode(406);

            vehicle.Hangar = hangar;
            Context.Vehicles.Add(vehicle);
            await Context.SaveChangesAsync();
            Vehicle result = Context.Vehicles.FirstOrDefault(v => v.Name == vehicle.Name);
            if(result == null)
                return BadRequest("Vozilo ne postoji!");

            if(result.Type == "Vazduh")
            {
                Job j1 = new Job();
                j1.Name = "Pilot";
                j1.Salary = 50000;
                j1.MaxWorkers = 1;
                j1.Vehicle = result;
                Context.Jobs.Add(j1);
                await Context.SaveChangesAsync();

                Job j2 = new Job();
                j2.Name = "Kopilot";
                j2.Salary = 38000;
                j2.MaxWorkers = 2;
                j2.Vehicle = result;
                Context.Jobs.Add(j2);
                await Context.SaveChangesAsync();

                Job j3 = new Job();
                j3.Name = "Stjuardesa";
                j3.Salary = 10000;
                j3.MaxWorkers = 5;
                j3.Vehicle = result;
                Context.Jobs.Add(j3);
                await Context.SaveChangesAsync();
            }
            else if(result.Type == "Voda")
            {
                Job j1 = new Job();
                j1.Name = "Kapetan";
                j1.Salary = 35000;
                j1.MaxWorkers = 1;
                j1.Vehicle = result;
                Context.Jobs.Add(j1);
                await Context.SaveChangesAsync();

                Job j2 = new Job();
                j2.Name = "Prvi oficir";
                j2.Salary = 30000;
                j2.MaxWorkers = 1;
                j2.Vehicle = result;
                Context.Jobs.Add(j2);
                await Context.SaveChangesAsync();

                Job j3 = new Job();
                j3.Name = "Oficir";
                j3.Salary = 15000;
                j3.MaxWorkers = 10;
                j3.Vehicle = result;
                Context.Jobs.Add(j3);
                await Context.SaveChangesAsync();

                Job j4 = new Job();
                j4.Name = "Sef kuhinje";
                j4.Salary = 20000;
                j4.MaxWorkers = 1;
                j4.Vehicle = result;
                Context.Jobs.Add(j4);
                await Context.SaveChangesAsync();

                Job j5 = new Job();
                j5.Name = "Konobar";
                j5.Salary = 10000;
                j5.MaxWorkers = 5;
                j5.Vehicle = result;
                Context.Jobs.Add(j5);
                await Context.SaveChangesAsync();
            }
            else if(result.Type == "Zemlja")
            {
                Job j1 = new Job();
                j1.Name = "Vozac";
                j1.Salary = 34000;
                j1.MaxWorkers = 1;
                j1.Vehicle = result;
                Context.Jobs.Add(j1);
                await Context.SaveChangesAsync();

                Job j2 = new Job();
                j2.Name = "Pomocni vozac";
                j2.Salary = 17000;
                j2.MaxWorkers = 1;
                j2.Vehicle = result;
                Context.Jobs.Add(j2);
                await Context.SaveChangesAsync();

                Job j3 = new Job();
                j3.Name = "Kondukter";
                j3.Salary = 13000;
                j3.MaxWorkers = 2;
                j3.Vehicle = result;
                Context.Jobs.Add(j3);
                await Context.SaveChangesAsync();

                Job j4 = new Job();
                j4.Name = "Sanker";
                j4.Salary = 15000;
                j4.MaxWorkers = 1;
                j4.Vehicle = result;
                Context.Jobs.Add(j4);
                await Context.SaveChangesAsync();
            }
            return result;
        }

        [Route("PostWorker/{idJob}")]
        [HttpPost]
        public async Task<ActionResult<Worker>> PostWorker(int idJob, [FromBody] Worker worker)
        {
            var job = await Context.Jobs.FindAsync(idJob);
            if(job == null)
                return StatusCode(404);

            if(worker.MonthlyExpenses > job.Salary)
                return BadRequest("Plata ovog posla je manja u odnosu na troskove radnika! Izaberite drugi posao!");

            worker.Job = job;
            Context.Workers.Add(worker);
            await Context.SaveChangesAsync();
            Worker result = Context.Workers.FirstOrDefault(w => w.Name == worker.Name);
            if(result == null)
                return BadRequest("Radnik ne postoji!");
            return result;
        }

        [Route("EditWorker/{idJob}")]
        [HttpPut]
        public async Task<ActionResult<Worker>> EditWorker(int idJob, [FromBody] Worker worker)
        {
            var job = await Context.Jobs.FindAsync(idJob);
            if(job == null)
                return StatusCode(404);

            var oldWorker = await Context.Workers.FindAsync(worker.ID);

            if(oldWorker == null)
                return StatusCode(404);

            if(worker.MonthlyExpenses > job.Salary)
                return BadRequest("Plata ovog posla je manja u odnosu na troskove radnika! Izaberite drugi posao!");

            oldWorker.Name = worker.Name;
            oldWorker.Type = worker.Type;
            oldWorker.MonthlyExpenses = worker.MonthlyExpenses;
            oldWorker.MyHangar = worker.MyHangar;
            oldWorker.MyVehicle = worker.MyVehicle;
            oldWorker.MyJob = worker.MyJob;
            oldWorker.Job = job;
            await Context.SaveChangesAsync();
            Worker result = Context.Workers.FirstOrDefault(w => w.Name == oldWorker.Name);
            if(result == null)
                return BadRequest("Izmenjeni radnik ne postoji");
            return result;
        }

        [Route("DeleteWorker/{idWorker}")]
        [HttpDelete]
        public async Task<ActionResult> DeleteWorker(int idWorker)
        {
            var worker = await Context.Workers.FindAsync(idWorker);
            if(worker == null)
                return StatusCode(404);
            
            Context.Remove(worker);
            await Context.SaveChangesAsync();
            return Ok();
        }
    }
}
