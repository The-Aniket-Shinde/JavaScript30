// const base_url = "https://countriesnow.space/api/v0.1/countries/population/cities";

// async function fetch(){
//     let promise = await fetch(base_url);
//     if(promise.status != 200){
//         fetch();
//         return
//     }else{
//         console.log(promise);
//         let data = await promise.json();
//         console.log(data);
//     }
    
// }

// fetch();

// var requestOptions = {
//   method: 'GET',
//   redirect: 'follow'
// };

// fetch("https://countriesnow.space/api/v0.1/countries/states", requestOptions)
//   .then(response => response.text())
//   .then(result => console.table(result))
//   .catch(error => console.log('error', error));
let data = [];
let countrysData = [];
let statesdata = [];
let finalData = [];
let priority = "country";

const priorityButton = document.getElementById('priorityButton');
const searchBar = document.getElementById('searchBar');
const results = document.getElementById('results');

function changePriority(){
    if(priority==="country"){
        priority="state"
        priorityButton.innerText="state"
    }else{
        priority="country"
        priorityButton.innerText="country"
    }
}


async function fetchData() {
    try {
    const URL = 'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/refs/heads/master/json/countries%2Bstates.json';
    const response = await fetch(URL);
    if (!response.ok) throw new Error('Failed to load data');
    data = await response.json();
    createData();
    console.log('data loaded.');
    } catch (err) {
    console.error('Error fetching data:', err);
    }
}

function createData(){
    data.forEach((object) => {
        countrysData.push(object.name);
        statesdata.push(object.states);
    });

    for (let i = 0; i < countrysData.length; i++) {
        for (let j = 0; j < statesdata[i].length; j++) {
            finalData.push(`${countrysData[i]}, ${statesdata[i][j]}`);
        }
    }
} 

function findMatches(searchWord, finalData) {
    const search = searchWord.toLowerCase().trim();
    const matches = finalData.filter(place =>
        place.toLowerCase().includes(search)
    );

    matches.sort((firstPlace, secondPlace) => {
        const firstCountry = firstPlace.split(", ")[0].toLowerCase();
        const secondCountry = secondPlace.split(", ")[0].toLowerCase();

        if (priority === "country") {
            return secondCountry.startsWith(search) - firstCountry.startsWith(search);
        }

        if (priority === "state") {
            const firstState = firstPlace.split(", ")[1].toLowerCase();
            const secondState = secondPlace.split(", ")[1].toLowerCase();

            return secondState.startsWith(search) - firstState.startsWith(search);
        }
    });

    return matches;
}

// function display(){
//     let matches = findMatches(this.value , finalData);
//     if(matches===0){
//         results.innerHTML =`<li>Country Name</li><li>Or State Name</li>`
//         return
//     }
//     if(matches.length===0){
//         results.innerHTML =`<li>Nothing Found</li><li>Plz try again</li>`
//         return
//     }
//     results.innerHTML=``;
//     for (let a = 0; a < 20 && a < matches.length; a++) { 
//         results.innerHTML +=`<li>${matches[a]}</li>`;
//     }
// }

function display() {
    if(this.value===""){return results.innerHTML = `<li>Enter City</li><li>Or State Name</li>`;}

    let matches = findMatches(this.value, finalData);

    // if (matches === 0) {
    //     results.innerHTML = `<li>Country Name</li><li>Or State Name</li>`;
    //     return;
    // }

    if (matches.length === 0) {
        results.innerHTML = `<li>Nothing Found</li><li>Plz try again</li>`;
        return;
    }

    results.innerHTML = ``;

    for (let index = 0; index < 20 && index < matches.length; index++) {
    // for (let index = 0;index < matches.length; index++) {
        let place = matches[index];

        let highlight = place.replace(
            // new RegExp(this.value, "gi"), 
            new RegExp(this.value, "i"), 
            (match) => {
                return `<span class="highlight">${match}</span>`;
            }
        );

        results.innerHTML += `<li>${highlight}</li>`;
    }
}

// function findMatches(wordInput, finalData) {
//   return finalData.filter(place => {
//     const regex = new RegExp(wordInput, 'gi');
//     return place.match(regex) 
//   });
// }
fetchData();
priorityButton.addEventListener('click',changePriority);
searchBar.addEventListener('keyup',display);
