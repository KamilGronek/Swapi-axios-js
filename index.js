state = {
  type: "people",
  actualType: null,
  pgNumber: 1,
  count: null,
  onePageResult: 10,
  firstPage: 1,
  secondPage: 2,
};

const getUsers = () => {
  axios
    .get(`https://swapi.dev/api/${state.type}/?page=${state.pgNumber}`)
    .then(function (response) {
      showArray(response.data);
      state.count = response.data.count;
      if (state.type != state.actualType) {
        getPagination();
        state.actualType = state.type;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};
getUsers();

document.getElementById("prev").style.visibility = "hidden";

const getPrevUsers = () => {
  if (state.pgNumber == state.secondPage) {
    document.getElementById("prev").style.visibility = "hidden";
  } else {
    document.getElementById("next").style.visibility = "visible";
  }
  state.pgNumber--;
  document.getElementById("pageNr").innerHTML = state.pgNumber;
  getUsers();
};

const getPagination = () => {
  if (state.count == null) return;

  let selectPagination = document.getElementById("pagination");
  selectPagination.innerHTML = "";

  let lastPage = Math.ceil(state.count / state.onePageResult);
  let i = 1;

  for (i; i <= lastPage; i++) {
    let optionTag = document.createElement("option");

    optionTag.innerHTML = i + " page";

    optionTag.setAttribute("value", i);
    selectPagination.appendChild(optionTag);
  }
};

const changePage = (e) => {
  let lastPage = Math.ceil(state.count / state.onePageResult);

  state.pgNumber = e.target.value;
  document.getElementById("pageNr").innerHTML = state.pgNumber;

  if (document.getElementById("pagination").value == state.firstPage) {
    document.getElementById("prev").style.visibility = "hidden";
  } else {
    document.getElementById("prev").style.visibility = "visible";
  }

  if (lastPage == document.getElementById("pageNr").innerHTML) {
    document.getElementById("next").style.visibility = "hidden";
  } else {
    document.getElementById("next").style.visibility = "visible";
  }
  getUsers();
};

const getNextUsers = () => {
  let lastPage = Math.ceil(state.count / state.onePageResult);

  if (
    lastPage - state.firstPage ==
    document.getElementById("pageNr").innerHTML
  ) {
    document.getElementById("next").style.visibility = "hidden";
  } else {
    document.getElementById("prev").style.visibility = "visible";
  }

  console.log("next działa");
  state.pgNumber++;
  document.getElementById("pageNr").innerHTML = state.pgNumber;

  getUsers();
};

const getType = () => {
  let selectArray = document.getElementById("select-type").value;
  state.type = selectArray;
  state.pgNumber = 1;
  document.getElementById("pageNr").innerHTML = 1;
  document.getElementById("prev").style.visibility = "hidden";
  document.getElementById("next").style.visibility = "visible";

  getUsers();
};

const buildHeaderPeopleResults = () => {
  return `
  <th>Name</th>
  <th>Gender</th>
  <th>Mass</th>
  `;
};
const buildHeaderPlanetsResuts = () => {
  return `<th>Name</th>
  <th>Climate</th>
  <th>Terrain</th>
  `;
};
const buildHeaderSpeciesResults = () => {
  return `<th>Name</th>
 <th>Classification</th>
 <th>Language</th>
 `;
};
const buildHeaderStarshipsResults = () => {
  return `<th>Name</th>
 <th>Model</th>
 <th>Starship Class</th>
 `;
};
const buildHeaderVehiclesResults = () => {
  return `<th>Name</th>
 <th>Model</th>
 <th>Vehicle Class</th>
 `;
};

const buildPeopleResults = (result) => {
  return `
    <td>${result.name} </td>
    <td>${result.gender} </td>
    <td>${result.mass} </td>
    `;
};
const buildPlanetsResults = (result) => {
  return `
  <td>${result.name} </td>
  <td>${result.climate} </td>
  <td>${result.terrain} </td>
`;
};
const buildSpeciesResults = (result) => {
  return `
  <td>${result.name} </td>
  <td>${result.classification} </td>
  <td>${result.language} </td>
    `;
};
const buildStarshipsResults = (result) => {
  return `
  <td>${result.name} </td>
  <td>${result.model} </td>
  <td>${result.starship_class} </td>
`;
};
const buildVehiclesResults = (result) => {
  return `
  <td>${result.name} </td>
  <td>${result.model} </td>
  <td>${result.vehicle_class} </td>
`;
};

const showArray = (data) => {
  document.getElementById("resultNumber").innerHTML = data.count;

  let catContent = document.querySelector(".catalog__content");
  catContent.innerHTML = "";

  let tagHead = document.createElement("tr");
  switch (state.type) {
    case "people":
      tagHead.innerHTML = buildHeaderPeopleResults();
      break;
    case "planets":
      tagHead.innerHTML = buildHeaderPlanetsResuts();
      break;
    case "species":
      tagHead.innerHTML = buildHeaderSpeciesResults();
      break;
    case "starships":
      tagHead.innerHTML = buildHeaderStarshipsResults();
      break;
    case "vehicles":
      tagHead.innerHTML = buildHeaderVehiclesResults();
      break;
    default:
      tagHead.innerHTML = null;
  }
  catContent.appendChild(tagHead);

  console.log(data.results);
  data.results.forEach((result) => {
    let tagTr = document.createElement("tr");
    switch (state.type) {
      case "people":
        tagTr.innerHTML = buildPeopleResults(result);
        break;
      case "planets":
        tagTr.innerHTML = buildPlanetsResults(result);
        break;
      case "species":
        tagTr.innerHTML = buildSpeciesResults(result);
        break;
      case "starships":
        tagTr.innerHTML = buildStarshipsResults(result);
        break;
      case "vehicles":
        tagTr.innerHTML = buildVehiclesResults(result);
        break;
      default:
        state.type = null;
    }
    catContent.appendChild(tagTr);
  });
};

document.getElementById("prev").addEventListener("click", getPrevUsers);
document.getElementById("next").addEventListener("click", getNextUsers);
document.getElementById("select-type").addEventListener("change", getType);
document.getElementById("pagination").addEventListener("change", changePage);
