export const handleConvert = (words: string = "hello") => {
  let binary = "";

  for (let i = 0; i < words.length; i++) {
    let ascii = words.charCodeAt(i).toString(2);
    binary += ascii.padStart(8, "0");
  }

  return binary;
};
