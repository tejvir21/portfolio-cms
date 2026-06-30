export default function generatePassword(length: number = 12): string {
  if (length < 4) {
    throw new Error("Length must be at least 4");
  }

  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";
  const symbols = "!@#$%^&*()_-+=<>?";

  const all = upper + lower + digits + symbols;

  const randomChar = (set: string) =>
    set[crypto.getRandomValues(new Uint32Array(1))[0] % set.length];

  const password = [
    randomChar(upper),
    randomChar(lower),
    randomChar(digits),
    randomChar(symbols),
  ];

  while (password.length < length) {
    password.push(randomChar(all));
  }

  // Shuffle
  for (let i = password.length - 1; i > 0; i--) {
    const j = crypto.getRandomValues(new Uint32Array(1))[0] % (i + 1);
    [password[i], password[j]] = [password[j], password[i]];
  }

  return password.join("");
}

// console.log(generatePassword(12));
// Example: A7@mk!2Q#x9
