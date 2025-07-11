# remove, rename : 폴더 구조

## 파일 이름 개선 제안

`_pages`라는 폴더에 이미 있으니
`~~Page`라는 접미사 없어도 되지 않을까 싶음

```js
AddInfo;
EventDetail;
EventParticipate;
EventRegister;
HostCenter;
Main;
Profile;
```

## rename 해야하는 부분

- EventsPage.tsx
- TODO: Events라는 app 라우터 때문에 이름이 중복되는데 좋은 방법 생각해보기

## remove

- SignInpage.tsx - 삭제

---

# Refactor

## `_pages`는 server component??

`_pages` 폴더 안에 있는 Wrapper는 API 호출 용으로 사용한다면 server component로 충분히 교체 가능가능하지 않을까?
server component로 교체 하면 prefetch, 최적화에 용이할 것으로 생각됨

가능하다면 `useGetUserInfo`훅을 서버 컴포넌트용으로도 따로 만들어야함

## 시멘틱태그

`_pages`안에 있는 Wrapper page components는 최상위 태그로 main태그를 사용해야함
EventDetail
EventsPage

---

# Design

## 레이아웃 스타일링 / app폴더 참고

`  <main className="min-h-screen max-w-6xl">`
이런식으로 h,w를 각 main에 중복으로 사용하고 있는데 이를
app/layout.tsx에서 사용해서 중복을 줄이는 방법 필요

## add-info

`<main aria-label="add-info-page" className="relative overflow-hidden bg-gradient-to-tr from-pink-400 to-blue-400">`
해당 className
app/add-info에 Layout추가하면 더 깔끔하게 될 듯

`app/event/page.tsx`
