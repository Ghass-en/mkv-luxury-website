const form = document.getElementById("contact-form");
const successMessage = document.getElementById("success-message");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Simulation d’un appel API
    fakeApiCall().then(() => {
        successMessage.style.display = "block";
        form.reset();
    });
});

function fakeApiCall() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });
}
