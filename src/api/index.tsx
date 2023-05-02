import axios from "axios";
export async function coviddata() {
    let resp =await axios.get('https://disease.sh/v3/covid-19/all').then().catch((e:any)=>{console.log(e)})
    return resp?.data;
}
export async function countriesdata() {
    let resp =await axios.get('https://disease.sh/v3/covid-19/countries').then().catch((e:any)=>{console.log(e)})
    return resp?.data;
}
export async function countrydata(countryCode:string) {
    let resp =await axios.get(`https://disease.sh/v3/covid-19/countries/${countryCode}`).then().catch((e:any)=>{console.log(e)})
    return resp?.data;
}

export async function countryhistory(data:string='all') {
    let resp =await axios.get(`https://disease.sh/v3/covid-19/historical/all?lastdays=${data}`).then().catch((e:any)=>{console.log(e)})
    return resp;
}
