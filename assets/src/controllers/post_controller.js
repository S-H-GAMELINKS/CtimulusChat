import { Controller } from "stimulus"
import axios from "axios"

export default class extends Controller {
    static get targets() {
        return ["talks", "content", "preview" ]
    }

    initialize() {
        this.init();
    }

    content() {
        this.previewTarget.innerHTML = this.contentTarget.value
    }

    init () {
        axios.get("/api/talks").then((response) => {
            for (let i = 0; i < response.data.length; i++) {
                this.talksTarget.innerHTML += `<p>${response[i]}</p>`
            }
        }, (error) => {
            console.log(error)
        })
    }

    update() {
        axios.post("/api/talks", {content: this.contentTarget.value}).then((response) => {
            this.talksTarget.innerHTML += `<p>${this.contentTarget.value}</p>`
        }, (error) => {
            console.log(error)
        })
    }

    submit() {
        database.ref('ctimulus').push({
            content: this.contentTarget.value
        });
        this.contentTarget.value = "";
        this.previewTarget.innerHTML = "";
    }
}