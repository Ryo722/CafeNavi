import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import { LocaleProvider } from "./lib/i18n";

function App() {
  return (
    <LocaleProvider>
      <RouterProvider router={router} />
    </LocaleProvider>
  );
}

export default App;
