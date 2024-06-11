# Tabs Component Documentation

## Features

### Drag-and-Drop

- **Pinned and Unpinned Tabs Separation:** Pinned tabs cannot be moved to the position of unpinned tabs and vice versa.
- **Mobile Drag-and-Drop Delay:** On mobile devices, tabs can be dragged after being held for 2 seconds. This delay ensures that dragging does not interfere with scrolling.

### Pinning

- **Fixed Position for Pinned Tabs:** Pinned tabs do not scroll with other tabs. They remain visible at all times.

### Scrolling

- **Overflow Handling:** Tabs that do not fit in the visible area of the container are displayed in a dropdown menu.
- **Edge Shadows:** Shadows are displayed at the edges of the container if there are tabs that do not fit in the visible area, indicating that more tabs are available to scroll to.

### State Persistence

- **State Retention:** The state of the tabs (including their order and pinned status) is preserved after the page is reloaded.

### Router Integration

- **URL Assignment:** Each tab is assigned a URL. Navigating to a different tab changes the URL to the one assigned to the active tab.
