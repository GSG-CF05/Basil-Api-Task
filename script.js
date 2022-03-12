
// MAKE VARIABLES THAT CALL ELEMENT FROM HTML PAGE
let container = document.querySelector(`.container`);
let header = document.querySelector(`header`);
let tBody = document.querySelector(`tbody`);
let body = document.querySelector(`body`);
let loadDiv = document.querySelector(`.loader`)

document.addEventListener(`load`,loadPage);

// FUNCTION FOR LOAD PAGE
setTimeout(loadPage, 3000);

function loadPage () {
  body.style.height = `auto`;
  header.style.display = `flex`;
  container.style.display = `flex`;
  loadDiv.style.display = `none`;
}
// FETCH API DATA FROM THIS LINK
fetch(`https://api-football-standings.azharimm.site/leagues/eng.1/standings?season=2020&sort=asc`)
.then((result) => {
  return result.json();
}).then(mainData => {

  console.log(mainData.data.standings[0].stats[0].value);

  //CREATE H1 FOR NAME LEAGUE AND APPEND IN CONTAINER DIV
  let h1 = document.createElement(`h1`);
  h1.textContent = mainData.data.name;
  header.appendChild(h1);

 //CREATE H2 FOR SEASON DATE AND APPEND IN CONTAINER DIV
  let h2 = document.createElement(`h2`);
  h2.textContent = mainData.data.seasonDisplay;
  header.appendChild(h2);

  //MAKE BOX SYNTAX AND CONTENT
  for (let i = 0; i < mainData.data.standings.length; i++) {

    let count = i+1;
    let trow = document.createElement(`tr`);
    let tdName = document.createElement(`td`);
    tdName.setAttribute(`class`, `box`);
    let label = document.createElement(`label`);
    label.textContent = count++;

    let span = document.createElement(`span`);
    span.textContent = mainData.data.standings[i].team.shortDisplayName;

    let logo = document.createElement(`img`);
    logo.setAttribute(`src`, mainData.data.standings[i].team.logos[0].href);
    logo.setAttribute(`class`, `img`);

    tdName.appendChild(label);
    tdName.appendChild(logo);
    tdName.appendChild(span);

    trow.appendChild(tdName);

    //CREATE TDATA INSIDE THE TROW THAT COUNT WIN NUMBER FOR THE TEAM
    let tdWin = document.createElement(`td`);
    tdWin.textContent = mainData.data.standings[i].stats[0].value;
    trow.appendChild(tdWin);

    //CREATE TDATA INSIDE THE TROW THAT COUNT DRAWS NUMBER FOR THE TEAM
    let tdDraws = document.createElement(`td`);
    tdDraws.textContent = mainData.data.standings[i].stats[2].value;
    trow.appendChild(tdDraws);

    //CREATE TDATA INSIDE THE TROW THAT COUNT LOSS NUMBER FOR THE TEAM
    let tdLosses = document.createElement(`td`);
    tdLosses.textContent = mainData.data.standings[i].stats[1].value;
    trow.appendChild(tdLosses);

    //CREATE TDATA INSIDE THE TROW THAT COUNT GOAL FOR NUMBER FOR THE TEAM
    let tdGf = document.createElement(`td`);
    tdGf.textContent = mainData.data.standings[i].stats[4].value;
    trow.appendChild(tdGf);

    //CREATE TDATA INSIDE THE TROW THAT COUNT GOAL AGAINST NUMBER FOR THE TEAM
    let tdGa = document.createElement(`td`);
    tdGa.textContent = mainData.data.standings[i].stats[5].value;
    trow.appendChild(tdGa);

    //CREATE TDATA INSIDE THE TROW THAT COUNT GOAL DIFFERNTIAL NUMBER FOR THE TEAM
    let tdGd = document.createElement(`td`);
    tdGd.textContent = mainData.data.standings[i].stats[9].value;
    trow.appendChild(tdGd);

    //CREATE TDATA INSIDE THE TROW THAT COUNT POINT NUMBER FOR THE TEAM
    let tdPts = document.createElement(`td`);
    tdPts.textContent = mainData.data.standings[i].stats[6].value;
    trow.appendChild(tdPts);

    //APPEND TROW INSIDE THE TABLE
    tBody.appendChild(trow);

    // TEST HOW FROM THE TEAM IT QUALIFY TO CHAMPIONS LEAGUE OR TO EUROBE LEAGUE
    if (count <= 5) {
      tdName.classList = `box qualify-green`;
    }
    if (count > 5 && count <= 7) {
      tdName.classList = `box qualify-red`;
    }
    if (count > 18 && count <= 21) {
      tdName.classList = `box notqualify-red`;
    }
  }

}).catch(Error);