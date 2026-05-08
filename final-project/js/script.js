const music = document.getElementById("studyMusic");
const musicButton = document.getElementById("musicButton");

if (music && musicButton) {
  musicButton.addEventListener("click", function () {
    if (music.paused) {
      music.play();
      musicButton.textContent = "Pause Study Music";
    } else {
      music.pause();
      musicButton.textContent = "Play Study Music";
    }
  });
}

const budgetForm = document.getElementById("budgetForm");

function getNumber(id) {
  const value = document.getElementById(id).value;
  return Number(value) || 0;
}

function animateNumber(elementId, finalNumber) {
  const element = document.getElementById(elementId);

  if (!element) {
    return;
  }

  let currentNumber = 0;
  const speed = 20;
  const step = Math.max(1, Math.ceil(finalNumber / 40));

  const counter = setInterval(function () {
    currentNumber += step;

    if (currentNumber >= finalNumber) {
      currentNumber = finalNumber;
      clearInterval(counter);
    }

    element.textContent = currentNumber.toLocaleString();
  }, speed);
}

function updateChart(rent, food, savings, other) {
  const chart = document.getElementById("budgetChart");

  if (!chart) {
    return;
  }

  const total = rent + food + savings + other;

  if (total === 0) {
    chart.style.background = "conic-gradient(#ddd 0% 100%)";
    return;
  }

  const rentPercent = (rent / total) * 100;
  const foodPercent = rentPercent + (food / total) * 100;
  const savingsPercent = foodPercent + (savings / total) * 100;

  chart.style.background = `
    conic-gradient(
      #6f2cff 0% ${rentPercent}%,
      #43b6e8 ${rentPercent}% ${foodPercent}%,
      #43aa8b ${foodPercent}% ${savingsPercent}%,
      #f04fa1 ${savingsPercent}% 100%
    )
  `;
}

if (budgetForm) {
  budgetForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const income = getNumber("income");
    const rent = getNumber("rent");
    const food = getNumber("food");
    const other = getNumber("other");
    const savings = getNumber("savings");

    const totalSpending = rent + food + other + savings;
    const remaining = income - totalSpending;

    animateNumber("incomeResult", income);
    animateNumber("billsResult", totalSpending);
    animateNumber("remainingResult", Math.abs(remaining));

    updateChart(rent, food, savings, other);

    const insight = document.getElementById("budgetInsight");
    const tips = document.getElementById("budgetTips");

    if (remaining > 0) {
      insight.textContent =
        "Good job. Your budget leaves you with money left over this month. That extra amount can help with savings, emergency costs, or paying down debt.";

      tips.innerHTML = `
        <li>You have $${remaining.toLocaleString()} left after planned spending.</li>
        <li>Consider moving part of that amount into savings before spending it.</li>
        <li>Keep some money flexible for gas, books, food, or unexpected school costs.</li>
      `;
    } else if (remaining === 0) {
      insight.textContent =
        "Your budget uses your full monthly income. This works on paper, but it does not leave much room for unexpected expenses.";

      tips.innerHTML = `
        <li>Try lowering food, entertainment, or subscription spending.</li>
        <li>Even saving $20 to $50 can give you more breathing room.</li>
        <li>Build a small emergency buffer before adding extra spending.</li>
      `;
    } else {
      insight.textContent =
        "Your planned spending is higher than your income. This may lead to stress, debt, or overdraft fees if nothing changes.";

      tips.innerHTML = `
        <li>You are over budget by $${Math.abs(remaining).toLocaleString()}.</li>
        <li>Review your largest bill and your flexible spending categories first.</li>
        <li>Look for subscriptions, food delivery, entertainment, or shopping costs you can reduce.</li>
      `;
    }
  });
}