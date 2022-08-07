const citiesContainerElement = $('#cities-container')
const cityTemplateElement = $('#city-template')
const cityInputElement = $('#input-field')
const searchBtnElement = $('#search-btn')

const render = new Renderer()
const tempManager = new TempManager()

function loadPage() {
    const citiesFromDb = tempManager.getDataFromDB()
    citiesFromDb.then(function () {
        let cities = tempManager.getCities()
        render.renderCitiesData(cities)
    })
}

function handleSearch() {

    let cityNameInput = cityInputElement.val()
    cityInputElement.empty()
    const city = tempManager.getCityData(cityNameInput)
    city.then(function () {
        const cities = tempManager.getCities()
        render.renderCitiesData(cities)
    })


}

searchBtnElement.on('click', function () {

    handleSearch()

})








