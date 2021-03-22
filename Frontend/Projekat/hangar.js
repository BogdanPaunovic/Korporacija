export class Hangar{
    
    constructor(id, name, type, numberOfVehicles){
        this.id = id
        this.name = name
        this.type = type
        this.numberOfVehicles = numberOfVehicles
        this.vehicles = new Array(numberOfVehicles)
    }

    draw(host){

        if(!host)
            throw new Error("Ne postoji roditelj 1-og hangara!")

        const divHangar = document.createElement("div")
        divHangar.className = "divhangar"
        divHangar.style.backgroundColor = this.hangarColor(this.type)
        host.appendChild(divHangar)

        const divHangarHeader = document.createElement("div")
        divHangarHeader.className = "divhangarheader"
        divHangar.appendChild(divHangarHeader)

        const titleHangar = document.createElement("h3")
        titleHangar.innerHTML = this.name
        divHangarHeader.appendChild(titleHangar)

        const titlenumberOfVehicles = document.createElement("h4")
        titlenumberOfVehicles.innerHTML = this.vehicles.filter(item => item !== undefined).length + "/" + this.numberOfVehicles
        divHangarHeader.appendChild(titlenumberOfVehicles)

        const divHangarVehicles = document.createElement("div")
        divHangarVehicles.className = "divhangarvehicles"
        divHangar.appendChild(divHangarVehicles)
    }

    hangarColor(type){
        if(type==="Vazduh")
            return "lightblue"
        else if(type==="Zemlja")
            return "green"
        else
            return "blue"
    }
}