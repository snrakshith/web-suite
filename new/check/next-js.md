```sh
npx create-next-app@latest my-next-app
```

for custome 404 page

- filename has to be `not-found.tsx`

```js
import { useRouter } from "next/router";

export default function NotFound() {
  const router = useRouter();

  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <button onClick={() => router.back()}>Go Back</button>
    </div>
  );
}
```

- Layouts

- a default export of areact component from a layout.js or layout.tsx file.

---

params and searchParams

For a given URL,
params is a promise that resolves to an object containing the dynamic route parameters (like id)

searchParams is a promise that resolves to an object containing the query parameters (like filters and sorting)

While page.tsx has access to both params and searchParams, layout.tsx only has access to params

---

- Template files

- Server actions are async functions that are executed on the server
- they can be called in `Server` and `Client` components to handle for submissions & data mutations in Next.js applications.

"use server"

- useFormStatus -> a react hook that gives us status information about the last form submission

- revalidatePath
- useOptimistic
- [Next.js Server Actions](https://www.youtube.com/watch?v=RadgkoJrhu0)
