let pomodoroTime = 25 * 60; 
let countdownTime = 0;
let taskTime = 0;
let stopwatchTime = 0;
let moodTime = 0;
let pomodoroInterval, countdownInterval, taskInterval, stopwatchInterval, moodInterval;
let tasksHistory = [];

function updateTimeDisplay(time, elementId) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  document.getElementById(elementId).textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function loadTaskHistory() {
  chrome.storage.local.get(["tasksHistory"], function(result) {
    if (result.tasksHistory) {
      tasksHistory = result.tasksHistory;
      displayTaskHistory();
    }
  });
}

function displayTaskHistory() {
  const historyElement = document.getElementById("task-history");
  if (tasksHistory.length > 0) {
    historyElement.innerHTML = tasksHistory.map(task => {
      return `<div>${task.name}: ${task.time}</div>`;
    }).join('');
  } else {
    historyElement.innerHTML = '<div>No tasks saved.</div>';
  }
}

document.getElementById("delete-tasks").addEventListener("click", () => {
  chrome.storage.local.remove("tasksHistory", function() {
    tasksHistory = []; 
    displayTaskHistory(); 
    alert("Task history deleted!");
  });
});

document.getElementById("start-pomodoro").addEventListener("click", () => {
  if (pomodoroInterval) clearInterval(pomodoroInterval);
  pomodoroInterval = setInterval(() => {
    if (pomodoroTime > 0) {
      pomodoroTime--;
      updateTimeDisplay(pomodoroTime, "pomodoro-time");
    } else {
      clearInterval(pomodoroInterval);
      alert("Pomodoro complete! Take a break.");
    }
  }, 1000);
});

document.getElementById("pause-pomodoro").addEventListener("click", () => {
  clearInterval(pomodoroInterval);
  pomodoroInterval = null;
});

document.getElementById("reset-pomodoro").addEventListener("click", () => {
  clearInterval(pomodoroInterval);
  pomodoroTime = 25 * 60; 
  updateTimeDisplay(pomodoroTime, "pomodoro-time");
  pomodoroInterval = null;
});

document.getElementById("start-countdown").addEventListener("click", () => {
  const minutes = parseInt(document.getElementById("countdown-input").value, 10);
  countdownTime = minutes * 60;
  if (countdownInterval) clearInterval(countdownInterval);
  countdownInterval = setInterval(() => {
    if (countdownTime > 0) {
      countdownTime--;
      updateTimeDisplay(countdownTime, "countdown-time");
    } else {
      clearInterval(countdownInterval);
      alert("Countdown finished!");
    }
  }, 1000);
});

document.getElementById("pause-countdown").addEventListener("click", () => {
  clearInterval(countdownInterval);
  countdownInterval = null;
});

document.getElementById("reset-countdown").addEventListener("click", () => {
  clearInterval(countdownInterval);
  countdownTime = 0;
  updateTimeDisplay(countdownTime, "countdown-time");
  countdownInterval = null;
});

document.getElementById("start-task").addEventListener("click", () => {
  const taskName = document.getElementById("task-name").value;
  taskTime = 0;
  if (taskInterval) clearInterval(taskInterval);
  taskInterval = setInterval(() => {
    taskTime++;
    updateTimeDisplay(taskTime, "task-time");
  }, 1000);
});

document.getElementById("pause-task").addEventListener("click", () => {
  if (taskInterval) {
    clearInterval(taskInterval);
    taskInterval = null;

    // Save the task time when paused
    const taskName = document.getElementById("task-name").value;
    const taskDuration = `${Math.floor(taskTime / 60)}:${String(taskTime % 60).padStart(2, '0')}`;
    
    chrome.storage.local.get(["tasksHistory"], function(result) {
      tasksHistory = result.tasksHistory || [];
      tasksHistory.push({
        name: taskName,
        time: taskDuration
      });
      chrome.storage.local.set({ tasksHistory: tasksHistory });
    });
  }
});

