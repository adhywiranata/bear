export const render = ({ serverStates, router } = {}) => {
  return `
    <div id="promo-page">
      <h1>Promo ${router?.params?.slug ?? ""}</h1>
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
