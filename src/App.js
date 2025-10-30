import { getAmount } from "./input.js";

class App {
  async run() {
    const amount = await getAmount();
  }
}

export default App;
