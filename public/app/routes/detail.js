export const render = ({ router }) => {
  return `
    <div id="detail-page">
      <h1>My Cool Shoes ${router?.params?.id}</h1>
      <p>definitely cool shoes</p>
    </div>
  `;
};

export const styles = {};

export const states = {};

export const handlers = {};
