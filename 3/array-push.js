const names = ["Andi", "Budi", "Charlie"];
names.push("Dhani");
names.push("Echa", "Gia");
names.pop();
names.shift();
names.unshift("Apple");

console.table(names);
delete names[1];
console.log(names);
