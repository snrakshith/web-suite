# React patterns

## HOC

## Polymorphic components

    <Text as="p"> | <Text as="h2">
    <Bock as="div"> | <Bock as="span">

- h1 to h6 (Text)
  Spacer
- hr
- vertical
  Container
- div
- span

## Compound Components

Reusable Pattern
Composable components
Compound Components with JS function namespace to group them logically

1. Create a slots
2. use Context API to share the state/data instead of passing or accepting in them as children
3. functions in JavaScript are objects so they can have there own properties
4. now instead of using the components directly, we can now use them as properties of the component

## Render props
