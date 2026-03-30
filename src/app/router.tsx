import { lazy } from "react";
import { createHashRouter } from "react-router-dom";
import { AppLayout } from "./AppLayout";

const HomePage = lazy(() =>
  import("../pages/HomePage").then((m) => ({ default: m.HomePage })),
);
const QuestionnairePage = lazy(() =>
  import("../pages/QuestionnairePage").then((m) => ({
    default: m.QuestionnairePage,
  })),
);
const ResultPage = lazy(() =>
  import("../pages/ResultPage").then((m) => ({ default: m.ResultPage })),
);
const GuidePage = lazy(() =>
  import("../pages/GuidePage").then((m) => ({ default: m.GuidePage })),
);
const HistoryPage = lazy(() =>
  import("../pages/HistoryPage").then((m) => ({ default: m.HistoryPage })),
);
const ComparePage = lazy(() =>
  import("../pages/ComparePage").then((m) => ({ default: m.ComparePage })),
);
const StatsPage = lazy(() =>
  import("../pages/StatsPage").then((m) => ({ default: m.StatsPage })),
);

export const router = createHashRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/questionnaire", element: <QuestionnairePage /> },
      { path: "/result", element: <ResultPage /> },
      { path: "/guide", element: <GuidePage /> },
      { path: "/history", element: <HistoryPage /> },
      { path: "/compare", element: <ComparePage /> },
      { path: "/stats", element: <StatsPage /> },
    ],
  },
]);
