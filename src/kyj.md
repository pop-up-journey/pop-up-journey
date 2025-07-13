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
