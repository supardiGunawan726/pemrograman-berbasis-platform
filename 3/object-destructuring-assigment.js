const profile = {
  firstName: "Raffi",
  lastName: "Ahmad",
  age: 19,
};

let firstName = "Dimas";
let age = 20;

console.log(firstName);
console.log(age);
({ firstName, age } = profile);
