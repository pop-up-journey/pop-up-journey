export interface UpdateUserDTO {
  name: string;
  email: string;
  phone: string;
  role: string;
  // TODO: 관심사 db or localstorage 저장 어디에할지 고민
  // interests: string[];
}