document.getElementById("reset-task").addEventListener("click", () => {
  clearInterval(taskInterval);
  taskTime = 0;
  updateTimeDisplay(taskTime, "task-time");
  taskInterval = null;
});

document.getElementById("show-tasks").addEventListener("click", () => {
  displayTaskHistory();
});

document.getElementById("start-stopwatch").addEventListener("click", () => {
  if (stopwatchInterval) clearInterval(stopwatchInterval);
  stopwatchInterval = setInterval(() => {
    stopwatchTime++;
    updateTimeDisplay(stopwatchTime, "stopwatch-time");
  }, 1000);
});

document.getElementById("pause-stopwatch").addEventListener("click", () => {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
});

document.getElementById("reset-stopwatch").addEventListener("click", () => {
  clearInterval(stopwatchInterval);
  stopwatchTime = 0;
  updateTimeDisplay(stopwatchTime, "stopwatch-time");
  stopwatchInterval = null;
});

document.getElementById("energetic-mood").addEventListener("click", () => {
  moodTime = 0;
  if (moodInterval) clearInterval(moodInterval);
  moodInterval = setInterval(() => {
    moodTime++;
    updateTimeDisplay(moodTime, "mood-time");
  }, 1000);
});

document.getElementById("calm-mood").addEventListener("click", () => {
  moodTime = 0;
  if (moodInterval) clearInterval(moodInterval);
  moodInterval = setInterval(() => {
    moodTime++;
    updateTimeDisplay(moodTime, "mood-time");
  }, 1000);
});

document.getElementById("restful-mood").addEventListener("click", () => {
  moodTime = 0;
  if (moodInterval) clearInterval(moodInterval);
  moodInterval = setInterval(() => {
    moodTime++;
    updateTimeDisplay(moodTime, "mood-time");
  }, 1000);
});

document.getElementById("focused-mood").addEventListener("click", () => {
    moodTime = 0;
    if (moodInterval) clearInterval(moodInterval);
    moodInterval = setInterval(() => {
      moodTime++;
      updateTimeDisplay(moodTime, "mood-time");
    }, 1000);
  });

document.getElementById("mindful-mood").addEventListener("click", () => {
    moodTime = 0;
    if (moodInterval) clearInterval(moodInterval);
    moodInterval = setInterval(() => {
      moodTime++;
      updateTimeDisplay(moodTime, "mood-time");
    }, 1000);
  });

document.getElementById("pause-mood").addEventListener("click", () => {
  clearInterval(moodInterval);
  moodInterval = null;
});

document.getElementById("reset-mood").addEventListener("click", () => {
  clearInterval(moodInterval);
  moodTime = 0;
  updateTimeDisplay(moodTime, "mood-time");
  moodInterval = null;
});

loadTaskHistory();

const tips = [
    "Start with small tasks - even your procrastinating self can handle that",
    "Break work into pieces smaller than your attention span",
    "10 minutes of work beats 10 hours of staring dramatically at your screen",
    "Your productivity is inversely proportional to your movie queue",
    "Reward yourself, because let's face it, no one else will",
    "You're not lazy, you're energy-efficient... right? 🤡",
    "Treat your to-do list like a roast battle with your own incompetence",
    "Momentum is just peer pressure from your future self",
    "Your potential is 90% caffeine and 10% pure chaos",
    "Work like you're trying to prove your imposter syndrome wrong",
    "Productivity hack: Pretend your future self is judging your current laziness",
    "You have the attention span of a goldfish? Challenge accepted.",
    "Multitasking is just failing at multiple things simultaneously",
    "Your comfort zone is where dreams go to take a nap"
];

function displayRandomTip() {
    const randomIndex = Math.floor(Math.random() * tips.length);
    const tipContainer = document.getElementById('tip-container');
    tipContainer.innerHTML = `<p>${tips[randomIndex]}</p>`;
}

window.onload = displayRandomTip;