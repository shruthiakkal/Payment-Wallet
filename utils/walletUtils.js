export const roundOffFDecimalPlaces =(number, decimalPlace)=>{

  return Math.round(number * 10**decimalPlace, decimalPlace)/(10**decimalPlace);
}