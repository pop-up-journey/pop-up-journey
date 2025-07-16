1. db에서 데이터를 가져오는 건 app폴더 내의 page.tsx에서 최대한 진행.

- 유저 정보 : getUserInfo 이용
- 이벤트 정보 : getEvents 이용

2. PageProps나 Props interface 정의에 하나밖에 없는 경우 그냥 따로 안 빼기

3. router.push -> Link로 대체(웬만하면!!)

## 문제점

1. 관심팝업 기능

- 로그인/비로그인 서로 영향을 주면 안 됨.
  빠르게 해결) 비로그인시 기능 회원가입유도[로그인모달]
  상세, 메인 => 버튼 클릭시, '회원만 가능하다'는 문구 표시

2. 이벤트 참가 신청 관련

- 이벤트 등록) '자동신청'
  => event_participate 컬럼 participate_status가 'approved' 되어야 함
- 이벤트 등록) '외부신청링크'
  => 신청하기 버튼 누르면 외부 신청 링크로 빠져야함
- 이벤트 등록) 안 받는 경우에 대한 처리 미흡
- [폼]티켓수 validation 문구 영어 -> 한글 변경
- [폼] 중복신청, 성공/실패/처리중 클라이언트측 알림 필요
  (성공) 알림 + 이전페이지 이동

3. 로그인/로그아웃/회원탈퇴

- 로그아웃시 페이지 머무름 -> 메인으로 redirect
- 주최자 회원탈퇴 : 팝업데이터 cascade로 다 사라지는지 확인 필요함
- 호스트 -> 참가자 변경 : 등록한 이벤트들은 다 어떻게 할건지
- 로그인 성공 -> ADD-INFO로 redirect 되도록 변경

4. 회원정보

- [미구현] db: InterestChip
- [미구현][PROFILE] 프로필 수정은 모달 처리

5. 이벤트 등록 관련

- [register] 참가자 모집 방법에 대한 db 컬럼이 없음
- 서로 반대되는 chip은 선택이 안 되어야 한다고 생각함
- validation 필요함

6. [HEADER] 검색기능 미구현
7. [HEADER] 다크모드 설정(드롭다운)
8. [FOOTER] 모든 페이지에 공간차지 너무 많이함
   -> 각 src/app/\* layout추가해서 선택적 레이아웃 적용 할 것

## 비로그인/비회원 차단 페이지

1. PROFILE, HOST-CENTER, POPUP-PARTICIPATE, ADD-INFO, REGISTER
   -> middleware session 이용
   --

1. ADDINFO
   WrpperAddInfo :유저 정보 입력 페이지

- FloatingBundle -> FloatingShape : 스타일 컴포넌트
- AddInfoForm.tsx : 유저 정보 입력 폼
  1. useGetUserInfo : 유저 정보 가져오기
  2. Inputstate는 zustand로 관리
  3. handleSubmit : 폼 제출 버튼 - null값관리 - updateUserInfo : 수정 업데이트 로직

  <form>
  <Form Title>
  그 안에 map으로 Input
  <Select>
  <InterestChip> => 관심사 Chip인데 Selectable이랑 관련지을 수 있지 않나 싶음
  <Button>
  </form>

2. HOSTCENTER : 호스트 센터. 이벤트 주최자의 이벤트 관리 페이지
1. useGetUserInfo : 유저 정보 가져오기
1. getHostEvents : hostId에 따라 host의 이벤트 가져오기

- HostEvents의 Prop interface 바꿀 수 있다고 생각함

3. EventMapPanel
1. getEventById(popupid) : 이벤트 조회(개별)
1. getHostByEventID : 이벤트별 호스트 조회
   - 근데 db 수정해서 필요없을듯. event스키마에서 바로 가져오면 될듯
1. OrganizerInfo는 그냥 HostName띄워주고 마는 걸로.(페이지연결X)

- MapContainer : 맵띄워주는 부분 center를 props로 받음.
- EventTitle : 주최자명 Link없애야함. organizerinfo 컴포넌트와 활용가능한지 확인.

4. PARTICIPATE : 이벤트 참가 신청 페이지

- Params인터페이스 없애?
- event -> popup으로 바꿔줘야함
  그리고 개별 이벤트 갖고 오는 거니까 getEventById 사용할 수 있을 듯
  // main 클래스 네임 부분 지우기
  - FloatingBundle
  - EventSummary : Image 부분 EventThumbnail로 바꿔도 될걸?
  - Participate Form
  - defaultSt

5. POPUP SEARCH : 이벤트 전체 조회 (지역 필터링)
   - useCallback과 useMemo로 최적화
   - EventsFilter
   - EventsMap : useGeocode 훅으로 변환, 주소변환 유틸로 변환
   - EventList

6. Profile 페이지
   - 얘도 최상단에서 데이터 불러오기
   - 관심팝업 리스트 실제 데이터로 교체 필요 -> 섹션 분리
