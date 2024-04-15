export const render = ({ router }) => {
  return `
    <div id="search-page">
      <h2>Search Page</h2>
      ${
        router?.query?.q
          ? `<div style="margin-top: 10px;">
        Search Results for <strong>${router?.query?.q}</strong>
      </div>`
          : ""
      }
    </div>
  `;
};

export const styles = {};

export const states = {};

export const handlers = {};
