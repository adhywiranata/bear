import { router } from "../lib/router.js";

export const render = ({ states, store }) => {
  return `
    <header style="width: 100vw; height: 50px; padding: 10px 20px; display: flex; background: #3a539b; color: white;">
      <div style="cursor: pointer; width: 100vw; display: flex; justify-content: space-between; margin: 0 auto; align-items: center;">
        <div style="display: flex; flex-direction: row; align-items: center;">
          <div b-click="home"><strong>bearbone</strong> Shop</div>
          <form id="search-form">
            <input type="text" name="keyword" placeholder="Search for any products (COMING SOON)" style="margin-left: 20px; padding: 5px 10px; border-radius: 4px; border: 0; outline: 0; min-width: 400px;" />
          </form>
        </div>
        <div style="display: flex; flex-direction: row; align-items: center;">
          ${store.username ? `<div>Hello, ${store.username}</div>` : ""}
          ${
            store.username
              ? `<button b-click="logout" style="background: white; color: #3a539b; margin-left: 10px;">Logout</button>`
              : `<button b-click="login" style="background: white; color: #3a539b; margin-left: 10px;">Login</button>`
          }
        </div>
      </div>
    </header>
  `;
};

export const handlers = {
  home: () => {
    router.push("/");
  },
  login: () => {
    router.push("/login");
  },
  logout: (_, store) => {
    store.username = undefined;
    router.push("/");
  },
  onMounted: () => {
    const searchForm = document.querySelector("#search-form");

    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(searchForm);
      const keyword = formData.get("keyword");
      router.push(`/search?q=${keyword}`);
    });
  },
};
