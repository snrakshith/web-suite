The `cls-hooked` package provides a way to manage context within a Node.js application, but it doesn't offer an automatic process for identifying the tenant for resource creation. You'll still need to pass the tenant ID in the request body or find another way to determine the tenant for each resource.

However, you can leverage `cls-hooked` to store the tenant ID in the context once you have it, allowing you to access it easily throughout your application without passing it explicitly every time.

Here's a general outline of how you can achieve this:

1. Set up the context using `cls-hooked` in your application.
2. When you receive a request, extract the tenant ID from the request body or any other source.
3. Store the tenant ID in the context using `cls-hooked`.
4. Implement middleware or a utility function to retrieve the tenant ID from the context whenever needed.

Here's an example of how you can use `cls-hooked` to store the tenant ID:

```javascript
const cls = require("cls-hooked");

// Create a new namespace
const namespace = cls.createNamespace("your-namespace");

// Middleware to set the tenant ID in the context
function setTenantId(req, res, next) {
  const { tenantId } = req.body; // Assuming tenant ID is in the request body
  namespace.set("tenantId", tenantId);
  next();
}

// Example route that retrieves the tenant ID from the context
function createResource(req, res) {
  const tenantId = namespace.get("tenantId");
  // Use the tenant ID to create the resource
}

// Wrap your server code in the namespace context
namespace.run(() => {
  // Set up your server and routes
});
```

In this example, the `setTenantId` middleware extracts the tenant ID from the request body and sets it in the context using `namespace.set()`. Later, when you need to create a resource, you can retrieve the tenant ID from the context using `namespace.get()`.

Remember to adapt this code to fit your application's specific needs and context setup.
