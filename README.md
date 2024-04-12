# 🧸 Bear Vanilla JS UI Framework

> Bear is a pun of "bare", which represents this framework which uses nothing but modern, vanilla JS

**WIP** only covers SFP model (Single File Page). No Components concepts as of now.
Layout is currently on heavy tinkering (working for simple header case). Not for real usage just for experimentations.

## Basic Building Blocks of a Route/Page

You will mostly work on these.

```javascript
// Sample of a Single-File-Page. Example: product-page.js

/**
 * `render` is the backbone of the framework.
 * What it does is simple. Given several parameters coming from the request,
 * render function will do its best to utilizes available params in both runtimes (server and client) and provides data required.
 * Example when route: `/products/:productId` and sample url: `/products/12345?source=tiktok`
**/
export const render({ states, serverStates, store, routeParams }) {
  return `
    <div>
      <h1>My Product Name: ${serverStates.ssrHeading}</h1>

      <section class="row">
        <h2>Basic Intro</h2>
        <p>I can render state easily via basic template: {{myClientSideStateOne}}.
        But it does not work for nested data for now, unfortunately.
        </p>
        <p>I can also render state via renderer function parameters this way: ${state.myClientSideStateTwo.val.something} for more complex states</p>
        <p>Using states from renderer function is more powerful that I can loop it easily!
        <ul>
          ${states.myClientSideStateThree.map(v => `<li>${v}</li>`)}
        </ul>
      </section>

      <section class="row">
        <h2>Managing Local Page States</h2>
        <button b-click="subtractLocalCounter">Subtract Local Counter</button>
        <span>{{localCounter}}</span>
        <button b-click="addLocalCounter">Add Local Counter</button>
      </section>

      <section class="row">
        <h2>Managing Global States</h2>
        <p>First Way: {{store.globalCounter}}</p>
        <p>Second Way: ${store.globalCounter}</p>
        <button b-click="addGlobalCounter">Add Global Counter</button>
      </section>

      <section class="row">
        <h2>Navigating to Pages</h2>
        <button b-click="goToLoginPage">Go To Login Page</button>
      </section>

      <section class="row">
        <h2>Getting Data from Urls</h2>
        <p>Getting Sample params data ${routeParams?.productId}</p>
        <p>Getting Sample params query data ${routeParams?.query?.source}</p>
      </section>
    </div>`;
}

/**
 * `states` is basically assigned local states to a specific routes.
 * Values given in this exported one works as an "initial state".
**/
export const states = {
  myClientSideStateOne: 9_999_999,
  myClientSideStateTwo: {
    val: {
      something: 'cool'
    }
  },
  myClientSideStateThree: ['Eat', 'Learn', 'Sleep'],
  localCounter: 100,
};

/**
 * `getServerStates` are tipically useful to renders SSR related data.
 * You can fetch any external APIs here and pass through.
 * Note that it works Sync so it will block the framework to render the initial HTML.
**/
export const getServerStates = () => {
  return {
    ssrHeading: 'My SSR Sample Page'
  }
};

// handlers are stateful, so its easily mutable.
// its function signature always be a tuple of state, store.
// states derived from a route's exported state object.
// store are coming from the framework's global store.
/**
 * `handlers` are functions that are being called or setup when page successfully renders.
 * You can attach click handler via `b-click` directive.
 * You can call any side effects via `onMounted` handler.
**/
export const handlers = {
  subtractLocalCounter: (states) => { states.localCounter -= 1; },
  addLocalCounter: (states) => { states.localCounter += 1; },
  addGlobalCounter: (_, store) => { store.globalCounter += 1; },
  // router helper is part of the framework that you will need to import!
  goToLoginPage: () => { router.push('/login'); },
  // reserved handlers
  // onMounted will be called once when a page successfully rendered
  onMounted: (states, store) => {
    // you can safely do anything such as adding event listeners, doing side-effects, etc.
  }
};
```

## Milestones

- **Framework Level**
  - Utilizes client-side routing ✅
  - State management 🚧
    - Page-level state ✅
    - Component-level state 🚧
  - Global State management (via store) ✅
  - Event Handlers 🚧
    - On Click Handlers via Directive ✅
    - On Change Handlers via Directive 🚧
  - Replicating NextJS functionality 🚧
    - GetServerSideProps ✅
    - Router ✅
  - Supporting with URL params 🚧
    - Path params ✅
    - Query ✅
    - Hash 🚧
  - Direct deeplink support ✅
  - Supports single bundling and self-tree-shaking 🚧
  - Two-way data binding 🚧
  - Logging 🚧
    - Server-side logging 🚧
    - Client-side logging 🚧
- **App Level**
  - Client Side States Playground ✅
  - SSR Support ✅
  - Utilizes macro-task and micro-task
  - Utilizes web workers
  - Excellent SEO Score
  - Scroll Restoration and Previous Page Scroll Persistence
  - Localization (i18n)
