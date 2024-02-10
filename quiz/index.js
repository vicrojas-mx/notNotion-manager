const form = document.querySelector(".quiz-form");
const correctAnswer = ["D", "B", "C", "B", "D"];
const result = document.querySelector(".result");
const questions = document.querySelectorAll(".question");
console.log(questions);

form.addEventListener("submit", (event) => {
    let score = 0;
    const userAnswers = [form.q1.value, form.q2.value, form.q3.value, form.q4.value, form.q5.value];
    userAnswers.forEach((element, index) => {
        if (element === correctAnswer[index]) {
          score += 1;
          questions[index].classList.add("correct");
        }  else {
            questions[index].classList.add("wrong");
        }
    });
    
    scrollTo(0,0);
    result.querySelector("p").textContent = `You scored ${score}/5!`;
    result.classList.remove("hide");
    event.preventDefault();
})