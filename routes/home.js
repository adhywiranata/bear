export const render = ({ router }) => {
  console.log({ router });

  const popup = () => {
    if (router?.hash["popup"]) {
      return "<div>POPUPPPP</div>";
    }

    return "";
  };

  return `
    <div id="home-page">
      <h2>Home</h2>
      <div>{{counter}} {{test}}</div>
      <button b-click="addCounter">Plus</button>
      <button b-click="reduceCounter">Minus</button>
      <br /><br /><br />
      <button b-click="goToSearch">Go To Search Page</button>
      <button b-click="openSpecialPopup">Open Special Popup</button>
      ${popup()}
    </div>
  `;
};

export const styles = {};

export const states = {
  counter: 0,
  test: null,
};

export const handlers = {
  goToLogin: ({ router }) => {
    router.push("/login");
  },
  goToSearch: ({ router }) => {
    router.push("/search");
  },
  openSpecialPopup: ({ router }) => {
    router.push("/#popup=true");
  },
  addCounter: ({ states }) => {
    states.counter += 1;
  },
  reduceCounter: ({ states }) => {
    states.counter -= 1;
  },
};
