import { router } from "../lib/router.js";

export const render = () => {
  return `
    <div id="home-page">
      <h2>Home</h2>
      <div>{{counter}} {{test}}</div>
      <button b-click="addCounter">Plus</button>
      <button b-click="reduceCounter">Minus</button>
      <br /><br /><br />
      <button b-click="goToSearch">Go To Search Page</button>
    </div>
  `;
};

export const styles = {};

export const states = {
  counter: 0,
  test: null,
};

export const computed = {
  counterTimesTwo: (state) => {
    state.counter + 1;
  },
};

export const handlers = {
  goToLogin: () => {
    router.push("/login");
  },
  goToSearch: () => {
    router.push("/search");
  },
  addCounter: (state) => {
    state.counter += 1;
  },
  reduceCounter: (state) => {
    state.counter -= 1;
  },
};
