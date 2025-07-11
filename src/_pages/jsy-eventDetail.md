```ts
const imgSrc = Array.isArray(event.thumbnail) ? event.thumbnail[0] : event.thumbnail;
```

`thumbnail: string` 스키마는 string 값인데
Array.isArray() 정적 메서드는 전달된 값이 Array인지 판단을 하고 있음 이거 수정 필요할 듯

# Comment : 주석 관련

각 컴포넌트가 무엇을 설명하는지 작성한 주석은 이제 삭제해도 될듯
