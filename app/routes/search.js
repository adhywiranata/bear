import { router } from "../lib/router.js";

export const render = ({ states, routeParams }) => {
  return `
    <div id="search-page">
      <h2>Search Page</h2>
      ${
        routeParams?.query?.q
          ? `<div style="margin-top: 10px;">
        Search Results for <strong>${routeParams?.query?.q}</strong>
      </div>`
          : ""
      }
    </div>
  `;
};

export const styles = {};

export const states = {};

export const handlers = {};
