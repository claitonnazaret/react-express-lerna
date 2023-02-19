export interface IUser {
    email?: string;
    token?: string;
}

export interface IContext extends IUser {
    authenticated: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isSignedIn: () => boolean;
}

export interface IAuthProvider {
    children: JSX.Element;
}
