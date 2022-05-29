const charactersList = document.querySelector("#tbodygroup");

const loadCharacters = async () => {
  try {
    const res = await fetch("http://localhost:9999/teacherfront");
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
      <td> ${character.teacher_name}</td>
      <td> ${character.group_name}</td>
      <td>${character.courses_name}</td>
      <td> ${character.class_days}</td>
      <td>${character.class_time}</td>
      <td><i id="homework" class="bi bi-book-half pointer" data-id=">${
        character.teacher_id
      }"></i></td>
    </tr>
        `;
    })
    .join("");
  charactersList.innerHTML = htmlString;
};

loadCharacters();

charactersList.addEventListener("click", (e) => {
  let btn = e.target.matches("#homework");

  if (btn) {
    document.querySelector(".modal1").classList.toggle("active1");
  }
});
document.querySelector(".unactive").addEventListener("click", (e) => {
  document.querySelector(".modal1").classList.toggle("active1");
});
