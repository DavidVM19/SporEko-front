export default interface IUser {
  id: number;
  pseudo: string;
  admin: number;
}
export default interface IUserLog {
  id_user: number;
  lastname: string;
  firstname: string;
  adress: string;
  zipcode: number;
  city: string;
  email: string;
  password: string;
  hash_password: string;
  picture: string;
  isadmin: number;
  isarchived: number;
  id_gender: number;
  adress_complement: string;
  id_athletic: number;
  birthday: string;
  phone: string;
  creation_date: string;
  pseudo: string;
  authentified_by_facebook: number;
}
