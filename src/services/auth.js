import jwt from 'jsonwebtoken';

const isAuthenticated = () => {
	let token = sessionStorage.getItem('accessToken');
	if (token != null) {
		let decoded = jwt.decode(token)
		if (decoded.iss === "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_mM4mx5nCj"){ //passar pra variavel ambiental
			return true;
		}
	}
	return false;
};
 
export default isAuthenticated;
