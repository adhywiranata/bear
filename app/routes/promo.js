import { router } from "../lib/router.js";

export const render = ({ states, serverStates, routeParams } = {}) => {
  return `
    <div id="promo-page">
      <h1>Promo ${routeParams?.slug ?? ""}</h1>
      <p>${serverStates?.promoDetails ?? ""}</p>
    </div>
  `;
};

export const styles = {};

export const states = {};

export const getServerSideStates = () => {
  return {
    promoDetails: "ssr_data",
  };
};

export const handlers = {};
