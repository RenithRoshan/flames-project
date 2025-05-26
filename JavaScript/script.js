async function calculateFlames() {
    let firstName = document.getElementById("firstName").value.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    let secondName = document.getElementById("secondName").value.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    let resultText = document.getElementById("resultText");
    let resultImage = document.getElementById("resultImage");

    if (!firstName || !secondName) {
        resultText.innerHTML = "⚠️ Oops! Both names are needed to unlock destiny!";
        return;
    }

    let firstNameLetters = firstName.split("");
    let secondNameLetters = secondName.split("");

    for (let i = 0; i < firstNameLetters.length; i++) {
        for (let j = 0; j < secondNameLetters.length; j++) {
            if (firstNameLetters[i] === secondNameLetters[j]) {
                firstNameLetters[i] = "";
                secondNameLetters[j] = "";
                break;
            }
        }
    }

    let remainingLetters = firstNameLetters.join("") + secondNameLetters.join("");
    let count = remainingLetters.length;

    let flames = ["Friendship 🤝", "Love ❤️", "Affection 🥰", "Marriage 💍", "Enemy ⚔️", "Siblings 👯"];
    let index = 1;

    while (flames.length > 1) {
        index = (index + count - 1) % flames.length;
        flames.splice(index, 1);
    }

    let finalResult = flames[0]; // <- This safely holds the only remaining value
    resultText.textContent = ` Your Relationship Bond : ${finalResult}`;

    switch (finalResult) {
        case "Friendship 🤝":
            resultImage.innerHTML = `<img src="./images/friends.jpg" alt="friends">`;
            break;
        case "Love ❤️":
            resultImage.innerHTML = `<img src="./images/love.jpg" alt="love">`;
            break;
        case "Affection 🥰":
            resultImage.innerHTML = `<img src="./images/affection.jpg" alt="affection">`;
            break;
        case "Marriage 💍":
            resultImage.innerHTML = `<img src="./images/marriage.jpg" alt="marriage">`;
            break;
        case "Enemy ⚔️":
            resultImage.innerHTML = `<img src="./images/enemy.jpg" alt="enemy">`;
            break;
        case "Siblings 👯":
            resultImage.innerHTML = `<img src="./images/siblings.jpg" alt="siblings">`;
            break;
    }

    // ✅ All variables still in scope here
    console.log("Remaining Letters:", remainingLetters);
    console.log("Count:", count);
    console.log("FLAMES Result:", finalResult);

    // ✅ Send data to backend
    try {
        const response = await fetch('https://flames-backend-s0i2.onrender.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                yourName: firstName,
                crushName: secondName,
                result: finalResult.text
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("✅ Data saved to MongoDB:", data);
    } catch (error) {
        console.error("❌ Error saving to MongoDB:", error);
    }
}

// Add event listener for Enter key
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') calculateFlames();
    });
});