import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";

// delay in milliseconds
const delaySeconds = (seconds = 2000) =>
  new Promise((resolve) => setTimeout(resolve, seconds));

const welcomeUser = async () => {
  //chalk animation starts
  const neon = chalkAnimation.neon("Word and Character Counter App");
  // waits 2000 seconds
  await delaySeconds();
  neon.stop();
  const welcomeMessage = chalk.yellow("\nInsert your text or paragraph");
  const messageSecond = chalk.magentaBright(
    "\nI will count the total number of words and characters\n"
  );
  console.log(welcomeMessage, messageSecond);
};

type countWords = (p: string) => void;

const countWords: countWords = async function (paragraph: string) {
  //storing each word of the paragraph in array
  const wordsArray = paragraph.trim().split(" ");

  // merging each element of the wordsarray into one long string
  //trims the whitespaces
  const charactersArray = wordsArray
    .map((val) => val.trim())
    .reduce((prev, curr) => prev + curr);
  //logs the index
  console.log(`\nTotal Words:${chalk.yellow(wordsArray.length)}`);
  console.log(`Total characters: ${chalk.yellow(charactersArray.length)}`);
};

const getParagraphFromUser = async () => {
  const askUser = await inquirer.prompt({
    name: "userinput",
    type: "input",
    message: "Write or paste text here:",
    validate: (input) => {
      if (!input) {
        //in case of no inputs
        return "Provide input";
      } else {
        return true;
      }
    },
  });
  //calling the count function here
  countWords(askUser.userinput);
};

const continueProcess = async () => {
  const usrWantsToContinue = await inquirer.prompt({
    name: "continue",
    type: "confirm",
    message: "Wana try some more?",
  });
  if (usrWantsToContinue.continue) {
    await getParagraphFromUser();
    await continueProcess();
  } else {
    console.log("\nThanks for using the App 🙃\n");
    process.exit();
  }
};

console.clear();
await welcomeUser();
await getParagraphFromUser();
await continueProcess();
