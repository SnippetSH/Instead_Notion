# type 폴더 사용 요령

zustand store의 타입 지정의 경우:
- 확장자 명: type_{store 이름}.ts
- 내부 interface 이름: store 이름에서 store 빼고, Type 붙이기

ex) store 이름: UserStore,

type 이름: UserType, UserActionType