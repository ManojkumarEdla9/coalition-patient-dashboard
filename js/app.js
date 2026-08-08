// =========================
// LOAD PATIENT DATA
// =========================

getPatients()
    .then(patients => {

        // Find Jessica Taylor only
        const jessica = patients.find(
            patient => patient.name === "Jessica Taylor"
        );

        if (!jessica) {
            throw new Error("Jessica Taylor not found");
        }

        console.log("Jessica Taylor:", jessica);


        // =========================
        // PATIENT INFORMATION
        // =========================

        document.getElementById("patient-name").textContent =
            jessica.name;

        document.getElementById("patient-gender-age").textContent =
            `${jessica.gender}, ${jessica.age}`;

        document.getElementById("patient-image").src =
            jessica.profile_picture;

        const sidebarImage =
            document.getElementById("sidebar-patient-image");

        if (sidebarImage) {
            sidebarImage.src = jessica.profile_picture;
        }

        document.getElementById("date-of-birth").textContent =
            formatDate(jessica.date_of_birth);

        document.getElementById("phone-number").textContent =
            jessica.phone_number;

        document.getElementById("emergency-contact").textContent =
            jessica.emergency_contact;

        document.getElementById("insurance-type").textContent =
            jessica.insurance_type;


        // =========================
        // DIAGNOSIS HISTORY
        // =========================

        const history = [...jessica.diagnosis_history];

        console.log("Diagnosis History:", history);

        if (!history.length) {
            console.warn("No diagnosis history available");
            return;
        }


        // API data is newest → oldest.
        // Reverse for chart: oldest → newest.
        const chartHistory = [...history].reverse();


        // =========================
        // CHART DATA
        // =========================

        const labels = chartHistory.map(item =>
            `${item.month.substring(0, 3)} ${item.year}`
        );

        const systolic = chartHistory.map(item =>
            item.blood_pressure.systolic.value
        );

        const diastolic = chartHistory.map(item =>
            item.blood_pressure.diastolic.value
        );


        // =========================
        // BLOOD PRESSURE CHART
        // =========================

        const chartCanvas =
            document.getElementById("bloodPressureChart");

        if (chartCanvas) {

            new Chart(chartCanvas, {

                type: "line",

                data: {

                    labels: labels,

                    datasets: [

                        {
                            label: "Systolic",

                            data: systolic,

                            borderColor: "#e85d75",

                            backgroundColor: "#e85d75",

                            borderWidth: 2,

                            tension: 0.4,

                            pointRadius: 3,

                            pointHoverRadius: 5
                        },

                        {
                            label: "Diastolic",

                            data: diastolic,

                            borderColor: "#8b45b5",

                            backgroundColor: "#8b45b5",

                            borderWidth: 2,

                            tension: 0.4,

                            pointRadius: 3,

                            pointHoverRadius: 5
                        }

                    ]
                },


                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    interaction: {
                        mode: "index",
                        intersect: false
                    },


                    plugins: {

                        legend: {
                            display: false
                        },

                        tooltip: {
                            enabled: true
                        }

                    },


                    scales: {

                        y: {

                            min: 60,

                            max: 180,

                            ticks: {
                                stepSize: 20
                            },

                            grid: {
                                color: "#e9e9e9"
                            }
                        },


                        x: {

                            ticks: {
                                maxRotation: 45,
                                minRotation: 45
                            },

                            grid: {
                                display: false
                            }
                        }

                    }

                }

            });
        }


        // =========================
        // LATEST HEALTH INFORMATION
        // =========================

        // API returns newest record first.
        const latest = history[0];

        console.log("Latest health data:", latest);


        // =========================
        // RESPIRATORY RATE
        // =========================

        if (latest.respiratory_rate) {

            const respiratoryRate =
                document.getElementById("respiratory-rate");

            const respiratoryLevel =
                document.getElementById("respiratory-level");

            if (respiratoryRate) {

                respiratoryRate.textContent =
                    `${latest.respiratory_rate.value} bpm`;
            }

            if (respiratoryLevel) {

                respiratoryLevel.textContent =
                    latest.respiratory_rate.levels;
            }
        }


        // =========================
        // TEMPERATURE
        // =========================

        if (latest.temperature) {

            const temperature =
                document.getElementById("temperature");

            const temperatureLevel =
                document.getElementById("temperature-level");

            if (temperature) {

                temperature.textContent =
                    `${latest.temperature.value} °F`;
            }

            if (temperatureLevel) {

                temperatureLevel.textContent =
                    latest.temperature.levels;
            }
        }


        // =========================
        // HEART RATE
        // =========================

        if (latest.heart_rate) {

            const heartRate =
                document.getElementById("heart-rate");

            const heartRateLevel =
                document.getElementById("heart-rate-level");

            if (heartRate) {

                heartRate.textContent =
                    `${latest.heart_rate.value} bpm`;
            }

            if (heartRateLevel) {

                heartRateLevel.textContent =
                    latest.heart_rate.levels;
            }
        }


        // =========================
        // DIAGNOSTIC LIST
        // =========================

        const diagnosticContainer =
            document.getElementById("diagnostic-list");

        if (diagnosticContainer) {

            diagnosticContainer.innerHTML = "";

            if (jessica.diagnostic_list) {

                jessica.diagnostic_list.forEach(diagnostic => {

                    const row =
                        document.createElement("div");

                    row.className =
                        "diagnostic-row";

                    row.innerHTML = `
                        <span>${diagnostic.name}</span>
                        <span>${diagnostic.description}</span>
                        <span>${diagnostic.status}</span>
                    `;

                    diagnosticContainer.appendChild(row);
                });
            }
        }


        // =========================
        // LAB RESULTS
        // =========================

        const labContainer =
            document.getElementById("lab-results");

        if (labContainer) {

            labContainer.innerHTML = "";

            if (jessica.lab_results) {

                jessica.lab_results.forEach(lab => {

                    const item =
                        document.createElement("div");

                    item.className =
                        "lab-item";

                    item.innerHTML = `
                        <span>${lab}</span>
                        <span class="download-icon">↓</span>
                    `;

                    labContainer.appendChild(item);
                });
            }
        }


        console.log(
            "Jessica displayed successfully"
        );

    })


// =========================
// ERROR HANDLING
// =========================

.catch(error => {

    console.error(
        "Unable to load patient data:",
        error
    );

});


// =========================
// DATE FORMATTER
// =========================

function formatDate(dateString) {

    if (!dateString) {
        return "--";
    }

    const date = new Date(dateString);

    const month =
        String(date.getMonth() + 1).padStart(2, "0");

    const day =
        String(date.getDate()).padStart(2, "0");

    const year =
        date.getFullYear();

    return `${month}/${day}/${year}`;
}