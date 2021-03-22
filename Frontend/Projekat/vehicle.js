export class Vehicle{
    
    constructor(id, name, type){
        this.id = id
        this.name = name
        this.type = type
        this.jobs = []
    }

    draw(host){

        if(!host)
            throw new Error("Ne postoji roditelj!")

        const divVehicle = document.createElement("div")
        divVehicle.className = "divvehicle"
        host.appendChild(divVehicle)

        const h3 = document.createElement("h3")
        h3.innerHTML = this.name
        divVehicle.appendChild(h3)
    }
}