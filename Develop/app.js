const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const employee = [
    {
        type: "list",
        name: "role",
        message: "Select your role.",
        choices: ["Intern", "Engineer", "Manager"],
    },
    {
        type: "input",
        name: "name",
        message: "What is your name?",
    },
    {
        type: "input",
        name: "id",
        message: "Create an ID number.",
    },
    {
        type: "input",
        name: "email",
        message: "Enter your email.",
    },
];

const intern = [
    {
        type: "input",
        name: "school",
        message: "Enter your school."
    }
];

const engineer = [
    {
        type: "input",
        name: "github",
        message: "Enter your github username.",
    }
];

const manager = [
    {
        type: "input",
        name: "office",
        message: "Enter your office number.",
    }
];

const team = [];

function addNewMember() {
    inquirer.prompt (
        {
            type: "confirm",
            message: "Add a team member?",
            name: "add",
        }
    ).then(function (response) {
        if (response.add === true) {
            memberData();
        } else {
            console.log("Team created.");
            const html = render(team);
            fs.writeFile(outputPath, html, function (err) {
                if (err) throw err;
            });
        }
    });
}

function memberData() {
    inquirer.prompt(employee).then(function (data) {
        switch (data.role) {
            case "Intern":
                inquirer.prompt(intern).then(function (member) {
                    let newIntern = new Intern(
                        data.name,
                        data.id,
                        data.email,
                        member.school,
                    );
                    team.push(newIntern);
                    addNewMember();
                });
                break;
            case "Engineer":
                inquirer.prompt(engineer).then(function (member) {
                    let newEngineer = new Engineer(
                        data.name,
                        data.id,
                        data.email,
                        member.github,
                    );
                    team.push(newEngineer);
                    addNewMember();
                });
                break;
            case "Manager":
                inquirer.prompt(manager).then(function (member) {
                    let newManager = new Manager(
                        data.name,
                        data.id,
                        data.email,
                        member.office,
                    );
                    team.push(newManager);
                    addNewMember();
                });
        }
    })
}

addNewMember();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
