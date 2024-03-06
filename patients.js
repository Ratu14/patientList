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


document.getElementById("downloadCsvBtn").addEventListener("click", downloadCsv);

function downloadCsv() {
    const table = document.getElementById("dataTable");
    const rows = table.querySelectorAll("tr");
    let csvContent = "data:text/csv;charset=utf-8,";
    rows.forEach(row => {
        const rowData = [];
        row.querySelectorAll("th, td").forEach(cell => {
            rowData.push(cell.innerText);
        });
        csvContent += rowData.join(",") + "\n";
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "patients.csv");
    document.body.appendChild(link);
    link.click();
}
