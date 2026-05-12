import React from "react";
import { createHashRouter } from "react-router";

/* ── Onboarding ──────────────────────────────────────────── */
import SplashScreen from "./pages/SplashScreen";
import IntroPage    from "./pages/IntroPage";
import Onboarding   from "./pages/Onboarding";
import LoadingScreen from "./pages/LoadingScreen";

/* ── Kitchen ─────────────────────────────────────────────── */
import KitchenHome    from "./pages/KitchenHome";
import TaskDetail     from "./pages/TaskDetail";
import CheckIn        from "./pages/CheckIn";
import MateProfile    from "./pages/MateProfile";
import ScheduleDetail from "./pages/ScheduleDetail";

/* ── Activity ────────────────────────────────────────────── */
import ActivityHome    from "./pages/activity/ActivityHome";
import SocialLevel2    from "./pages/activity/SocialLevel2";
import CommunityNav    from "./pages/activity/CommunityNav";
import CultureBridge   from "./pages/activity/CultureBridge";
import BuddyDetail     from "./pages/activity/BuddyDetail";
import ActivityDetail  from "./pages/activity/ActivityDetail";
import FacilityDetail  from "./pages/activity/FacilityDetail";
import ClubDetail      from "./pages/activity/ClubDetail";
import WikiDetail      from "./pages/activity/WikiDetail";
import FestivalDetail  from "./pages/activity/FestivalDetail";
import PostDetail      from "./pages/activity/PostDetail";
import OrganizerWizard from "./pages/activity/OrganizerWizard";
import BulletinDetail  from "./pages/activity/BulletinDetail";
import EventDetail     from "./pages/activity/EventDetail";
import GroupsScreen         from "./pages/activity/GroupsScreen";
import BulletinBoardScreen  from "./pages/activity/BulletinBoardScreen";
import EventHighlightsScreen from "./pages/activity/EventHighlightsScreen";

/* ── Calendar ────────────────────────────────────────────── */
import CalendarHome from "./pages/calendar/CalendarHome";

/* ── Message ─────────────────────────────────────────────── */
import MessageHome              from "./pages/message/MessageHome";
import KitchenInteractionDetail from "./pages/message/KitchenInteractionDetail";
import AssistantDetailHub       from "./pages/message/AssistantDetailHub";
import ActivityNotifications    from "./pages/message/ActivityNotifications";
import ChatWindow               from "./pages/message/ChatWindow";
import ChatList                 from "./pages/message/ChatList";
import EditProfile              from "./pages/profile/EditProfile";

/* ── Profile ─────────────────────────────────────────────── */
import ProfileHome from "./pages/profile/ProfileHome";

export const router = createHashRouter([
  /* ── Onboarding routes ── */
  { path: "/",            Component: SplashScreen  },
  { path: "/intro",       Component: IntroPage     },
  { path: "/onboarding",  Component: Onboarding    },
  { path: "/loading",     Component: LoadingScreen },

  /* ── Kitchen routes ── */
  { path: "/kitchen",    Component: KitchenHome    },
  { path: "/task-detail",Component: TaskDetail     },
  { path: "/check-in",   Component: CheckIn        },
  { path: "/mate/:id",   Component: MateProfile    },
  { path: "/schedule",   Component: ScheduleDetail },

  /* ── Activity routes ── */
  { path: "/activity",                   Component: ActivityHome    },
  { path: "/activity/social",            Component: SocialLevel2    },
  { path: "/activity/facilities",        Component: CommunityNav    },
  { path: "/activity/groups",            Component: GroupsScreen    },
  { path: "/activity/bulletin-board",    Component: BulletinBoardScreen },
  { path: "/activity/event-highlights",  Component: EventHighlightsScreen },
  { path: "/activity/culture",           Component: CultureBridge   },
  { path: "/activity/buddy/:id",         Component: BuddyDetail     },
  { path: "/activity/activity/:id",      Component: ActivityDetail  },
  { path: "/activity/facility/:id",      Component: FacilityDetail  },
  { path: "/activity/club/:id",          Component: ClubDetail      },
  { path: "/activity/wiki/:id",          Component: WikiDetail      },
  { path: "/activity/festival/:id",      Component: FestivalDetail  },
  { path: "/activity/post/:id",          Component: PostDetail      },
  { path: "/activity/create",            Component: OrganizerWizard },
  { path: "/activity/bulletin/:id",      Component: BulletinDetail  },
  { path: "/activity/event/:id",         Component: EventDetail     },

  /* ── Calendar routes ── */
  { path: "/calendar", Component: CalendarHome },

  /* ── Message routes ── */
  { path: "/message",            Component: MessageHome              },
  { path: "/message/kitchen",    Component: KitchenInteractionDetail },
  { path: "/message/assistant",  Component: AssistantDetailHub       },
  { path: "/message/activity",   Component: ActivityNotifications     },
  { path: "/message/chat/:id",   Component: ChatWindow               },
  { path: "/message/chats",      Component: ChatList                 },
  { path: "/profile/edit",       Component: EditProfile              },

  /* ── Profile routes ── */
  { path: "/profile", Component: ProfileHome },
]);
