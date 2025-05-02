Commonly asked React.js Low-Level Design (LLD) interview questions:

𝟭. 𝗛𝗼𝘄 𝘄𝗼𝘂𝗹𝗱 𝘆𝗼𝘂 𝗶𝗺𝗽𝗹𝗲𝗺𝗲𝗻𝘁 𝗶𝗻𝗳𝗶𝗻𝗶𝘁𝗲 𝘀𝗰𝗿𝗼𝗹𝗹𝗶𝗻𝗴 𝗶𝗻 𝗥𝗲𝗮𝗰𝘁?

- Consider the approach for triggering additional data load when the user scrolls near the end of the page or a scrollable element.
- How would you handle throttling, debouncing, or optimization to prevent excessive requests?
- Discuss how to manage state for pagination and loading indicators.

𝟮. 𝗛𝗼𝘄 𝘄𝗼𝘂𝗹𝗱 𝘆𝗼𝘂 𝗶𝗺𝗽𝗹𝗲𝗺𝗲𝗻𝘁 𝗮 𝘀𝗲𝗮𝗿𝗰𝗵 𝗳𝘂𝗻𝗰𝘁𝗶𝗼𝗻𝗮𝗹𝗶𝘁𝘆 𝘄𝗶𝘁𝗵 𝗹𝗶𝘃𝗲 𝗳𝗶𝗹𝘁𝗲𝗿𝗶𝗻𝗴 𝗶𝗻 𝗮 𝗥𝗲𝗮𝗰𝘁 𝗮𝗽𝗽𝗹𝗶𝗰𝗮𝘁𝗶𝗼𝗻?

- Describe how to optimize the filtering process for large datasets.
- How would you debounce user input to avoid unnecessary re-renders or API calls?
- How would you manage the filtered results state and the interaction with an API?

𝟯. 𝗛𝗼𝘄 𝘄𝗼𝘂𝗹𝗱 𝘆𝗼𝘂 𝗱𝗲𝘀𝗶𝗴𝗻 𝗮𝗻𝗱 𝗶𝗺𝗽𝗹𝗲𝗺𝗲𝗻𝘁 𝗮 𝗳𝗼𝗿𝗺 𝘄𝗶𝘁𝗵 𝗱𝘆𝗻𝗮𝗺𝗶𝗰 𝗳𝗶𝗲𝗹𝗱𝘀 𝗶𝗻 𝗥𝗲𝗮𝗰𝘁?

- How would you manage form validation, error handling, and state for dynamic inputs?
- Would you use controlled or uncontrolled components for such a form?
- How would you structure the form’s state for adding/removing dynamic fields?

𝟰. 𝗛𝗼𝘄 𝘄𝗼𝘂𝗹𝗱 𝘆𝗼𝘂 𝗶𝗺𝗽𝗹𝗲𝗺𝗲𝗻𝘁 𝘀𝘁𝗮𝘁𝗲 𝗺𝗮𝗻𝗮𝗴𝗲𝗺𝗲𝗻𝘁 𝗳𝗼𝗿 𝗮 𝗺𝘂𝗹𝘁𝗶-𝘀𝘁𝗲𝗽 𝗳𝗼𝗿𝗺 𝗶𝗻 𝗥𝗲𝗮𝗰𝘁?

- How would you ensure that data entered in each step of the form is stored properly and can be accessed across steps?
- How would you manage navigation between steps and handle errors or validation for each step?

𝟱. 𝗛𝗼𝘄 𝘄𝗼𝘂𝗹𝗱 𝘆𝗼𝘂 𝗶𝗺𝗽𝗹𝗲𝗺𝗲𝗻𝘁 𝗮 𝗰𝘂𝘀𝘁𝗼𝗺 𝘂𝘀𝗲𝗙𝗲𝘁𝗰𝗵 𝗵𝗼𝗼𝗸 𝗶𝗻 𝗥𝗲𝗮𝗰𝘁 𝗳𝗼𝗿 𝗵𝗮𝗻𝗱𝗹𝗶𝗻𝗴 𝗛𝗧𝗧𝗣 𝗿𝗲𝗾𝘂𝗲𝘀𝘁𝘀?

- Discuss the structure of the hook for handling loading, error, and success states.
- How would you use useEffect to trigger the API request and manage cleanup?
- How would you ensure that the hook is reusable across different components?

𝟲. 𝗛𝗼𝘄 𝘄𝗼𝘂𝗹𝗱 𝘆𝗼𝘂 𝗶𝗺𝗽𝗹𝗲𝗺𝗲𝗻𝘁 𝗹𝗮𝘇𝘆 𝗹𝗼𝗮𝗱𝗶𝗻𝗴 𝗼𝗳 𝗰𝗼𝗺𝗽𝗼𝗻𝗲𝗻𝘁𝘀 𝗶𝗻 𝗥𝗲𝗮𝗰𝘁?

- Explain how to use React.lazy and Suspense for loading components only when required.
- How would you handle loading indicators or fallback UI during the loading process?
- How would you manage this for multiple components or routes?

𝟴. 𝗛𝗼𝘄 𝘄𝗼𝘂𝗹𝗱 𝘆𝗼𝘂 𝗶𝗺𝗽𝗹𝗲𝗺𝗲𝗻𝘁 𝗮 𝗱𝗿𝗮𝗴𝗴𝗮𝗯𝗹𝗲 𝗹𝗶𝘀𝘁 𝗶𝗻 𝗥𝗲𝗮𝗰𝘁?

- Explain how to manage the drag-and-drop state and reordering of list items.
- What would be your approach for handling the drag events, and how would you optimize performance?

𝟵. 𝗛𝗼𝘄 𝘄𝗼𝘂𝗹𝗱 𝘆𝗼𝘂 𝗶𝗺𝗽𝗹𝗲𝗺𝗲𝗻𝘁 𝗮𝘂𝘁𝗵𝗲𝗻𝘁𝗶𝗰𝗮𝘁𝗶𝗼𝗻 𝗮𝗻𝗱 𝗮𝘂𝘁𝗵𝗼𝗿𝗶𝘇𝗮𝘁𝗶𝗼𝗻 𝗶𝗻 𝗥𝗲𝗮𝗰𝘁?

- How would you protect routes that require authentication and redirect users to the login page if they’re not authenticated?
- How would you implement token-based authentication (e.g., JWT) and handle token expiry?
