/* eslint-disable eqeqeq */
/**
 * Compara igualdade entre dois arrays.
 * @param {Array} prev 
 * @param {Array} next 
 */
const arrayComparator = (prev, next) => {

    if(prev.lenght == next.length) {
        return false;
    } else {
        for (let i = 0; i < prev.length; i++) {
            if(prev[i] != next[i]) {
                return false;
            }
        }
    }

    return true;

}

export default arrayComparator;