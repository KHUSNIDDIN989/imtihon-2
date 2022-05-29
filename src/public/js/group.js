const charactersList = document.querySelector("#owevflow");
const searchBar = document.querySelector("#search");
const filter = document.querySelector("#filter");
const class_days = document.querySelector("#class_days");
const inputAddress = document.querySelector("#inputAddress");
const teacher = document.querySelector("#teacher");
const selectteacher = document.querySelector("#selectteacher");

let hpCharacters = [];
searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value;

  const filteredCharacters = hpCharacters.filter((character) => {
    return character.group_name
      .toLowerCase()
      .includes(searchString.toLowerCase());
  });
  displayCharacters(filteredCharacters);
});
filter.addEventListener("click", (e) => {
  const searchString = e.target.value;

  const filteredCharacters = hpCharacters.filter((character) => {
    return character.group_name
      .toLowerCase()
      .includes(searchString.toLowerCase().trim());
  });
  displayCharacters(filteredCharacters);
});

const loadCharacters = async () => {
  try {
    const res = await fetch("http://localhost:9999/groupsfront");
    hpCharacters = await res.json();
    displayCharacters(hpCharacters);
  } catch (err) {
    console.error(err);
  }
};

const displayCharacters = (characters) => {
  const htmlString = characters
    .map((e, i) => {
      return `
             <div class="col-md-4 mb-3 mt-4">
    <div class="card h-100 card__card">
      <div
        class="bg-primary informatika d-flex justify-content-between px-3 align-items-center"
      >
        <p class="text-light mt-3">${e.group_name}</p>
        <p class="mt-4 pointer" id="delete__group" data-delete="${e.group_id}">&#10006;</p>
      </div>
      <div class="p-3">
        <div class="d-flex">
          <img
            src="./images/Group 30.png"
            width="50"
            height="50"
            class="mt-2"
            alt=""
          />
          <div class="">
            <p class="card__p">
              O’qituvchi:
              <span class="card__span padding">${e.teacher_name} </span>
            </p>
            <p class="card__p">
              yunalishi:
              <span class="card__span">${e.courses_name} </span>
            </p>
          </div>
        </div>
        <div class="d-flex justify-content-between">
          <p class="card__p">Dars kunlari:</p>
          <p class="card__span">${e.class_days}</p>
        </div>
        <div class="d-flex justify-content-between">
          <p class="card__p">Dars vaqti:</p>
          <p class="card__span">${e.class_time}</p>
        </div>
        <div class="d-flex justify-content-between">
          <p class="card__p">O’quvchilar soni:</p>
          <p class="card__span">${e.student_count}</p>
        </div>
        <div class="d-flex justify-content-between">
          <p class="card__p">guruh yaratilgan sana:</p>
          <p class="card__span">${e.group_date}</p>
        </div>
      </div>
    </div>
  </div>
        `;
    })
    .join("");
  charactersList.innerHTML = htmlString;
};

loadCharacters();

// DELETED STUDENET
charactersList.addEventListener("click", (e) => {
  if (e.target.matches("#delete__group")) {
    fetch(`http://localhost:9999/groups/${e.target.dataset.delete}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          window.location.href = "groups";
        }
      });
  }
});

let dataArr = [];
teacher.addEventListener("click", (e) => {
  const dataTarget = e.target.value;
  const filterData = dataArr.filter((e) =>
    e.teacher_name.toLowerCase().includes(dataTarget.toLowerCase().trim())
  );

  dsRender(filterData);
});

const selectHendler = async () => {
  try {
    const res = await fetch("http://localhost:9999/groups_teacher");
    dataArr = await res.json();
    console.log(dataArr);

    dsRender(dataArr);
  } catch (err) {
    console.error(err);
  }
};

const dsRender = (data) => {
  const htmlString = data
    .map((character, i) => {
      return `
            <option>${character.teacher_group_name}</option>
        `;
    })
    .join("");
  selectteacher.innerHTML = htmlString;
};
selectHendler();
