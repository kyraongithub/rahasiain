export const handleConvert = (
  words: string = "hello",
  setsecret: React.Dispatch<React.SetStateAction<string>>
) => {
  let binary = "";

  for (let i = 0; i < words.length; i++) {
    let ascii = words.charCodeAt(i).toString(2);
    binary += ascii.padStart(8, "0");
  }

  setsecret(binary);
};
