//Build team profile
import Manager from "../lib/Manager.js";
import Engineer from "../lib/Engineer.js";
import Intern from "../lib/Intern.js";
export function buildProfile(managers, engineers, interns) {
  function managerCard(managers) {
    const managershtml = [];
    managers.forEach((Manager) => {
      managershtml.push(
        `<div class="employeecard">
        <div class="cardheader">
          <h2 class="name">${Manager.name}</h2>
          <h3 class="role">Manager</h3>
        </div>
        <div class="cardbody">
          <ul class="profile">
            <li class="id">ID: ${Manager.id}</li>
            <li class="email">Email: <a href="mailto:${Manager.email}">${Manager.email}</a></li>
            <li class="special">Office number: ${Manager.officeNumber}</li>
          </ul>
        </div>
      </div>
      `
      );
    });
    return managershtml.join("");
  }

  // create the html for engineers
  const engineerCards = (engineers) => {
    const engineershtml = [];
    engineers.forEach((engineer) => {
      engineershtml.push(
        `<div class="employeecard">
        <div class="cardheader">
          <h2 class="name">${engineer.name}</h2>
          <h3 class="role">Engineer</h3>
        </div>
        <div class="cardbody">
          <ul class="profile">
            <li class="id">ID: ${engineer.id}</li>
            <li class="email">Email: <a href="mailto:${engineer.email}">${engineer.email}</a></li>
            <li class="special">GitHub: <a href="https://github.com/${engineer.github}" target="_blank" rel="noopener noreferrer">${engineer.github}</a></li>
          </ul>
        </div>
      </div>
        `
      );
    });
    return engineershtml.join("");
  };

  // create the html for interns
  const internCards = (interns) => {
    const internshtml = [];
    interns.forEach((intern) => {
      internshtml.push(`<div class="employeecard">
        <div class="cardheader">
          <h2 class="name">${intern.name}</h2>
          <h3 class="role">Intern</h3>
        </div>
        <div class="cardbody">
          <ul class="profile">
            <li class="id">ID: ${intern.id}</li>
            <li class="email">Email: <a href="mailto:${intern.email}">${intern.email}</a></li>
            <li class="special">School: ${intern.school}</li>
          </ul>
        </div>
      </div>
        `);
    });
    return internshtml.join("");
  };
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="./style.css" />
    <title>Team Profile</title>
  </head>
  <header>
    <h1 class="title">Team Profile</h1>
  </header>
  <body>
    <section class="managers">
    ${managerCard(managers)}
</section>
    <section class="engineers">
    ${engineerCards(engineers)}
    </section>
    <section class="interns">
    ${internCards(interns)}
    </section>
  </body>
  <footer>
    <h4>Team Profile Generator by Ivy Lovegood</h4>
    <a href="https://github.com/Love-Ivy">github</a>
  </footer>
</html>
    `;
}

// export function to generate entire page
