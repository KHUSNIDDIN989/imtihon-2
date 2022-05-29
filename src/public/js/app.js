const charactersList = document.querySelector("#tbody");
const searchBar = document.querySelector("#search");
const filter = document.querySelector("#filter");
const class_days = document.querySelector("#class_days");
const inputAddress = document.querySelector("#inputAddress");

let hpCharacters = [];
let dsCharacters = [];

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value;

  const filteredCharacters = hpCharacters.filter((character) => {
    return character.student_name
      ?.toLowerCase()
      .includes(searchString.toLowerCase().trim());
  });
  displayCharacters(filteredCharacters);
});

filter.addEventListener("click", (e) => {
  const searchString = e.target.value;
  const filteredCharacters = hpCharacters.filter((character) => {
    return character.student_group_name
      ?.toLowerCase()
      .includes(searchString.toLowerCase());
  });
  displayCharacters(filteredCharacters);
});

const loadCharacters = async () => {
  try {
    const res = await fetch("http://localhost:9999/studentfront");
    hpCharacters = await res.json();
    displayCharacters(hpCharacters);
  } catch (err) {
    console.error(err);
  }
};

const displayCharacters = (characters) => {
  const filterRole = characters.filter((e) => e.role == "student");
  const htmlString = filterRole
    .map((character, i) => {
      return `
            <tr>
      <th scope="row">${i + 1}</th>
      <td> ${character.student_name}</td>
      <td>${character.student_phone}</td>
      <td> ${character.student_group_name}</td>
      <td class="pointer" data-delete=${character.student_id} id="delete">
       <i id="delete" class="bi bi-trash"></i>
      </td>
    </tr>
        `;
    })
    .join("");
  charactersList.innerHTML = htmlString;
};

loadCharacters();

// DELETED STUDENET
tbody.addEventListener("click", (e) => {
  if (e.target.matches("#delete")) {
    fetch(`http://localhost:9999/delete/${e.target.dataset.delete}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          window.location.href = "students";
        }
      });
  }
});

// inputAddress.addEventListener("click", (e) => {
//   const dataTarget = e.target.value;
//   const filterData = dsCharacters.filter((e) => e.direction == dataTarget);

//   displayRender(filterData);
// });

// const selectHendler = async () => {
//   try {
//     const res = await fetch("http://localhost:9999/select");
//     dsCharacters = await res.json();

//     displayRender(dsCharacters);
//   } catch (err) {
//     console.error(err);
//   }
// };

// const displayRender = (data) => {
//   const htmlString = data
//     .map((character, i) => {
//       return `
//             <option>${character.student_name}</option>
//         `;
//     })
//     .join("");
//   class_days.innerHTML = htmlString;
// };
// selectHendler();
