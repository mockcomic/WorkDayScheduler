let today = new Date()
let todayHour = new Date().getHours()
let dateEl = document.querySelector("#currentDay");
dateEl.textContent = today;
let container = document.querySelector("#container");
let blocks = 9;
let timeBlocks = [];

function businessHours(i) {
    if (i > 3) {
        return i + 9 - 12 + "PM"
    } else {
        return i + 9 + "AM"
    };
}

for (i = 0; blocks > i; i++) {
    let timeBlockEl = document.createElement("ul");
    timeBlockEl.id = i + 9;
    container.appendChild(timeBlockEl);

    let timeSlotEl = document.createElement("p");
    timeSlotEl.className = "hour";
    timeSlotEl.textContent = `${businessHours(i)}`;
    timeBlockEl.appendChild(timeSlotEl);

    let taskInputEl = document.createElement("input")
    taskInputEl.className = "input";
    taskInputEl.id = `${i}input`
    taskInputEl.value = JSON.parse(localStorage.getItem(`task${i}`));
    timeBlockEl.appendChild(taskInputEl);

    let saveButtonEl = document.createElement("button");
    saveButtonEl.className = "saveBtn";
    saveButtonEl.textContent = "Save";
    taskInputEl.id = `${i}save`
    timeBlockEl.appendChild(saveButtonEl);
    timeBlocks.push(timeBlockEl)

    if (timeBlockEl.id == todayHour) {
        taskInputEl.className = "present input"
    }
    if (timeBlockEl.id < todayHour) {
        taskInputEl.className = "past input"
    }
    if (timeBlockEl.id > todayHour) {
        taskInputEl.className = "future input"
    }

}

let inputValue = document.querySelectorAll(".input")
let saveButton = document.querySelectorAll(".saveBtn")
for (let i = 0; i < saveButton.length; i++) {
    saveButton[i].addEventListener("click", function () {
        localStorage.setItem(`task${i}`, JSON.stringify(inputValue[i].value));
    })
}