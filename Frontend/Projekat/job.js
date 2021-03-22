export class Job{

    constructor(id, name, salary, maxEmployers){

        this.id = id
        this.name = name
        this.salary = salary
        this.maxEmployers = maxEmployers
        this.workers = new Array(maxEmployers)
    }

    draw(host){

        if(!host)
            throw new Error("Ne postoji roditelj!")

        const divJob = document.createElement("div")
        divJob.className = "divjob"
        host.appendChild(divJob)

        const lblJobName = document.createElement("label")
        lblJobName.innerHTML = this.name
        divJob.appendChild(lblJobName)

        let lblJobWorkers = document.createElement("label")
        lblJobWorkers.innerHTML = "Broj popunjenih radnih mesta: " + this.workers.filter(item => item !== undefined).length + "/" + this.maxEmployers
        divJob.appendChild(lblJobWorkers)

        const lblJobSalary = document.createElement("label")
        lblJobSalary.innerHTML = "Plata: " + this.salary
        divJob.appendChild(lblJobSalary)

        const lblWorkers = document.createElement("label")
        lblWorkers.innerHTML = "Radnici:"
        divJob.appendChild(lblWorkers)

        const divForWorkers = document.createElement("div")
        divForWorkers.className = "divforworker"
        divJob.appendChild(divForWorkers)
    }
}