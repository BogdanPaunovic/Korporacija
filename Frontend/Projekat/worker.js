import { Corporation } from "./corporation.js";

export class Worker{

    constructor(id, name, type, monthlyExpenses, myHangar, myVehicle, myJob){
        this.id = id
        this.name = name
        this.type = type
        this.monthlyExpenses = monthlyExpenses
        this.myHangar = myHangar
        this.myVehicle = myVehicle
        this.myJob = myJob
        this.btnEdit = null
        this.btnDelete = null
    }

    draw(host){

        if(!host)
            throw new Error("Ne postoji roditelj div radnika!")

            const divEmploye = document.createElement("div")
            divEmploye.className = "divemploye"
            host.appendChild(divEmploye)

            const lblEmploye = document.createElement("label")
            lblEmploye.innerHTML = this.name
            lblEmploye.className = "divemploye"
            divEmploye.appendChild(lblEmploye)

            this.btnEdit = document.createElement("button")
            this.btnEdit.className = "divemploye"
            this.btnEdit.innerHTML = "Izmeni"
            divEmploye.appendChild(this.btnEdit)
            

            this.btnDelete = document.createElement("button")
            this.btnDelete.className = "divemploye"
            this.btnDelete.innerHTML = "Izbrisi"
            divEmploye.appendChild(this.btnDelete)
    }
}