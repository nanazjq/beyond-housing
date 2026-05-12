好！这是完整的英文版 prompt，直接发给 Figma Make：

---

> **Build the Activity module. Keep the exact same visual style as the Kitchen module — do not change fonts, colors, card styles, or any visual elements. Only build what is described below.**
>
> ---
>
> **ACTIVITY — Level 1 Home Screen**
>
> **Top section:**
> - Full-width pill search bar, placeholder: "Search activities, places, facilities..."
> - Below search bar: horizontal scrollable tag cloud, no section title, pill-shaped tags in mixed brand colors (#E4886B, #5D89E0, #DB7790, #559A6E distributed unevenly)
> - Tags: Music · Yoga · Photography · Cooking · Sports · Hiking · Art · Language Exchange · + More
> - Tapping a tag → navigates to the shared Level 2 screen, Tab auto-locked on **Explore Activities**
>
> **Section 1 — Community Navigator:**
> - Section title "Community Navigator"
> - Four white cards, each with a colored left accent border:
>   - **Facilities** (blue border): upper half shows a simplified apartment floor plan preview with colored circle pins marking facility locations; lower half shows title "Facilities" + subtitle "Tap to explore"
>   - **Groups & Clubs** (pink border): horizontal row of 3 group avatar circles inside card; title "Groups & Clubs" + subtitle "3 active groups this week"
>   - **Bulletin Board** (green border): 3 horizontally swipeable bulletin previews inside card (title + date); title "Bulletin Board" + unread red dot badge
>   - **Event Highlights** (orange border): 1–2 official event previews inside card (name + time); title "Event Highlights" + subtitle "Official events this week"
> - All four cards tap → navigate to **Community Navigator Level 2 screen**
>
> **Section 2 — Social Buddy:**
> - Section title "Social Buddy" + "See all ›"
> - Horizontal scrollable row of 3 Buddy need cards (circle avatar + name + nationality + activity name bold + blue pill time tag + "Join +" button)
> - Tapping **a card** → navigates to **Buddy Invitation Page** (Level 3 detail)
> - Tapping **"See all ›"** → navigates to shared Level 2 screen, Tab auto-locked on **Buddy Feed**
>
> **Section 3 — Culture Bridge:**
> - Small entry card, left blue accent border
> - Title "Culture Bridge 🌏" + subtitle "Swedish tips · Global festivals · Community guides"
> - Right arrow "›"
> - Tapping → navigates to **Culture Bridge Level 2 screen**
>
> ---
>
> **SHARED LEVEL 2 SCREEN — Social Buddy + Interest Radar**
>
> Three tabs at the top, all same level, switchable:
>
> **Tab 1 — Buddy Feed** (auto-locked when entering from "See all ›" on home screen)
> - Feed of all active Buddy need cards: avatar / name / activity they want to join / matching status
> - Floating [+ Post a Need] button bottom-right
> - Top of screen also shows: Smart Match entry → Level 3: People You May Vibe With (common interest tags, flexible exploring, send companion request → jumps to Message module)
> - My Matching entry → Level 3: Buddy Dashboard (confirmed activities, Waiting / Confirmed status)
> - Tapping any Buddy card → Level 3: Buddy Invitation Page (social card of the person, event context, send companion request button → jumps to Message module)
>
> **Tab 2 — Explore Activities** (auto-locked when entering from tag cloud on home screen)
> - Top: Category Selector — horizontal icon bar switching between activity types (Sports / Music / Crafts / etc.)
> - Smart filter dropdowns: Distance / Time / Cost
> - Discovery Feed: standard activity cards (title / time / location / short description)
>   - Tapping a card → Level 3: Activity Discovery Detail (standard info, Sign Up button, Find a Buddy entry, Culture Portal link to Culture Bridge, activity preview & past reviews)
> - Activity DeepDive section: deep growth activity recommendations
>   - Tapping → Level 3: Growth Insight View (high-value info, core value assessment, Sign Up + Find Fellow Buddy)
> - Floating [+] Create Activity button → Level 3: Organizer Assistant Wizard (venue fast-link, structured posting form, instant publish to discovery feed)
>
> **Tab 3 — Community Board**
> - Free-form community post feed
> - Top filter: Newest / Hottest
> - Each post: avatar + name + time posted + post title + content summary + tag (Secondhand / Share / Help) + like count + comment count
> - Floating [+ Post] button bottom-right → free post form (title + content + select tag)
> - Tapping a post → Level 3: post detail page (full content + comment section)
>
> ---
>
> **COMMUNITY NAVIGATOR — Level 2 Screen: Community Overview Hall**
>
> **Top — Spatial Navigation card:**
> - Simplified apartment area map (clean line-art style), with colored circle pins marking all facility locations
> - Tapping a pin on the map → bottom sheet slides up showing: facility name, floor/room number, directions
> - Tapping the map card itself → Level 3: Interactive Map & Guidance (full interactive map + route guidance) + Location Index (building and floor index for all facilities)
>
> **Below — Four function tiles:**
> - **Facilities Directory** → Level 3: facility list and detail pages (Basic Info: photos + opening hours; Usage Manual: numbered steps; Rules: pill tags; Assistant Gateway: Set Reminder → jumps to Message module)
> - **Groups & Clubs** → Level 3: Club Detail (mission + organizer + active members; Activity Archive photo grid; Culture Accessibility badge; Join Gateway button)
> - **Bulletin Board** → Level 3: Official Statements (full notice content)
> - **Event Highlights** → Level 3: official event detail (Official Schedule; Program Overview; Booking Status; Buddy Entry → links to Social Buddy Finder)
>
> ---
>
> **CULTURE BRIDGE — Level 2 Screen**
>
> - **Swedish Living Wiki**: grid of category icons (Laundry / Waste Sorting / Community Quiet Hours / Winter Survival / Swedish Supermarket / etc.)
>   - Tapping an icon → Level 3: Living Knowledge & Guide
>     - Practical Guide: step-by-step action instructions for specific facilities or behaviors
>     - General Knowledge & Tips: three dimensions:
>       - Social Norms (e.g. Swedish personal space culture)
>       - Local Survival (e.g. Systembolaget opening hours, returning bottles at supermarket)
>       - System Logic (e.g. why glass recycling is separated by color)
>
> - **Community Cultural Calendar**: monthly calendar view, marking Swedish and international student-added festivals and holidays
>   - Tapping a specific date/festival → Level 3: Cultural Context
>     - Culture & Event Intro: festival background, participation expectations, dress code, taboos
>     - Link to Activity: if a related activity exists in Interest Radar, one-tap shortcut to that activity card

---

直接把这段完整粘进 Figma Make，用 Claude Sonnet 模型生成 😊