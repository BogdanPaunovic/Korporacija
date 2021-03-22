import {Hangar} from "./hangar.js"
import { Job } from "./job.js"
import {Vehicle} from "./vehicle.js"
import {Worker} from "./worker.js"

let hangarBeforeUpdate
let vehicleBeforeUpdate
let jobBeforeUpdate
let workerBeforeUpdate

export class Corporation{

    constructor(id, name){
        this.id = id
        this.name = name
        this.hangars = []
        this.container = null
    }
    

    drawCorporation(host){

        if(!host)
            throw new Exception("Ne postoji roditelj kontejnera!")

        this.container = document.createElement("div")
        this.container.className = "container"
        host.appendChild(this.container)

        const divForms = document.createElement("div")
        divForms.className = "divforms"
        this.container.appendChild(divForms)

        const divHangars = document.createElement("div")
        divHangars.className = "divhangars"
        this.container.appendChild(divHangars)

        this.hangars.map(x => x.draw(divHangars))
        this.hangars.map(x => x.vehicles.map(y => y.draw(this.container.children[1].children[this.hangars.indexOf(x)].children[1])))
        this.hangars.map(x => x.vehicles.map( y => y.jobs.map( z=> z.draw(this.container.children[1].children[this.hangars.indexOf(x)].children[1].children[0]))))
        this.hangars.map(x => x.vehicles.map(y => y.jobs.map(z => z.workers.map(q => q.draw(this.container.children[1].children[this.hangars.indexOf(x)].children[1].children[0].children[y.jobs.indexOf(z)+1].children[4])))))

        this.drawFormHangar(divForms)
        this.drawFormVehicle(divForms)
        this.drawFormWorker(divForms)
        
        this.hangars.map(x => x.vehicles.map(y => y.jobs.map(z => z.workers.map(q => {
            this.workerEditButton(q, this.container.children[0].children[2].children[0].children[2], 
                this.container.children[0].children[2].children[0].children[4].children[0], 
                this.container.children[0].children[2].children[0].children[5].children[0], 
                this.container.children[0].children[2].children[0].children[6].children[0], 
                this.container.children[0].children[2].children[0].children[8], 
                this.container.children[0].children[2].children[0].children[10], 
                this.container.children[0].children[2].children[0].children[12], 
                this.container.children[0].children[2].children[0].children[14], 
                this.container.children[0].children[2].children[0].children[15])
            this.workerDeleteButton(x, y, z, q)
        }))))
    }

