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

    saveCity(cityName) {
        let city = {}
        return $.ajax({
            method: 'post',
            url: '/city',
            success: (newCity) => {
                city = this.cityData.find(city => city.name === cityName)
            },
            data: city,
            error: function (xhr, text, error) {
                console.log(error);
            }
        })
    }

    removeCity(cityName) {
        cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
        return $.ajax({
            method: 'delete',
            url: `/city/${cityName}`,
            success: (city) => {
                for (let cityIndex in this.cityData) {
                    if (this.cityData[cityIndex] === cityName) {
                        this.cityData.splice(cityIndex, 1)
                    }
                }
                console.log(this.cityData)
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
