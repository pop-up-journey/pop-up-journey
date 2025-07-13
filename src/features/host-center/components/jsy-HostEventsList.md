1. PAGE_SIZE 선언 제거 하고 import 위치 변경하기
   `'@/features/popup-search/services/constants';`
   여기서도 이미 PAGE_SIZE 선언됐음
   PAGE_SIZE를 `config`나 `shared/constants` 등으로 따로 빼야할듯
   config가 옛날부터 너무 애매했음..

2. 무한스크롤 api 호출(XXX) => 해결완료!!!

```tsx
useEffect(() => {
  if (isVisible && visibleCount < events.length) {
    setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, events.length));
  }
}, [isVisible, visibleCount, events.length]);
```

- 쓰레시 홀드에 도달하면 api요청을 해야하는데 이 부분이 없음
- 페이지네이션을 활용하는것도 좋은거같음
