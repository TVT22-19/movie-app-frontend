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

export interface Post {
    user_id: number;
    title: string;
    content: string;
    timestamp: Date;
    username: string;

}