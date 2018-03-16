
export interface ILogin {
  username: string,
  password: string
}

export interface ISignUp{
  username: string,
  password: string,
  email: string,
  mobileNo: string,
  dob: string,
  address: string,
  pincode: string
}

export class SignUp implements ISignUp{
  username: string;
  password: string;
  email: string;
  mobileNo: string;
  dob: string;
  address: string;
  pincode: string
}

export class Login implements ILogin{
  username: string;
  password: string;
}