




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

$("body").on('click', "#save-city", function () {
    const cityElement = $(this).closest("#city")
    const cityName = cityElement.find("#name").html();
    const temp = cityElement.find("#temperature").html()
    const condition = cityElement.find("#condition").html()
    const conditionIcon = cityElement.find("#condition-icon").attr("src")

    let city = {
        name: cityName,
        temperature: temp,
        condition: condition,
        conditionPic: conditionIcon,

    }

    let newCity = tempManager.saveCity(city);
    newCity.then(function () {
        const cities = tempManager.getCities()
        render.renderCitiesData(cities)

    })


})

$('body').on('click', '#remove-city', function () {
    const city = $(this).closest("#city")
    const cityName = city.find('#name').html()
    let removedCity = tempManager.removeCity(cityName)

    removedCity.then(function () {
        const cities = tempManager.getCities()
        render.renderCitiesData(cities)
    })

})

loadPage()






