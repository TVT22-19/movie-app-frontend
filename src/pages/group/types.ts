export interface GroupData {
    name: string;
    description: string;
    avatar_url: string;
}

export interface Member {
    id: number;
    username: string;
    avatar: string;
}
export interface GroupUser {
    user_id: number;
    group_id: number;
    name: string;

}
export interface FetchGroupsResult {
    data?: GroupUser[];
    error?: Error;
    isLoading: boolean;
}

export interface Post {
    user_id: number;
    title: string;
    content: string;
    timestamp: Date;
    username: string;

}

export interface UserRemovalBody {
    selectedUserId: number,
    groupId: number,

}

export interface JoinRequestBody {
    userId: number,
    groupId: number,

}