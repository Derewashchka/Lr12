document.addEventListener('DOMContentLoaded', function () {
    let maxWords = 10;
    const words = [
        { en: "always", ua: "завжди" },
        { en: "never", ua: "ніколи" },
        { en: "sometimes", ua: "іноді" },
        { en: "often", ua: "часто" },
        { en: "rarely", ua: "рідко" },
        { en: "usually", ua: "зазвичай" },
        { en: "hello", ua: "привіт" },
        { en: "goodbye", ua: "до побачення" },
        { en: "thank you", ua: "дякую" },
        { en: "sorry", ua: "вибач" }
    ];
    let currentWord = words[0];
    let currentStep = 1;
    let correctCount = 0;
    let incorrectCount = 0;
    let level = 0;

    function checkAnswer() {
        const input = $(".input").val();
        if (input === currentWord.ua) {
            correctCount++;
            $(".stats").text(`Вірно: ${correctCount} Невірно: ${incorrectCount} Крок: ${currentStep}/${maxWords}`);
            alert("Вірно!");
        } else {
            incorrectCount++;
            $(".stats").text(`Вірно: ${correctCount} Невірно: ${incorrectCount} Крок: ${currentStep}/${maxWords}`);
            alert("Невірно!");
        }
        $(".input").val("");
        nextStep();
    }

    function nextStep() {
        currentStep++;
        if (currentStep > maxWords) {
            finish();
        } else {
            currentWord = words[Math.floor(Math.random() * words.length)];
            $(".card").text(currentWord.en);
            $(".stats").text(`Вірно: ${correctCount} Невірно: ${incorrectCount} Крок: ${currentStep}/${maxWords}`);
            $(".bar").css("width", (currentStep - 1) / maxWords * 100 + "%");
        }
    }

    function finish() {
        level = Math.round((correctCount / maxWords) * 100);
        $(".modal-content").text(`Рівень знань: ${level}%`);
        $(".modal").show();
    }

    $(".button").click(checkAnswer);

    $("#difficulty").change(function () {
        const selectedDifficulty = $(this).val();
        if (selectedDifficulty === "easy") {
            maxWords = 10;
        } else if (selectedDifficulty === "medium") {
            maxWords = 20;
        } else if (selectedDifficulty === "hard") {
            maxWords = 30;
        }
        $(".card, .input, .button, .progress, .stats").show();
        resetGame();
    });

    function resetGame() {
        currentStep = 0;
        correctCount = 0;
        incorrectCount = 0;
        level = 0;
        nextStep();
    }
});
