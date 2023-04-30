document.querySelector("#btnSearch").addEventListener("click", () => {

    let text = document.querySelector("#txtSearch").value;
    document.querySelector("#details").style.opacity = 0;
    getCountry(text);
    
}) 

async function getCountry(country) {

    try {

        const response = await fetch('https://restcountries.com/v3.1/name/' + country);
        if(!response.ok) {
            throw new Error("Country cannot be found. Please enter a valid text.");
        };
        const data = await response.json();
        renderCountry(data[0]);

        const countries = data[0].borders;
        if(!countries) {
            throw new Error("Neighbors do not exist for this country.");
        };
        const response2 = await fetch('https://restcountries.com/v3.1/alpha?codes=' + countries.toString());
        const neighbors = await response2.json();
        renderNeighbors(neighbors);
        
    }
    catch(err) {
        renderError(err);
    }
    //     .then((response) => {
    //         if(!response.ok) {
    //             throw new Error("Country cannot be found. Please enter a valid text.");
    //         }
    //         return response.json();
    //     })
    //     .then((data) => {
    //         
    //         

    //         if(!countries) {
    //             throw new Error("Neighbors do not exist for this country.");
    //         }

    //         return 
    //     })
    //     .then(response => {
    //         return response.json();
    //     })
    //     .then((data) => {
    //         
    //     })
    //     .catch(err => renderError(err));
}

function renderCountry(data) {

    document.querySelector("#country-details").innerHTML = "";
    document.querySelector("#neighbors").innerHTML = "";

    let html = `
        <div class="col-4">
            <img src="${data.flags.png}" alt="" class="img-fluid">
        </div>
        <div class="col-8">
            <div class="card-title">${data.name.common}</div>
            <hr>
            <div class="row">
                <div class="col-4">Population:</div>
                <div class="col-8">${(data.population / 1000000).toFixed(3)} Million</div>
            </div>
            <div class="row">
                <div class="col-4">Official Language:</div>
                <div class="col-8">${Object.values(data.languages)}</div>
            </div>
            <div class="row">
                <div class="col-4">Capital:</div>
                <div class="col-8">${data.capital[0]}</div>
            </div>
            <div class="row">
                <div class="col-4">Currency:</div>
                <div class="col-8">${Object.values(data.currencies)[0].name} (${Object.values(data.currencies)[0].symbol})</div>
            </div>
        </div>
    `;
    document.querySelector("#details").style.opacity = 1;
    document.querySelector("#country-details").innerHTML = html;
}

function renderNeighbors(data) {
    let html = "";
    for(let country of data) {
        html += `
            <div class="col-2 mt-2">
                <div class="card">
                    <img src="${country.flags.png}" class="card-img-top">
                    <div class="card-body">
                        <h6 class="card-title">${country.name.common}</h6>
                    </div>
                </div>
            </div>
        `
    }
    document.querySelector("#neighbors").innerHTML = html;
}

function renderError(err) {
    const html = `
        <div class="alert alert-danger">
            ${err.message}
        </div>
    `;

    setTimeout(function() {
        document.querySelector("#errors").innerHTML = "";
    }, 3000);

    document.querySelector("#errors").innerHTML = html;
}