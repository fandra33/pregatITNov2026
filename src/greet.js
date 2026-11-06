// 01 — Hello, who?
// Make the tests in greet.test.js green. Run them with: node --test

export function greet(name) {
  if (name === undefined || name.trim() === "") {
    return "Hello, stranger!";
  }
  
  name = name?.trim();
  name = name?.toLowerCase();
  name = name?.charAt(0).toUpperCase() + name?.slice(1);
  return "Hello, " + name + "!";
}

