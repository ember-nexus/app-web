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
