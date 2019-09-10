/* eslint-disable eqeqeq */
module.exports = {
	async formatCSV (obj, ufv, type) {
	
		if (ufv === "campo-grande") {
			if (type === "production") {
				return []
			}
			if (type === "environmental") {
				
				let response = []
	
				response.push([
					'Data',
					'Horario',
					'Irradiacao (W/m^3)',
					'PM1 massa (mg/m^3)',
					'PM2 massa (mg/m^3)',
					'PM4 massa (mg/m^3)',
					'PM10 massa (mg/m^3)',
					'PM1 concentracao (mg/m^3)',
					'PM2 concentracao (mg/m^3)',
					'PM4 concentracao (mg/m^3)',
					'PM10 concentracao (mg/m^3)',
					'Concentracao padrao (mg/m^3)',
					'Temperatura (°C)',
					'Direcao do vento (°)',
					'Velocidade do vento km/h'
				])
	
				for (let i = 0; i < obj.interval.length; i++) {
					response.push([
						obj.date,
						obj.interval[i],
						(obj.irradiationInterval[i] == obj.interval[i]) ? obj.irradiation[i] : 0,
						obj.PM1Particulates[i],
						obj.PM2Particulates[i],
						obj.PM4Particulates[i],
						obj.PM10Particulates[i],
						obj.PM1Numbers[i],
						obj.PM2Numbers[i],
						obj.PM4Numbers[i],
						obj.PM10Numbers[i],
						obj.averageSizes[i],
						obj.temperatures[i],
						obj.windDirections[i],
						obj.windSpeeds[i]
					])
				}
	
				return response
	
			}
		}
	
		if (ufv === "irece") {
			if (type === "production") {
				return []
			}
			if (type === "environmental") {
				return []
			}
			if (type === "losses") {
				return []
			}
		}
	
		return [];
	
	}
}