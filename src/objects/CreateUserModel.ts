export default class CreateUserModel {
    private readonly _username: string
    private readonly _password: string
    private readonly _email: string

    constructor(username: string, password: string, email: string) {
        this._username = username
        this._password = password
        this._email = email
    }

    get username(): string {
        return this._username;
    }

    get password(): string {
        return this._password;
    }

    get email(): string {
        return this._email;
    }
}