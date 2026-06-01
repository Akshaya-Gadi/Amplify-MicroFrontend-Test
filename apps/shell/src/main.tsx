// The dynamic import creates the async boundary that Module Federation needs to
// negotiate shared singletons (react, react-dom, react-router-dom) before any
// app code runs. Keep this file tiny.
import('./bootstrap');

export {};
