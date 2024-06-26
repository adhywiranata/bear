export const htmlShell = () => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>My Title</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet"
      />
      <style>
        * {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
          font-family: Montserrat, Arial, Helvetica, sans-serif;
        }

        button {
          background: #3a539b;
          color: white;
          padding: 5px 10px;
          border: 0;
          border-radius: 4px;
          cursor: pointer;
          transition: 0.5s;
          outline: white;
          font-size: 1rem;
          border: 1px solid #043b5c;
          border-bottom: 4px solid #043b5c;
          transition: 0.1s;
        }

        button:hover {
          transform: translateY(1px);
          border-bottom-width: 3px;
          transition: 0.1s;
        }

        button:active {
          transform: translateY(3px);
          border-bottom-width: 1px;
          transition: 0.1s;
        }

        /* page containers */
        main > div {
          padding: 20px;
          max-width: 768px;
          margin: 0 auto;
        }

        #login-form {
          display: flex;
          flex-direction: column;
          max-width: 480px;
        }

        #login-form input {
          margin: 5px 0;
          padding: 5px 5px;
        }
      </style>
      <script src="/app/app.client.js" type="module"></script>
    </head>
    <body>
      <main></main>
    </body>
  </html>
`;
};
