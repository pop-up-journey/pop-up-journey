1. Wrapper패턴 적용

```tsx
return (
  // TODO: 이거 div 제거 요망
  <div className="mb-10 flex flex-col gap-4">
    <EventMapPanel address={place} organizer={host.name} />
  </div>
);
```

WrapperSideBar.tsx로 다른 페이지들과 마찬가지로 동일하게 적용하면 좋을 듯
