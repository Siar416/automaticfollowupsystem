const table = document.getElementById("table-body");
const btnEl = document.getElementById("next-btns");
const searchBtn = document.getElementById("search-btn");
const dropDown = document.getElementById("drop-down");
let data;

const BASE_URL = "https://www.autofs.com/sortapi.php";

const getData = async () => {
  const response = await fetch(BASE_URL);
  data = await response.json();
  displayData(data.slice(0, 10));
  displayButtons(data);
};

const clearButton = () => {
  btnEl.innerHTML = "";
};

const displayData = (data) => {
  const htmlString = data
    .map((person) => {
      return `<tr>
    <td>${person.Employee_Name}</td>
    <td>${person.Employee_Position}</td>
    <td>${person.Employee_Office}</td>
    <td>${person.Employee_Age}</td>
    <td>${person.Employee_Startdate}</td>
    <td>${person.Employee_Salary}</td>
    </tr>`;
    })
    .join("");
  table.innerHTML = htmlString;
};

const displayButtons = (data) => {
  const numberOfPages = Math.ceil(data.length / 10);
  for (let i = 1; i <= numberOfPages; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    btn.classList.add("btn");
    btnEl.appendChild(btn);
  }

  const btns = document.querySelectorAll(".btn");
  btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const pageNumber = e.target.innerText;
      displayData(data.slice((pageNumber - 1) * 10, pageNumber * 10));
    });
  });
};

const filterData = () => {
  const minAge = document.getElementById("min-age").value;
  const maxAge = document.getElementById("max-age").value;
  const minSalary = document.getElementById("min-salary").value;
  const maxSalary = document.getElementById("max-salary").value;

  const filteredData = data.filter((person) => {
    if (minAge && maxAge) {
      if (person.Employee_Age >= minAge && person.Employee_Age <= maxAge) {
        return person;
      }
    } else if (minSalary && maxSalary) {
      if (
        person.Employee_Salary >= minSalary &&
        person.Employee_Salary <= maxSalary
      ) {
        return person;
      }
    } else if (dropDown.value === "1") {
      return data.sort((a, b) => b.Employee_Salary - a.Employee_Salary);
    } else if (dropDown.value === "2") {
      console.log(dropDown.value);

      return data.filter((person) => {
        if (
          person.Employee_Salary >= 100000 &&
          person.Employee_Salary <= 200000
        ) {
          return person;
        }
      });
    } else if (dropDown.value === "3") {
      return data.filter((person) => {
        if (
          person.Employee_Salary >= 200000 &&
          person.Employee_Salary <= 300000
        ) {
          return person;
        }
      });
    } else if (dropDown.value === "4") {
      return data.sort((a, b) => a.Employee_Salary - b.Employee_Salary);
    } else {
      return person;
    }
  });

  console.log(filteredData);

  displayData(filteredData.slice(0, 10));
  clearButton();
  displayButtons(filteredData);
};

searchBtn.addEventListener("click", () => filterData(data));
getData();
