1. 불필요한 props 제거

```tsx
interface OrganizerInfoProps {
  organizer: string;
  avatarSrc?: string;
  hostLink?: string;
}

export default function OrganizerInfo({ organizer, avatarSrc, hostLink = '/host-center' }: OrganizerInfoProps) {
  return (
    <Link href={hostLink} className="mb-2 mt-4 flex items-center gap-2">
      <Avatar src={avatarSrc} showFallback as="button" className="h-7 w-7 cursor-pointer" color="danger" />
      <h4 className="text-lg font-semibold text-gray-500">{organizer}</h4>
      <ChevronDoubleRightIcon className="h-5 w-5 text-gray-500" />
    </Link>
  );
}
```

실제로 받는 props는 orgnizer뿐이라면
avatarSrc, hostlink는 제거
