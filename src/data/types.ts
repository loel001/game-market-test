export interface GameShortInfo {
    id: number;
    title: string;
    developer?: string;
    released?: string;
    price?: number;
    restrictions?: {
        minAge?: number;
    };
}

export interface GameInfo extends GameShortInfo {
    description?: string;
}

export interface UserShortInfo {
    id: number;
    name: string;
    email: string;
    age?: number;
}

export interface UserInfo extends UserShortInfo {
    friendIds?: UserShortInfo['id'][];
}

export interface Purchase {
    game: GameShortInfo;
    userIds?: UserShortInfo['id'][];
    emails?: string[];
    acknowledgeInvite?: boolean;
    acknowledgeInviteAge?: boolean;
}

export enum BuyStatus {
    none,
    inProgress,
    success,
    failed,
}

export interface CheckboxList {
    value: Purchase;
    id: number;
    ageAkkaunt: number,
    age?: number,
    email?: string,
    onChange: (value: Purchase) => void;
}

export interface CheckedUser {
    user: UserShortInfo,
    id: number,
    checked: boolean,
    disabled: boolean
}

export interface AkkauntUser {
    name: string,
    age: number,
    id: number,
    checked: boolean,
    disabled: boolean
}

export interface Checked {
    checked: boolean,
}

export interface Email {
    value?: string;
}
