import { router } from "../lib/router.js";

export const render = ({ routeParams }) => {
  return `
    <div id="detail-page">
      <h1>My Cool Shoes ${routeParams?.id}</h1>
      <p>definitely cool shoes</p>
    </div>
  `;
};

export const styles = {};

export const states = {};

export const handlers = {};
