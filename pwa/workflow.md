# Workflow

1. App is starting up
   - App displays loading spinner
   - App intercepts browser events for history management (normal PWA behaviour)
   - App tries to find user/login information, and renews them if required
   - App connects to the API
2. App discovers/loads all plugins, and initializes them
   - list of plugins being initialized maybe shown underneath the loading spinner?
3. Page routing object is being built
4. App determines page and class responsible for the current route, and renders it
5. App listens on browser events, HTML routing events etc.

## App states

- Starting
- Started (required?)
- Running
  - routing to new page
  - displaying new page
- shutting down
  - if required, remove local data, or save unsaved work to API
- error
- crashed (useful? possible?)

## API session state

- starting
- connected
- error
- anonymous
- awaiting login/register/logout?

## Page types

- Generic page, individual URL
  - routes are registered by priority. Should a page try to register the same URL with the same priority as another page, then it will be denied.
    - or page is stored as backup? however, as long as the first page object is active, the later pages will not become active
- Specialized pages:
  - element page: `/<uuid>`
    - should display one specific element, or data related to it
    - routing depends on the type, and which page elements are trying to render it (highest priority wins)
  - children page: `/<uuid>/children`
  - parents page: `/<uuid>/parents`
  - related page: `/<uuid>/related`

The following pages should be included by default, or through default plugins:

- Fallback pages for element, children, parents and related pages
- Search page at `/search`
  - Possibly additional pages for advanced searches and custom search templates (identified by uuid? or element rendered as search page?)
- Page for creating new elements at `/create`
- Similar page for creating sub-elements at `/<uuid>/create`
- Pages for managing file uploads/downloads?
- Page for deleting important elements at `/delete/<uuid>`?
  - "important" elements are users, groups etc.?
  - other not important elements should be deleted directly through the UI
  - should the URL be accessed directly with the UUID of an not important element, then it should be treated as an important element
- Management pages:
  - `/management/user`: Create/update/delete API users
  - `/managament/group`: Create/update/delete groups
  - `/management/token`: Pages for handling and interacting with tokens?
- Local app pages:
  - `/setting/`: Pages for handling settings etc
  - `/login`: Login page
  - `/logout`: Dedicated logout page (if required, direct logout should be possible)
  - `/register`: Page for creating new API user accounts (if enabled by the API)

## Page registration service

- Pages can be registered through browser events and direct method calls.
  - static route definitions through manifest etc. could be possible, but dynamic features would no longer work - at least not as easily
- Pages require the following attributes:
  - `pageId`: Identifier of the page within the plugin
    - Internally a combination of `pluginId` and `pageId` is used to identify the page
    - Conflicts throw an exception
  - `pluginId`: Identifier of the plugin
  - `route`: String containing the path, for which the page should become active.
    - route could start with `ref:<name-of-existing-route>`, which can be interpreted in two ways:
      - if only the reference is used, then the page uses the existing route in an identical way. useful for element, children, parents etc. pages
      - if the reference is followed by additional characters, e.g. `ref:<name-of-existing-route>/test`, then the regexes are combined to a new regex
        - makes handling URLs simpler
        - confines pages to a single route regex
  - `priority`: Used when multiple pages apply to the same route. higher priority wins
  - `component`: Name of web component to draw
    - Web component will get data from the URL etc. at draw time
  - ~~`guard`: Function which gets called when the route matches. Can return true to render the current page, or false to not render the current page~~
    - guard will be handled by plugin events

- Browser events / method calls to interact with route/page configurations:
  - register page
  - get registered pages
  - get registered pages from a plugin
  - remove registered page
  - clear all registered pages
  - clear all registered pages from a plugin
  - match url to page

## Plugins

- Plugins should provide an instance of an object, which is responsible for receiving events and acting on them.

## Page scrolling

There are different scenarios which require different scrolling and UI handling.

- PWA menu might be rendered on one or two of the sides (top, left, right, bottom).
  This does not specify the rendering solution, but reduces screen space.
- PWA menu might be rendered all around, which likely limits to in page scrolling.
- Depending on the scenario, the PWA menu might be collapsible, which gives a page more screen space.
- When only one page is shown, then the app can decide whether to use browser scrolling or in page scrolling.
- When multiple apps are shown, then all of them should use in page scrolling.
- Maybe for a later release: The in-page-scroll-position might be linked to another page's scroll position, if
  supported.

Requirements for pages:

- Page must be able to display/use its own scroll bars
- Page should accept web component property `XXX` to switch to self scrollbar mode, or be already in it
- Page configurations can communicate the following properties:
  - w

### Login page state management

variables:
- username
- password
- meta: is form locked

- init
- editingLoginForm
- handlingLoginRequest
- loginSucceeded




