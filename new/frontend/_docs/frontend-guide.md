# Frontend Guide

## Architectural Pattern

- monolitic frontend
- micro frontend

## Availability (offline support)

- keep the engagement going in the customer end
- closed (Late night mode)
  - on web we can achieve this using `Service Worker`

## Consistency

- Design system
  - Atomic behaviour

## Accesiblity

- Remember, we are dealing with varity of customers
- Challenges
  - people dont understand english
  - people cannot speak properly
  - people cannot hear properly
  - color differenciation problem
- Things to consider,
  - vision impartment
    - i18n & color/contract of the web app
  - keyboard accessibility
  - Hearing problems
    - screen reader (use HTML5 for better symantics)

# Optimising our web app performance at various levels

> Frontend Performance optimization

- Asset
- at Network layer
- Monitor build size, time etc (build system)

# Assets

### Images

- Compression
- lazy loading
- Progressive Enhancements
- Client HTTP hint
- Responsive images
- Adaptive Images
- Blur effects
- solid primary color

### Videos

- Progressive Enhancements
- Replace Gifs with videos
- Responsive poster image
- Streaming
- Videos with no audio
- Preload

### Fonts

- Font display decorator
- FLOUT with class
- Data URI
- Preload
- Progressive enhancments
- Async load css
- Font face observer

### CSS

- Lazy loading
- Critical css rendering

### Javascript

- webworkers
- lazy loading
- defer vs async

## Network

- Lazy loading
- Loading javascript in async
- Content visibility
- Serving critical css
- Resource hints
- Caching using service worker
- Caching using CDN
- CSR, SSR (Render type)
- Comperssion techniques
- Layouts shifts & repaints

## Build

- monolatic
- polyrepo vs monrepo
- microfrontends
- consuming 3rd party libs via npm

## Within React library

- Lazy loading
- Error bondaries
- Suspense Component
- Abort Controller
- useMemo and useCallback
- React.memo()

- React Queries
  - keepPreviousData

---

## Techniques

- Prefetching
- Preloading
- Tree shaking
- cache bursting
- code splitting
- bundle splitting
- compressing javascript
- list virtualization
- Import on

  - interaction
  - visibility

- Front end performance optimization
  Network
  - Web Assets
  - images
  - css
  - fonts
  - js
  - videos

## Concepts for frontend developers

- Logging & Monitoring
- Security
- Testing
- Database
- Communication techniques
- Networking Concepts

# Components supports

- components with
  - theme (dark/light)
  - rtl (right to left)
  - responsive
  - typed props (types)
  - accesability (aria-label)
  - i18n

---

## js core concepts

- V8 Engine
- JS event loop
- Non blocking code (Callbacks/Promises/Async pattern)
- DOM

## Web api's

- drag & drop
- audio & video
- geolocation
- websockets
- webRTC
- canvas

# Centralized Logging System

- ELK Stack / Elastic Stack
- react-error-boundries
- sentry.io
- winston
- error format
  - error object -> stack trace
  - error response

## General Frontend development `(UI library)`

- Shadcn/ui
- Styling solution
- State management
- Context API
- redux-toolkit/zustand
- Routing
- Data fetching
- Personalization & A/B testing
- Internationalization
- handling plurals across languages
- format (dates, times & numbers)
- consider RTL languages
  - Testing

---
