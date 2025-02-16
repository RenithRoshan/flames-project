function calculateFlames() {
    let firstName = document.getElementById("firstName").value.trim().toLowerCase();
    let secondName = document.getElementById("secondName").value.trim().toLowerCase();
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

    while(flames.length > 1){
        index = (index + count - 1) % flames.length;
        flames.splice(index, 1);
    }

    resultText.textContent = ` Your Relationship Bond : ${flames[0]}`;

    switch(flames[0]){
        case "Friendship 🤝":
            resultImage.innerHTML = `<img src="./images/friends.jpg" alt="friends.jpg">`;
            break;
        case "Love ❤️":
            resultImage.innerHTML = `<img src="./images/love.jpg" alt="love.jpg">`;
            break;
        case "Affection 🥰":
            resultImage.innerHTML = `<img src="./images/affection.jpg" alt="affection.jpg">`;
            break;
        case "Marriage 💍":
            resultImage.innerHTML = `<img src="./images/marriage.jpg" alt="marriage.jpg">`;
            break;
        case "Enemy ⚔️":
            resultImage.innerHTML = `<img src="./images/enemy.jpg" alt="enemy.jpg">`;
            break;
        case "Siblings 👯":
            resultImage.innerHTML = `<img src="./images/siblings.jpg" alt="siblings.jpg">`;
            break;
        default:
            break;
    }
}