const getTableAttributes = (table) => {

	let attributes = [];

	if (table === "ambientais_ifba") {
		attributes = ["avg_radSNP1_difusa", "avg_radSNP1_glob", "avg_radsol_I", "dia_mes_ano", "dir_vento", "hora_minuto", "irradiancia_2_avg", "irradiancia_avg", "prec_chuva_tot", "press_atm_avg", "temp_ar_avg", "umi_ar_avg", "vel_vento"];
	} else if (table === "ambientais_ifba_anual") {
		attributes = ["ano", "irradiation", "mes", "rainfall", "temperature", "windSpeed"];
	} else if (table === "ambientais_ufms") {
		attributes = ["dia_mes_ano", "hora_minuto", "irr", "massaPM1", "massaPM10", "massaPM2", "massaPM4", "numPM1", "numPM10", "numPM2", "numPM4", "rainfall", "tamanho_medio", "temp", "tipo", "vento_dir", "vento_vel"];
	} else if (table === "ambientais_ufms_anual") {
		attributes = ["ano", "irradiation", "mes", "rainfall", "temperature", "windSpeed"];
	} else if (table === "ambientais_ufms_weatherhawk") {
		attributes = ["hum", "rainfall", "temp", "timestamp", "uv", "wind_dir", "winds_peed"];
	} else if (table === "config_irece") {
		attributes = ["funcionalidade", "op", "id_modelo", "ids"];
	} else if (table === "controle_preditivo_ufms_1") {
		attributes = ["de", "dia_mes_ano", "hora_minuto", "Perda_J", "Perda_p", "tipo"];
	} else if (table === "inversor") {
		attributes = ["I_AC", "I_DC", "P_AC", "timestamp", "V_AC", "V_DC"];
	} else if (table === "inversor-teste") {
		attributes = ["dia_mes_ano", "hora_minuto", "I_AC", "I_DC", "P_AC", "V_AC", "V_DC"];
	} else if (table === "inversor_1_candeias") {
		attributes = ["dia_mes_ano", "hora_minuto"];
	} else if (table === "inversor_1_irece" || table === "inversor_2_irece" || table === "inversor_3_irece" || table === "inversor_4_irece" || table === "inversor_5_irece") {
		attributes = ["dia_mes_ano", "hora_minuto", "I_AC", "I_DC", "id_mesa", "P_AC", "P_EXPC", "tecnologia", "V_AC", "V_DC"];
	} else if (table === "inversor_1_irece_anual" || table === "inversor_2_irece_anual" || table === "inversor_3_irece_anual" || table === "inversor_4_irece_anual" || table === "inversor_5_irece_anual" || table === "inversor_6_irece_anual") {
		attributes = ["ano", "averageProduction", "capacityFactorAverage", "higherAverage", "higherAverageDay", "mes", "performancesAverage", "productionsSum", "totalProductionAverage"];
	} else if (table === "inversor_1_ufms") {
		attributes = ["dia_mes_ano", "hora_minuto", "I_AC", "I_DC", "IRR", "P_AC", "tipo", "V_AC", "V_DC"];
	} else if (table === "inversor_1_ufms_anual") {
		attributes = ["ano", "averageProduction", "capacityFactorAverage", "higherAverage", "higherAverageDay", "mes", "performancesAverage", "productionsSum", "totalProductionAverage"];
	} else if (table === "modelos_irece" || table === "modelos_ufms") {
		attributes = ["data_criacao", "data_fim", "data_inicio", "homocedasticidade", "modelo_id", "normalidade", "parametros", "r2_adj", "sigma", "tecnologia_id", "valido", "var_dep", "var_ind", "vars_filtro"]; 
	} else if (table === "ordens") {
		attributes = ["mesa", "timestamp", "tipo", "ufv"];
	} else if (table === "status_robo") {
		attributes = ["date", "order_code"];
	} else if (table === "sujidade_1_irece" || table === "sujidade_2_irece" || table === "sujidade_3_irece" || table === "sujidade_4_irece" || table === "sujidade_5_irece") {
		attributes = ["custo_limpeza", "custo_perda", "data", "horas", "id_modelo", "identificacao", "limpeza_viabilidade", "perda", "perda_h", "timestamp", "tot_ideal", "tot_prod", "ts_viabilidade"];
	} else if (table === "sujidade_1_ufms") {
		attributes = ["data", "timestamp"];
	}

	return attributes;

}

export default getTableAttributes;