const tbody = document.querySelector("#tbody");
const searchBar = document.querySelector("#search");
const filter = document.querySelector("#filter");

let hpCharacters = [];

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value;

  const filteredCharacters = hpCharacters?.filter((character) => {
    return character.courses_name
      .toLowerCase()
      .includes(searchString.toLowerCase().trim());
  });

  displayCharacters(filteredCharacters);
});

filter.addEventListener("click", (e) => {
  const searchString = e.target.value;

  const filteredCharacters = hpCharacters.filter((character) => {
    return character.courses_name
      .toLowerCase()
      .includes(searchString.toLowerCase().trim());
  });
  displayCharacters(filteredCharacters);
});

const loadCharacters = async () => {
  try {
    const res = await fetch("http://localhost:9999/coursesfront");
    hpCharacters = await res.json();
    displayCharacters(hpCharacters);
  } catch (err) {
    console.error(err);
  }
};

const displayCharacters = (characters) => {
  const htmlString = characters
    .map((character, i) => {
      return `
            <tr>
      <th scope="row">${i + 1}</th>
      <td> ${character.courses_name}</td>
      <td>${character.courses_price} so'm</td>
      <td class="pointer" data-delete=${character.courses_id} id="delete">
       <i id="delete" class="bi bi-trash" data-delete=${
         character.courses_id
       }></i>
      </td>
    </tr>
        `;
    })
    .join("");
  tbody.innerHTML = htmlString;
};

loadCharacters();

// DELETED STUDENET
tbody.addEventListener("click", (e) => {
  if (e.target.matches("#delete")) {
    fetch(`http://localhost:9999/courses/${e.target.dataset.delete}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          window.location.href = "courses";
        }
      });
  }
});
