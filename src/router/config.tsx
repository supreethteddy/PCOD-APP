import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import LaunchSplash from "../pages/launch/page";
import OnboardingIntro from "../pages/onboarding/page";
import SignUpOptions from "../pages/auth/signup-options";
import SignUpForm from "../pages/auth/signup";
import Login from "../pages/auth/login";
import ProfileQuickSetup from "../pages/profile-setup/page";
import PhenotypeQuizIntro from "../pages/phenotype/intro";
import PhenotypeQuiz from "../pages/phenotype/quiz";
import PhenotypeResult from "../pages/phenotype/result";
import SubscriptionPrompt from "../pages/subscription/page";
import TrackMain from "../pages/track/page";
import DailyPlan from "../pages/daily-plan/page";
import ConsultMain from "../pages/consult/page";
import CommunityMain from "../pages/community/page";
import Profile from "../pages/profile/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <LaunchSplash />,
  },
  {
    path: "/onboarding",
    element: <OnboardingIntro />,
  },
  {
    path: "/signup-options",
    element: <SignUpOptions />,
  },
  {
    path: "/signup",
    element: <SignUpForm />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile-setup",
    element: <ProfileQuickSetup />,
  },
  {
    path: "/phenotype-intro",
    element: <PhenotypeQuizIntro />,
  },
  {
    path: "/phenotype-quiz",
    element: <PhenotypeQuiz />,
  },
  {
    path: "/phenotype-result",
    element: <PhenotypeResult />,
  },
  {
    path: "/subscription",
    element: <SubscriptionPrompt />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/track",
    element: <TrackMain />,
  },
  {
    path: "/daily-plan",
    element: <DailyPlan />,
  },
  {
    path: "/consult",
    element: <ConsultMain />,
  },
  {
    path: "/community",
    element: <CommunityMain />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
