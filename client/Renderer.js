class Renderer {
    constructor() {
        this.citiesContainerElement = $('#cities-container')
        this.cityTemplateElement = $('#city-template')
    }

    renderCitiesData(cities) {

        const source = this.cityTemplateElement.html()
        const template = Handlebars.compile(source)
        let newHTMLElement = template({ cities })
        this.citiesContainerElement.html(" ").append(newHTMLElement)
    }
}