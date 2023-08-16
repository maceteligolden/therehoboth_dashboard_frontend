export interface IRegisterUserInput {
    email: string,
    username: string,
    password: string,
}

export interface ILogin {
    email: string;
    password: string;
}

export interface ILoginResponse {
    token: string;
    user: any
}