import {
  render as renderHome,
  states as homeStates,
  handlers as homeHandlers,
} from "./home.js";
import { render as renderSearch } from "./search.js";
import { render as renderDetail } from "./detail.js";
import * as promoResolvers from "./promo.js";
import { render as renderLogin, handlers as loginHandlers } from "./login.js";

// const ROUTES = ["/", "/login", "/search", "/detail", "/pay"];

export const routes = [
  {
    path: "/",
    render: renderHome,
    handlers: homeHandlers,
    states: homeStates,
  },
  {
    path: "/login",
    render: renderLogin,
    handlers: loginHandlers,
  },
  {
    path: "/search",
    render: renderSearch,
  },
  {
    path: "/detail/:id",
    render: renderDetail,
  },
  {
    path: "/promo/:slug",
    ...promoResolvers,
  },
];
