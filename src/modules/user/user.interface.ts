export interface IUser {
    id: bigint;
    email: string;
    password: string;
    name: string;
    createdAt: Date;
    updateAt: Date;
}

export type UserWithoutPassword = Omit<IUser, 'password'>;
