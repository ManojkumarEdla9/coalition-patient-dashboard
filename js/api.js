const API_URL =
    "https://fedskillstest.coalitiontechnologies.workers.dev";

const username = "coalition";
const password = "skills-test";

const auth = btoa(`${username}:${password}`);

async function getPatients() {

    const response = await fetch(API_URL, {

        method: "GET",

        headers: {
            "Authorization": `Basic ${auth}`
        }

    });

    if (!response.ok) {

        throw new Error(
            `API request failed: ${response.status}`
        );

    }

    return await response.json();
}