const page = document.body.dataset.page;

if (page === "start") {

    document.getElementById("highscore").textContent =
        "ハイスコア: " + (localStorage.getItem("highScore") || 0);

    document.getElementById("startForm").addEventListener("submit", e => {
        e.preventDefault();
        const time = document.querySelector('input[name="time"]:checked').value;
        window.location.href = `game.html?time=${time}`;
    });
}

if (page === "game") {

    const params = new URLSearchParams(location.search);
    let timeLeft = parseInt(params.get("time")) || 10;
    let score = 0;

    const timeDisplay = document.getElementById("time");
    const scoreDisplay = document.getElementById("score");
    const bgm = document.getElementById("bgm");
    const clickSound = document.getElementById("clickSound");
    const endSound = document.getElementById("endSound");

    timeDisplay.textContent = `残り時間: ${timeLeft}秒`;
    bgm.play();

    const timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = `残り時間: ${timeLeft}秒`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            bgm.pause();
            endSound.play();
            localStorage.setItem("lastScore", score);
            localStorage.setItem("lastTime", params.get("time"));
            if (score > (localStorage.getItem("highScore") || 0)) {
                localStorage.setItem("highScore", score);
            }
            location.href = "result.html";
        }
    }, 1000);

    document.getElementById("clickBtn").addEventListener("click", () => {
        score++;
        scoreDisplay.textContent = `スコア: ${score}`;
        clickSound.currentTime = 0;
        clickSound.play();
    });

}

if (page === "result") {

    const score = localStorage.getItem("lastScore");
    const time = localStorage.getItem("lastTime");
    const cps = (score / time).toFixed(2);

    document.getElementById("result").textContent = `スコア: ${score} 回`;
    document.getElementById("cps").textContent = `CPS: ${cps}`;
    document.getElementById("highscore").textContent ="ハイスコア: " + (localStorage.getItem("highScore") || 0);
       
    
}
