document.getElementById("fetchAllPatients").addEventListener("click", () => {
    fetchData("http://localhost:8080/allpatients");
});

document.getElementById("fetchSixMonthsOldPatients").addEventListener("click", () => {
    fetchData("http://localhost:8080/patients/six_months_old");
});

document.getElementById("fetchOneYearOldPatients").addEventListener("click", () => {
    fetchData("http://localhost:8080/patients/one_year_old");
});

function fetchData(url) {
    // Clear existing data
    document.getElementById("dataBody").innerHTML = "";

    // Fetch data from API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Populate table with fetched data
            data.forEach(patient => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${patient.serialNo}</td>
                    <td>${patient.uhid}</td>
                    <td>${patient.patientName}</td>
                    <td>${patient.investigation}</td>
                    <td>${patient.bill}</td>
                    <td>${patient.date}</td>
                `;
                document.getElementById("dataBody").appendChild(row);
            });
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}
