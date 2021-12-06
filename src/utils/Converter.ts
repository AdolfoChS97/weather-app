export default class Converter {
    static kelvinToCelsius(kelvinDegrees: number | undefined): number {
        const celsiusDegrees: number = 273.15 
        if(kelvinDegrees) return kelvinDegrees - celsiusDegrees
        else return -celsiusDegrees
    }
}