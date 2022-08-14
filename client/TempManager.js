
class TempManager {
    constructor() {
        this.cityData = []
    }

    async getDataFromDB() {
        return await $.ajax({
            method: "GET",
            url: '/cities',
            success: (cities) => {
                cities.forEach(city => {
                    this.cityData.push(city)
                });
            },
            error: function (xhr, text, error) {
                console.log(error);
            }
        });
    }

    getCityData(cityName) {
        return $.ajax({
            method: "GET",
            url: `/city/${cityName}`,
            success: (city) => {
                this.cityData.push(city)
            },
            error: function (xhr, text, error) {
                console.log(error);
            }
        });

    }

    saveCity(city) {
        let index = this.cityData.findIndex((c) => c.name === city.name);
        this.cityData.splice(index, 1);
        return $.ajax({
            method: "post",
            url: "/city",
            data: city,
            success: (city) => {
                this.cityData.push(city);
            },
            error: function (error, text) {
                console.log(error);
            },
        })
    }

    removeCity(cityName) {
        cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
        return $.ajax({
            method: 'delete',
            url: `/city/${cityName}`,
            success: (city) => {
                let index = this.cityData.findIndex((c) => c.name === cityName);
                this.cityData.splice(index, 1);
            },
            error: function (xhr, text, error) {
                console.log(error);
            }
        })
    }

    getCities() {
        return this.cityData
    }
}
