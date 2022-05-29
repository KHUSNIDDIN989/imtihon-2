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
    return character.teacher_name
      ?.toLowerCase()
      .includes(searchString.toLowerCase());
  });
  displayCharacters(filteredCharacters);
});
filter.addEventListener("click", (e) => {
  const searchString = e.target.value;

  const filteredCharacters = hpCharacters.filter((character) => {
    return character.teacher_group_name
      ?.toLowerCase()
      .includes(searchString.toLowerCase().trim());
  });
  displayCharacters(filteredCharacters);
});

const loadCharacters = async () => {
  try {
    const res = await fetch("http://localhost:9999/teachersfront");
    hpCharacters = await res.json();
    const filterRole = hpCharacters.filter((e) => e.role == "teacher");
    displayCharacters(filterRole);
  } catch (err) {
    console.error(err);
  }
};

const displayCharacters = (characters) => {
  const htmlString = characters
    .map((character, i) => {
      console.log(character.teacher_id);
      return `
            <tr>
      <th scope="row">${i + 1}</th>
      <td> ${character.teacher_name}</td>
      <td>${character.teacher_phone}</td>
      <td> ${character.teacher_group_name}</td>
      <td>${character.teacher_date}</td>
      <td class="pointer" data-delete=${character.teacher_id} id="delete">
       <i id="delete" class="bi bi-trash" data-delete=${
         character.teacher_id
       }></i>
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
    fetch(`http://localhost:9999/teachers/${e.target.dataset.delete}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          window.location.href = "teachers";
        }
      });
  }
});
