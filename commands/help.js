function helpFn() {
  console.log(`List of all commands:
            1. gothwal tree "dirPath"
            2. gothwal organise "dirPath"
            3. gothwal help`);
}

module.exports = {
  helpKey: helpFn,
};
