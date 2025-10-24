const iconSubmit = document.querySelector('.icon-search')
const card = document.querySelector('.card')
const weatherBox = document.querySelector('.weather-main')
const weatherDetail = document.querySelector('.weather-details')
const NotFound = document.querySelector('.icon-weather')
const ImgMain = document.querySelector('.main-weather-icon')
const FieldWeather = document.querySelector('.input-weather')

function fetchWeatherInfo() {
	const APIKey = '478e55b298ec9fb4114f0f767dd9a69d'
	const city = document.querySelector('.input-weather').value

	if (city === '') return

	fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
	)
		.then(response => response.json())
		.then(data => {
			if (data.cod === '404') {
				NotFound.style.display = 'block'
				weatherDetail.style.display = 'none'
				weatherBox.style.display = 'none'
				return
			}

			NotFound.style.display = 'none'
			weatherDetail.style.display = 'flex'
			weatherBox.style.display = 'flex'

			const windText = document.querySelector('.value-wind')
			const humidityText = document.querySelector('.value-humidity')
			const degrees = document.querySelector('.degrees')
			const descr = document.querySelector('.weather-description')

			if (windText && humidityText && degrees && descr) {
				windText.textContent = `${data.wind.speed}`
				humidityText.textContent = `${data.main.humidity}%`
				degrees.textContent = `${data.main.temp}`
				descr.textContent = `${data.weather[0].main}`
			}
			if (data.weather[0].main === 'Clouds') {
				ImgMain.src = 'img/cloud.png'
			}
			if (data.weather[0].main === 'Rain') {
				ImgMain.src = 'img/rain-fall.png'
			}
			if (data.weather[0].main === 'Clear') {
				ImgMain.src = 'img/sun.png'
			}
		})
		.catch(error => {
			console.error('Ошибка при получении погоды:', error)
		})
}

iconSubmit.addEventListener('click', () => {
	fetchWeatherInfo()
})

FieldWeather.addEventListener('keypress', function (event) {
	if (event.key === 'Enter') {
		event.preventDefault()
		iconSubmit.click()
	}
})
