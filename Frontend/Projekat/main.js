import { Corporation } from "./corporation.js";
import { Hangar } from "./hangar.js";
import { Vehicle } from "./vehicle.js"
import { Job } from "./job.js"
import { Worker } from "./worker.js"

fetch("https://localhost:5001/Corporation/GetCorporations")
.then( q=> {
    q.json()
    .then( data => {
        data.forEach(corp => {
            const corp1 = new Corporation(corp.ID, corp.Name)
            if(corp.Hangari !== undefined){
                corp.Hangari.map(item => {
                    const hangar = new Hangar(item.ID, item.Name, item.Type, item.NumberOfVehicles)
                    if(item.Vehicles !== undefined && item.Vehicles !== null){
                        item.Vehicles.map(item2 => {
                            const vehicle = new Vehicle(item2.ID, item2.Name, item2.Type)
                            if(item2.Jobs !== undefined && item2.Jobs !== null){
                                item2.Jobs.map(item3 => {
                                    const job = new Job(item3.ID, item3.Name, item3.Salary, item3.MaxWorkers)
                                    if(item3.Workers !== undefined && item3.Workers !== null){
                                        item3.Workers.map(item4 => {
                                            const worker = new Worker(item4.ID, item4.Name, item4.Type, item4.MonthlyExpenses, item4.MyHangar, item4.MyVehicle, item4.MyJob)
                                            job.workers[job.workers.filter(item5 => item5 !== undefined).length] = worker
                                        })
                                    }
                                    vehicle.jobs.push(job)
                                })
                            }
                            hangar.vehicles[hangar.vehicles.filter(item6 => item6 !== undefined).length] = vehicle
                        })
                    }
                    corp1.hangars.push(hangar)
                })
            }
            corp1.drawCorporation(document.body)
        })
    })
})