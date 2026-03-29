import { createHashRouter } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { QuestionnairePage } from "../pages/QuestionnairePage";
import { ResultPage } from "../pages/ResultPage";
import { GuidePage } from "../pages/GuidePage";
import { AppLayout } from "./AppLayout";

export const router = createHashRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/questionnaire", element: <QuestionnairePage /> },
      { path: "/result", element: <ResultPage /> },
      { path: "/guide", element: <GuidePage /> },
    ],
  },
]);