    drawFormHangar(host){

        if(!host)
            throw new Exception("Ne postoji roditelj hangara!")

        const divFormHangar = document.createElement("div")
        divFormHangar.className = "formworker"
        host.appendChild(divFormHangar)

        const divFormHangarElements = document.createElement("div")
        divFormHangarElements.className = "formworkerelem"
        divFormHangar.appendChild(divFormHangarElements)

        const titleHangar = document.createElement("h3")
        titleHangar.innerHTML = "Forma za unos hangara"
        divFormHangarElements.appendChild(titleHangar)

        this.drawLabel(divFormHangarElements, "Naziv hangara")

        const txtHangarName = document.createElement("input")
        txtHangarName.className = "formworkerelem"
        divFormHangarElements.appendChild(txtHangarName)

        this.drawLabel(divFormHangarElements, "Tip hangara")

        const divHangarRdb1 = document.createElement("div")
        divHangarRdb1.className = "rdb"
        divFormHangarElements.appendChild(divHangarRdb1)

        const divHangarRdb2 = document.createElement("div")
        divHangarRdb2.className = "rdb"
        divFormHangarElements.appendChild(divHangarRdb2)

        const divHangarRdb3 = document.createElement("div")
        divHangarRdb3.className = "rdb"
        divFormHangarElements.appendChild(divHangarRdb3)

        const rdbType1 = document.createElement("input")
        rdbType1.type = "radio"
        rdbType1.name = this.id + "hangar"
        rdbType1.value = "Vazduh"
        divHangarRdb1.appendChild(rdbType1)
        this.drawLabel(divHangarRdb1, "Vazduh")
        
        const rdbType2 = document.createElement("input")
        rdbType2.type = "radio"
        rdbType2.name = this.id + "hangar"
        rdbType2.value = "Zemlja"
        divHangarRdb2.appendChild(rdbType2)
        this.drawLabel(divHangarRdb2, "Zemlja")
        
        const rdbType3 = document.createElement("input")
        rdbType3.type = "radio"
        rdbType3.name = this.id + "hangar"
        rdbType3.value = "Voda"
        divHangarRdb3.appendChild(rdbType3)
        this.drawLabel(divHangarRdb3, "Voda")

        this.drawLabel(divFormHangarElements, "Unesite maksimalni broj vozila u hangaru")
        const nmbHangarVehicles = document.createElement("input")
        nmbHangarVehicles.type = "number"
        nmbHangarVehicles.className = "formworkerelem"
        nmbHangarVehicles.min = "1"
        divFormHangarElements.appendChild(nmbHangarVehicles)

        const btnHangar = document.createElement("button")
        btnHangar.innerHTML = "Izgradi"
        divFormHangarElements.appendChild(btnHangar)
        btnHangar.onclick = x =>{
            if(txtHangarName.value === "")
            {
                alert("Morate da unesete ime hangara")
                return
            }

            if(!this.checkRadioButtons(rdbType1, rdbType2, rdbType3))
            {
                alert("Morate da izaberete tip hangara!")
                return
            }

            if(nmbHangarVehicles.value === "")
            {
                alert("Morate da uneste maksimalan broj vozila u hanagru!")
                return
            }

            let checkHangar = this.hangars.find(item => item.name === txtHangarName.value)

            if(checkHangar !== undefined)
            {
                alert("Hangar vec postoji!")
                return
            }

            fetch("https://localhost:5001/Corporation/PostHangar/" + this.id, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    name: txtHangarName.value,
                    type: this.checkRadioButtons(rdbType1, rdbType2, rdbType3),
                    numberOfVehicles: parseInt(nmbHangarVehicles.value)
                })
            })
            .then(p => {
                p.json()
                .then(data=>{

                    this.clearForm(txtHangarName, rdbType1, rdbType2, rdbType3, nmbHangarVehicles, null, null, null, null, null)
                    const h = new Hangar(data.ID, data.Name, data.Type, data.NumberOfVehicles)
                    this.hangars.push(h)
                    h.draw(this.container.children[1])
                    
                    this.addNewHangarToSelectElement(h, this.container.children[0].children[1].children[0].children[8], 
                    this.container.children[0].children[1].children[0].children[4].children[0],
                    this.container.children[0].children[1].children[0].children[5].children[0],
                    this.container.children[0].children[1].children[0].children[6].children[0])

                    this.addNewHangarToSelectElement(h, this.container.children[0].children[2].children[0].children[10], 
                    this.container.children[0].children[2].children[0].children[4].children[0],
                    this.container.children[0].children[2].children[0].children[5].children[0],
                    this.container.children[0].children[2].children[0].children[6].children[0])
                })
            })
            .catch(error => console.log(error.message))
        }
    }

    drawFormVehicle(host){

        if(!host)
            throw new Exception("Ne postoji roditelj vozila!")

        const divFormVehicle = document.createElement("div")
        divFormVehicle.className = "formworker"
        host.appendChild(divFormVehicle)

        const divFormVehicleElements = document.createElement("div")
        divFormVehicleElements.className = "formworkerelem"
        divFormVehicle.appendChild(divFormVehicleElements)

        const titleVehicle = document.createElement("h3")
        titleVehicle.innerHTML = "Forma za unos vozila"
        divFormVehicleElements.appendChild(titleVehicle)

        this.drawLabel(divFormVehicleElements, "Naziv vozila")

        const txtVehicleName = document.createElement("input")
        txtVehicleName.className = "formworkerelem"
        divFormVehicleElements.appendChild(txtVehicleName)

        this.drawLabel(divFormVehicleElements, "Tip vozila")

        const divVehicleRdb1 = document.createElement("div")
        divVehicleRdb1.className = "rdb"
        divFormVehicleElements.appendChild(divVehicleRdb1)

        const divVehicleRdb2 = document.createElement("div")
        divVehicleRdb2.className = "rdb"
        divFormVehicleElements.appendChild(divVehicleRdb2)

        const divVehicleRdb3 = document.createElement("div")
        divVehicleRdb3.className = "rdb"
        divFormVehicleElements.appendChild(divVehicleRdb3)

        const rdbType1 = document.createElement("input")
        rdbType1.type = "radio"
        rdbType1.name = this.id + "vehicle"
        rdbType1.value = "Vazduh"
        divVehicleRdb1.appendChild(rdbType1)
        this.drawLabel(divVehicleRdb1, "Vazduh")
        
        const rdbType2 = document.createElement("input")
        rdbType2.type = "radio"
        rdbType2.name = this.id + "vehicle"
        rdbType2.value = "Zemlja"
        divVehicleRdb2.appendChild(rdbType2)
        this.drawLabel(divVehicleRdb2, "Zemlja")
        
        const rdbType3 = document.createElement("input")
        rdbType3.type = "radio"
        rdbType3.name = this.id + "vehicle"
        rdbType3.value = "Voda"
        divVehicleRdb3.appendChild(rdbType3)
        this.drawLabel(divVehicleRdb3, "Voda")

        this.drawLabel(divFormVehicleElements, "Izaberite hangar")
        const hangarsID = document.createElement("select")
        const defaultOption = document.createElement("option")
        defaultOption.value = ""
        defaultOption.innerHTML = ""
        hangarsID.add(defaultOption)
        hangarsID.className = "formworkerelem"
        divFormVehicleElements.appendChild(hangarsID)

        rdbType1.addEventListener("input", (event) => this.updateHangars(hangarsID, event.target.value))
        rdbType2.addEventListener("input", (event) => this.updateHangars(hangarsID, event.target.value))
        rdbType3.addEventListener("input", (event) => this.updateHangars(hangarsID, event.target.value))

        const btnVehicle = document.createElement("button")
        btnVehicle.innerHTML = "Uvezi"
        divFormVehicleElements.appendChild(btnVehicle)
        btnVehicle.onclick = x =>{
            
            if(txtVehicleName.value === "")
            {
                alert("Morate da unese naziv vozila!")
                return
            }
            
            if(!this.checkRadioButtons(rdbType1, rdbType2, rdbType3))
            {
                alert("Morate da izaberete tip vozila!")
                return
            }

            if(hangarsID.value === "")
            {
                alert("Morate da izaberete hanagr u koji uvozite vozilo")
                return
            }

            const typeString = this.checkRadioButtons(rdbType1, rdbType2, rdbType3)

            const hangar = this.hangars.find(item => item.name === hangarsID.value)
            
            if(hangar.type !== typeString)
            {
                alert("Tip vozila ne odgovara tipu hangara! Morate da promenite hangar!")
                return
            }

            const count = hangar.vehicles.filter(item => item !== undefined).length
            
            if(count === hangar.vehicles.length)
            {
                alert("Ovaj hangar je popunjen!")
                return
            }

            let flag = true

            hangar.vehicles.map(item => {
                if(item.name === txtVehicleName.value)
                    flag=false
            })

            if(!flag)
            {
                alert("Vozilo vec postoji!")
                return
            }

            fetch("https://localhost:5001/Corporation/PostVehicle/" + hangar.id, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    name: txtVehicleName.value,
                    type: typeString
                })
            })
            .then(p => {
                p.json()
                .then(data =>{

                    this.clearForm(txtVehicleName, rdbType1, rdbType2, rdbType3, null, hangarsID, null, null, null, null)
                    let objVehicle = new Vehicle(data.ID ,data.Name, data.Type)
                    data.Jobs.map(item => {
                        objVehicle.jobs.push(new Job(item.ID, item.Name, item.Salary, item.MaxWorkers))
                    })

                    hangar.vehicles[count]=objVehicle
                    objVehicle.draw(this.container.children[1].children[this.hangars.indexOf(hangar)].children[1])
                    objVehicle.jobs.map(item => item.draw(this.container.children[1].children[this.hangars.indexOf(hangar)].children[1].children[hangar.vehicles.indexOf(objVehicle)]))
                })
            })
            .catch(error => console.log(error))
        }
    }

    drawFormWorker(host){

        if(!host)
            throw new Exception("Ne postoji roditelj forme!")

        const divFormWorker = document.createElement("div")
        divFormWorker.className = "formworker"
        host.appendChild(divFormWorker)

        const divFormWorkerElements = document.createElement("div")
        divFormWorkerElements.className = "formworkerelem"
        divFormWorker.appendChild(divFormWorkerElements)

        const titleWorker = document.createElement("h3")
        titleWorker.innerHTML = "Forma za unos radnika"
        divFormWorkerElements.appendChild(titleWorker)

        this.drawLabel(divFormWorkerElements, "Ime radnika")

        const txtWorkerName = document.createElement("input")
        txtWorkerName.className = "formworkerelem"
        divFormWorkerElements.appendChild(txtWorkerName)

        this.drawLabel(divFormWorkerElements, "Tip posla")

        const divWorkerRdb1 = document.createElement("div")
        divWorkerRdb1.className = "rdb"
        divFormWorkerElements.appendChild(divWorkerRdb1)

        const divWorkerRdb2 = document.createElement("div")
        divWorkerRdb2.className = "rdb"
        divFormWorkerElements.appendChild(divWorkerRdb2)

        const divWorkerRdb3 = document.createElement("div")
        divWorkerRdb3.className = "rdb"
        divFormWorkerElements.appendChild(divWorkerRdb3)

        const rdbType1 = document.createElement("input")
        rdbType1.type = "radio"
        rdbType1.name = this.id + "worker"
        rdbType1.value = "Vazduh"
        divWorkerRdb1.appendChild(rdbType1)
        this.drawLabel(divWorkerRdb1, "Vazduh")
        
        const rdbType2 = document.createElement("input")
        rdbType2.type = "radio"
        rdbType2.name = this.id + "worker"
        rdbType2.value = "Zemlja"
        divWorkerRdb2.appendChild(rdbType2)
        this.drawLabel(divWorkerRdb2, "Zemlja")
        
        const rdbType3 = document.createElement("input")
        rdbType3.type = "radio"
        rdbType3.name = this.id + "worker"
        rdbType3.value = "Voda"
        divWorkerRdb3.appendChild(rdbType3)
        this.drawLabel(divWorkerRdb3, "Voda")
        
        this.drawLabel(divFormWorkerElements, "Mesecni rashodi")

        const nmbWorkerExpenses = document.createElement("input")
        nmbWorkerExpenses.type = "number"
        nmbWorkerExpenses.min = "1"
        divFormWorkerElements.appendChild(nmbWorkerExpenses)

        this.drawLabel(divFormWorkerElements, "Izaberite hangar")
        const hangarsID = document.createElement("select")
        const defaultOptionHangar = document.createElement("option")
        defaultOptionHangar.value = ""
        defaultOptionHangar.innerHTML = ""
        hangarsID.add(defaultOptionHangar)
        hangarsID.className = "formworkelem"
        divFormWorkerElements.appendChild(hangarsID)

        rdbType1.addEventListener("input", (event) => {
            this.updateHangars(hangarsID, event.target.value)
            if(hangarsID.value === "")
            {
                this.updateVehiclesForSelectedHangar(vehiclesID, null)
                this.updateJobsForSelectedVehicle(jobsID, null)
            }
        })
        rdbType2.addEventListener("input", (event) => {
            this.updateHangars(hangarsID, event.target.value)
            if(hangarsID.value === "")
            {
                this.updateVehiclesForSelectedHangar(vehiclesID, null)
                this.updateJobsForSelectedVehicle(jobsID, null)
            }
        })
        rdbType3.addEventListener("input", (event) => {
            this.updateHangars(hangarsID, event.target.value)
            if(hangarsID.value === "")
            {
                this.updateVehiclesForSelectedHangar(vehiclesID, null)
                this.updateJobsForSelectedVehicle(jobsID, null)
            }
        })

        this.drawLabel(divFormWorkerElements, "Izaberite vozilo")
        const vehiclesID = document.createElement("select")
        const defaultOptionVehicle = document.createElement("option")
        defaultOptionVehicle.value = ""
        defaultOptionVehicle.innerHTML = ""
        vehiclesID.add(defaultOptionVehicle)
        vehiclesID.className = "formworkerelem"
        divFormWorkerElements.appendChild(vehiclesID)

        let selectedHangar
        hangarsID.addEventListener("input", (event) => {
            if(event.target.value === "")
            {
                selectedHangar = null
                this.updateVehiclesForSelectedHangar(vehiclesID, selectedHangar)
                this.updateJobsForSelectedVehicle(jobsID, null)
            }
            else
            {
                selectedHangar = this.hangars.find(item => item.name === event.target.value)
                this.updateVehiclesForSelectedHangar(vehiclesID, selectedHangar)
            }
            
        })

        this.drawLabel(divFormWorkerElements, "Izaberite posao")
        const jobsID = document.createElement("select")
        const defaultOptionJob = document.createElement("option")
        defaultOptionJob.value = ""
        defaultOptionJob.innerHTML = ""
        jobsID.add(defaultOptionJob)
        jobsID.className = "formworkerelem"
        divFormWorkerElements.appendChild(jobsID)

        let selectedVehicle
        vehiclesID.addEventListener("input", (event) => {
            if(event.target.value === "")
            {    
                selectedVehicle = null
                this.updateJobsForSelectedVehicle(jobsID, selectedVehicle)
            }
            else
            {
                selectedVehicle = selectedHangar.vehicles.find(item => item.name === event.target.value)
                this.updateJobsForSelectedVehicle(jobsID, selectedVehicle)
            }
            
        })

        

        const btnWorker = document.createElement("button")
        btnWorker.innerHTML = "Zaposli"
        divFormWorkerElements.appendChild(btnWorker)
        btnWorker.onclick = x =>{
            
            
            if(txtWorkerName.value === "")
            {
                alert("Morate uneti ime radnika!")
                return
            }

            if(!this.checkRadioButtons(rdbType1, rdbType2, rdbType3))
            {
                alert("Morate izabratip tip radnika!")
                return
            }

            if(nmbWorkerExpenses.value === "")
            {
                alert("Morate uneti troskove radnika!")
                return
            }

            if(hangarsID.value === "")
            {
                alert("Morate izabrati hangar!")
                return
            }

            if(vehiclesID.value === "")
            {
                alert("Morate izabrati vozilo!")
                return
            }

            if(jobsID.value === "")
            {
                alert("Morate izabrati posao!")
                return
            }

            let selectedJob = selectedVehicle.jobs.find(item => item.name === jobsID.value)
            let countWorkers = selectedJob.workers.filter(item => item !== undefined).length

            if(countWorkers === selectedJob.maxEmployers)
            {
                alert("Nema slobodnih radnih mesta! Izaberite drugi posao")
                return
            }

            if(selectedJob.salary < parseInt(nmbWorkerExpenses.value))
            {
                alert("Plata ovog posla je manja u odnosu na troskove radnika! Izaberite drugi posao!")
                return
            }

            let flagWorker = false
            if(countWorkers > 0 )
            {
                for(let i = 0; i < countWorkers; i++)
                {
                    if(selectedJob.workers[i].name === txtWorkerName.value)
                    {
                        flagWorker = true // istina da radnik vec postoji
                    }
                }
            }

            if(flagWorker)
            {
                alert("Radnik vec postoji!")
                return
            }

            const workType = this.checkRadioButtons(rdbType1, rdbType2, rdbType3)
            

            if(btnWorker.innerHTML === "Zaposli"){
                fetch("https://localhost:5001/Corporation/PostWorker/" + selectedJob.id, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    name: txtWorkerName.value,
                    type: workType,
                    MonthlyExpenses: parseInt(nmbWorkerExpenses.value),
                    MyHangar: selectedHangar.name,
                    MyVehicle: selectedVehicle.name,
                    MyJob: selectedJob.name
                })
            })
            .then(response => {
                response.json()
                .then(data => {


                    this.clearForm(txtWorkerName, rdbType1, rdbType2, rdbType3, null, null, nmbWorkerExpenses, hangarsID, vehiclesID, jobsID)
                    const newWorker = new Worker(data.ID, data.Name, data.Type, data.MonthlyExpenses, data.MyHangar, data.MyVehicle, data.MyJob)
                    selectedJob.workers[countWorkers] = newWorker
                    this.container.children[1].innerHTML=""
                    this.hangars.map(x => x.draw(this.container.children[1]))
                    this.hangars.map(x => x.vehicles.map(y => y.draw(this.container.children[1].children[this.hangars.indexOf(x)].children[1])))
                    this.hangars.map(x => x.vehicles.map( y => y.jobs.map( z=> z.draw(this.container.children[1].children[this.hangars.indexOf(x)].children[1].children[0]))))
                    this.hangars.map(x => x.vehicles.map(y => y.jobs.map(z => z.workers.map(q => {
                        q.draw(this.container.children[1].children[this.hangars.indexOf(x)].children[1].children[0].children[y.jobs.indexOf(z)+1].children[4])
                        this.workerEditButton(q, txtWorkerName, rdbType1, rdbType2, rdbType3, nmbWorkerExpenses, hangarsID, vehiclesID, jobsID, btnWorker)
                        this.workerDeleteButton(selectedHangar, selectedVehicle, selectedJob, q)
                    }))))
                    
                    
                })
            })
            .catch(error => console.log(error))
            }
            else{
                
                fetch("https://localhost:5001/Corporation/EditWorker/" + selectedJob.id, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    id: this.workerBeforeUpdate.id,
                    name: txtWorkerName.value,
                    type: workType,
                    MonthlyExpenses: parseInt(nmbWorkerExpenses.value),
                    MyHangar: selectedHangar.name,
                    MyVehicle: selectedVehicle.name,
                    MyJob: selectedJob.name
                })
            })
            .then(response => {
                
                response.json()
                .then(data => {
                    
                    this.clearForm(txtWorkerName, rdbType1, rdbType2, rdbType3, null, null, nmbWorkerExpenses, hangarsID, vehiclesID, jobsID)
                    this.jobBeforeUpdate.workers.splice(this.jobBeforeUpdate.workers.indexOf(this.workerBeforeUpdate), 1)

                    const updatedWorker = new Worker(data.ID, data.Name, data.Type, data.MonthlyExpenses, data.MyHangar, data.MyVehicle, data.MyJob)
                    const updatedHangar = this.hangars.find(item => item.name === updatedWorker.myHangar)
                    const updatedVehicle = updatedHangar.vehicles.find(item => item.name === updatedWorker.myVehicle)
                    const updatedJob = updatedVehicle.jobs.find(item => item.name === updatedWorker.myJob)
                    updatedJob.workers[countWorkers] = updatedWorker

                    this.container.children[1].innerHTML=""
                    this.hangars.map(x => x.draw(this.container.children[1]))
                    this.hangars.map(x => x.vehicles.map(y => y.draw(this.container.children[1].children[this.hangars.indexOf(x)].children[1])))
                    this.hangars.map(x => x.vehicles.map( y => y.jobs.map( z=> z.draw(this.container.children[1].children[this.hangars.indexOf(x)].children[1].children[0]))))
                    this.hangars.map(x => x.vehicles.map(y => y.jobs.map(z => z.workers.map(q => {
                        q.draw(this.container.children[1].children[this.hangars.indexOf(x)].children[1].children[0].children[y.jobs.indexOf(z)+1].children[4])
                        this.workerEditButton(q, txtWorkerName, rdbType1, rdbType2, rdbType3, nmbWorkerExpenses, hangarsID, vehiclesID, jobsID, btnWorker)
                        this.workerDeleteButton(updatedHangar, updatedVehicle, updatedJob, q)
                    }))))
                    
                    
                    btnWorker.innerHTML = "Zaposli"
                })
            })
            .catch(error => console.log(error))
            }
        }
        
    }

    drawLabel(host, content){
        
        const lblInfo = document.createElement("label")
        lblInfo.innerHTML = content
        lblInfo.className = "formworkerelem"
        host.appendChild(lblInfo)
    }

    checkRadioButtons(x, y, z){

        if(x.checked)
            return x.value
        else if(y.checked)
            return y.value
        else if(z.checked)
            return z.value
        else
            return false
    }

    updateHangars(selectElement, hangarType){

        for(let i = selectElement.length-1; i > 0; i--)
            selectElement.remove(i)

        this.hangars.map(item => {
            if(item.type === hangarType)
            {
                const option = document.createElement("option")
                option.value = item.name
                option.innerHTML = item.name
                selectElement.add(option)
            }
        })
    }

    addNewHangarToSelectElement(objHangar, selectElement, rdb1, rdb2, rdb3){

        if(objHangar.type === this.checkRadioButtons(rdb1, rdb2, rdb3))
        {
            const option = document.createElement("option")
            option.value = objHangar.name
            option.innerHTML = objHangar.name
            selectElement.add(option)
        }
    }

    updateVehiclesForSelectedHangar(selectElement, hangy){

        for(let i = selectElement.length-1; i > 0; i--)
            selectElement.remove(i)

        if(hangy !== null)
        {
            hangy.vehicles.map(item => {
                const option = document.createElement("option")
                option.value = item.name
                option.innerHTML = item.name
                selectElement.add(option)
            })
        }
        
    }

    updateJobsForSelectedVehicle(selectElement, selectedVehicle){

        for(let i = selectElement.length-1; i > 0; i--)
            selectElement.remove(i)

        if(selectedVehicle !== null)
        {
            selectedVehicle.jobs.map(item => {
                const option = document.createElement("option")
                option.value = item.name
                option.innerHTML = item.name
                selectElement.add(option)
            })
        }
        
    }

    clearForm(nameField, rdbType1, rdbType2, rdbType3, nmbFieldHangar, selectElementVehicle, nmbFieldWorker,selectElementWorkerHangar, selectElementWorkerVehicle, selectElementWorkerJob){
        
        nameField.value = ""
        rdbType1.checked = false
        rdbType2.checked = false
        rdbType3.checked = false

        if(nmbFieldHangar !== null)
            nmbFieldHangar.value = ""

        if(selectElementVehicle !== null){
            selectElementVehicle.value = ""
            this.updateHangars(selectElementVehicle, "")
        }

        if(nmbFieldWorker !== null){
            nmbFieldWorker.value = ""
            selectElementWorkerHangar.value = ""
            this.updateHangars(selectElementWorkerHangar, "")
            selectElementWorkerVehicle.value = ""
            this.updateVehiclesForSelectedHangar(selectElementWorkerVehicle, null)
            selectElementWorkerJob.value = ""
            this.updateJobsForSelectedVehicle(selectElementWorkerJob, null)
        }
    }

    workerEditButton(q, txtWorkerName, rdbType1, rdbType2, rdbType3, nmbWorkerExpenses, hangarsID, vehiclesID, jobsID, btnWorker){

        q.btnEdit.onclick= c =>{
    
            this.workerBeforeUpdate = q
            this.hangarBeforeUpdate = this.hangars.find(item => item.name === this.workerBeforeUpdate.myHangar)
            this.vehicleBeforeUpdate = this.hangarBeforeUpdate.vehicles.find(item => item.name === this.workerBeforeUpdate.myVehicle)
            this.jobBeforeUpdate = this.vehicleBeforeUpdate.jobs.find(item => item.name === this.workerBeforeUpdate.myJob)
            
            txtWorkerName.value = q.name
            if(rdbType1.value === q.type)
                rdbType1.checked = true
            else if(rdbType2.value === q.type)
                rdbType2.checked = true
            else
                rdbType3.checked = true
            nmbWorkerExpenses.value = q.monthlyExpenses
            this.updateHangars(hangarsID, q.type)
            hangarsID.value = q.myHangar
            hangarsID.dispatchEvent(new Event("input"))
            const myHangar = this.hangars.find(item => item.name === q.myHangar)
            this.updateVehiclesForSelectedHangar(vehiclesID, myHangar)
            vehiclesID.value = q.myVehicle
            vehiclesID.dispatchEvent(new Event("input"))
            const myVehicle = myHangar.vehicles.find(item => item.name === q.myVehicle)
            this.updateJobsForSelectedVehicle(jobsID, myVehicle)
            jobsID.value = q.myJob
            jobsID.dispatchEvent(new Event("input"))
            btnWorker.innerHTML = "Izmeni"
        }
    }

    workerDeleteButton(x, y, z, q){
        q.btnDelete.onclick= c =>{

            fetch("https://localhost:5001/Corporation/DeleteWorker/" + q.id, {
                method: "DELETE",
                headers : {"Content-Type": "application/json"}
            })
            .then(response => {
                if(response.ok){
                    z.workers.splice(z.workers.indexOf(q), 1)
                    this.container.children[1].children[this.hangars.indexOf(x)].children[1].children[0].children[y.jobs.indexOf(z)+1].children[4].innerHTML = ""
                    z.workers.map(item => {
                        item.draw(this.container.children[1].children[this.hangars.indexOf(x)].children[1].children[0].children[y.jobs.indexOf(z)+1].children[4])
                        this.workerDeleteButton(x, y, z, item)
                        this.workerEditButton(item, this.container.children[0].children[2].children[0].children[2], 
                            this.container.children[0].children[2].children[0].children[4].children[0], 
                            this.container.children[0].children[2].children[0].children[5].children[0], 
                            this.container.children[0].children[2].children[0].children[6].children[0], 
                            this.container.children[0].children[2].children[0].children[8], 
                            this.container.children[0].children[2].children[0].children[10], 
                            this.container.children[0].children[2].children[0].children[12], 
                            this.container.children[0].children[2].children[0].children[14], 
                            this.container.children[0].children[2].children[0].children[15])
                    })
                }
            })
            .catch(error => console.log(error))
        }
    }
}