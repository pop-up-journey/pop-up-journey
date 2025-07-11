## Remove

app/event/[eventId]/page.tsx
에서 사용하고 있으니 그냥 명시해주는게 더 간편할거같음

```tsx
export default async function Page(params: Promise<{ eventId: string }>) {}
```
