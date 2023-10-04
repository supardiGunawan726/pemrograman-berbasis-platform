const profile = {
  firstName: "Raffi",
  lastName: "Ahmad",
  age: 19,
};

const { firstName, age, isMale = false } = profile;
console.log(firstName);
console.log(age);
console.log(isMale);
