const charactersList = document.querySelector("#tbody");
const searchBar = document.querySelector("#search");
const filter = document.querySelector("#filter");
let hpCharacters = [];

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
    const res = await fetch("http://localhost:9999/teacherfront");
    hpCharacters = await res.json();
    console.log(hpCharacters);
    displayCharacters(hpCharacters);
  } catch (err) {
    console.error(err);
  }
};

const displayCharacters = (characters) => {
  const htmlString = characters
    .map((character, i) => {
      console.log(character.student?.student_date);
      return `
            <tr>
      <th scope="row">${i + 1}</th>
      <td> ${character.student?.student_name}</td>
      <td> ${character.student?.student_phone}</td>
      <td>${character.student?.student_group_name}</td>
      <td> ${character.student?.student_date}</td>
    </tr>
        `;
    })
    .join("");
  charactersList.innerHTML = htmlString;
};

loadCharacters();
