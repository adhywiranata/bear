export const render = () => {
  return `
    <div id="login-page">
      <h2>Login</h2>
      <form id="login">
        <div id="login-form">
          <input type="text" name="username" placeholder="Username" />
          <input type="password" name="password" placeholder="Password" />
          <button>Login</button>
        </div>
      </form>
    </div>
  `;
};

export const handlers = {
  onMounted: ({ store, router }) => {
    document.querySelector("#login").addEventListener("submit", (evt) => {
      evt.preventDefault();
      store.username = "Kuma";
      router.push("/");
    });
  },
};
