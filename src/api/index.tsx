import axios from "axios";
export async function coviddata() {
    // fetching all states covid data
    let resp = await axios.get('https://disease.sh/v3/covid-19/all').then().catch((e:any)=>{console.log(e)})
    return resp?.data;
}
export async function countriesdata() {
    // Fetching list of counties 
    let resp =await axios.get('https://disease.sh/v3/covid-19/countries').then().catch((e:any)=>{console.log(e)})
    return resp?.data;
}
export async function countrydata(countryCode:string) {
    // Fetching covid data for a specific country wrt countrycode
    let resp =await axios.get(`https://disease.sh/v3/covid-19/${countryCode==='worldwide'?`all`:`countries/`+countryCode}`).then().catch((e:any)=>{console.log(e)})
    return resp?.data;
}

export async function countryhistory(countryCode:string='worldwide',data:string='all') {
    // Fetching covid data for a specific country wrt countrycode for graph for following days
    let resp =await axios.get(`https://disease.sh/v3/covid-19/historical/${countryCode==='worldwide'?`all`:countryCode}?lastdays=${data}`).then().catch((e:any)=>{console.log(e)})
    return resp?.data;
}
