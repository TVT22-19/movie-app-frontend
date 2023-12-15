import {
    ApiError,
    ApiMessage,
    AuthObject,
    Group,
    GroupCreationBody,
    GroupData,
    GroupUser,
    JoinRequestBody,
    JoinRequests,
    Member,
    Movie,
    Post,
    Review,
    Reviews,
    TVSeries,
    User,
    UserRemovalBody
} from "./types.ts";
import {useQuery} from "@tanstack/react-query";

const hostUrl: string = "https://movie-app-backend-wjza.onrender.com"

// Example request
export const getUser = async (id: number): Promise<User> => {
    const response = await fetch(`${hostUrl}/users/${id}`)

    if (response.status !== 200) throw new Error((await response.json()).message)

    return await response.json() as User
}

/*   AUTH   */
export const login = async (user: User): Promise<AuthObject> => {
    const response = await fetch(`${hostUrl}/auth/login`, {
        method: "POST", headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify(user)
    })

    if (response.status !== 200) throw new Error((await response.json() as ApiError).error)

    return await response.json() as AuthObject
}

export const register = async (user: User): Promise<AuthObject> => {
    const response = await fetch(`${hostUrl}/auth/registration`, {
        method: "POST", headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify(user)
    })

    if (response.status !== 201) throw new Error((await response.json() as ApiError).error)

    return await response.json() as AuthObject
}

export const getReviews = async (user_id: number): Promise<Reviews[]> => {
    const response = await fetch(`${hostUrl}/review/userid/${user_id}`)

    if (response.status !== 200) throw new Error((await response.json()).message)

    return await response.json() as Reviews[]
}

export const updateUser = async (user: User): Promise<AuthObject> => {
    const response = await fetch(`${hostUrl}/users/update`, {
        method: "POST", headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify({
            username: user.username,
            password: user.password,
            age: user.age,
            firstname: user.firstname,
            lastname: user.lastname,
            avatar_url: user.avatarURL,
            id: user.id
        })
    })

    if (response.status !== 200) throw new Error((await response.json()).message)

    return await response.json() as AuthObject
}

export const deleteUser = async (id: number): Promise<string> => {
    const response = await fetch(`${hostUrl}/users/delete/${id}`, {
        method: "DELETE"
    })

    if (response.status !== 200) throw new Error((await response.json()).message)

    return await response.json() as string
}

/*   GROUP   */
export const createGroup = async (groupBody: GroupCreationBody): Promise<ApiMessage> => {
    const response = await fetch(`${hostUrl}/group/add`, {
        method: "POST", headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify(groupBody)
    })

    if (response.status !== 201) throw new Error((await response.json() as ApiError).error)

    return await response.json() as ApiMessage
}

export const getGroups = async (): Promise<Group[]> => {
    const response = await fetch(`${hostUrl}/group/allgroups`)

    if (response.status !== 200) throw new Error((await response.json() as ApiError).error)

    return await response.json() as Group[]
};

export const getGroupInvites = async (userId: number): Promise<JoinRequests[]> => {
    const response = await fetch(`${hostUrl}/grouprequest/${userId}`)

    if (response.status !== 200) throw new Error((await response.json() as ApiError).error)

    return await response.json() as JoinRequests[]
};

export const answerToJoinRequest = async (userId: number, groupId: number, choice: boolean): Promise<void> => {
    const response = await fetch(`${hostUrl}/grouprequest/${userId}/fromgroup/${groupId}/choice/${+choice}`, {
        method: "DELETE"
    })

    if (response.status !== 200) throw new Error((await response.json() as ApiError).error)
}

export const fetchMembers = async (groupId: number): Promise<Member[]> => {

    const response = await fetch(`${hostUrl}/group/members/${groupId}`);
    if (response.status !== 200) throw new Error((await response.json()).message);

    return await response.json() as Member[];
}

export const fetchDiscussionPosts = async (groupId: number): Promise<Post[]> => {

    const response = await fetch(`${hostUrl}/group-post/${groupId}`);
    if (response.status !== 200) throw new Error((await response.json()).message);

    return await response.json() as Post[];
}

export const createDiscussionPost = async (title: string, content: string, groupID: number, userID: number) => {
    try {
        const response = await fetch(`${hostUrl}/group-post/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({title, userID, groupID, content})
        });

        if (!response.ok) {
            throw new Error((await response.json()).message);
        }

        return await response.json();
    } catch (error) {
        console.error('Error in createDiscussionPost:', error);
        throw error;
    }
}

export const fetchGroupInfo = async (groupId: number): Promise<GroupData> => {

    const response = await fetch(`${hostUrl}/group/${groupId}`);
    if (response.status !== 200) throw new Error((await response.json()).message);
    return await response.json() as GroupData;
}


export const removeMember = async (userRemovalBody: UserRemovalBody): Promise<string> => {
    const response = await fetch(`${hostUrl}/group/deletemember/${userRemovalBody.selectedUserId}/from/${userRemovalBody.groupId}`, {
        method: 'DELETE',
    });
    if (response.status !== 200) throw new Error((await response.json()).message);
    return await response.json() as string;
}

export const checkMembership = async (userId: number, groupId: number) => {

    const response = await fetch(`${hostUrl}/group/is-member/${userId}/${groupId}`);
    if (response.status !== 200) throw new Error((await response.json()).message);
    return await response.json();
}

export const checkOwnership = async (userId: number, groupId: number) => {

    const response = await fetch(`${hostUrl}/group/is-owner/${userId}/${groupId}`);
    if (response.status !== 200) throw new Error((await response.json()).message);
    return await response.json();
}

export const fetchGroupsByUser = async (userId: number): Promise<GroupUser[]> => {
    try {
        const response = await fetch(`${hostUrl}/group/groupsbyuser/${userId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch groups user is part of');
        }
        const groupsData = await response.json();

        //to add group names
        const groupDetailsPromises = groupsData.map(async (group: GroupUser) => {
            const groupDetailsResponse = await fetch(`${hostUrl}/group/${group.group_id}`);
            if (!groupDetailsResponse.ok) {
                throw new Error(`Failed to fetch details for group ${group.group_id}`);
            }
            const groupDetails = await groupDetailsResponse.json();
            console.log(groupDetails);

            return {...group, name: groupDetails.name};
        });

        const groupsWithDetails = await Promise.all(groupDetailsPromises);
        console.log("groupswithdetails:", groupsWithDetails);
        return groupsWithDetails as GroupUser[];

    } catch (error) {
        throw new Error(`Error fetching groups`);
    }
};

export const createJoinRequest = async (joinRequestBody: JoinRequestBody): Promise<string> => {

    console.log(joinRequestBody);

    const response = await fetch(`${hostUrl}/grouprequest/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({userid: joinRequestBody.userId, groupid: joinRequestBody.groupId})
    });

    if (!response.ok) {
        throw new Error((await response.json()).message);
    }

    return await response.json() as string;

}

/*   MOVIE AND SEARCH   */
export const fetchMedia = async (query: string, isMovie: boolean) => {
    if (!query) {
        return [];
    }

    const mediaType = isMovie ? 'movie' : 'tv';
    const response = await fetch(`${hostUrl}/moviedb/search/${mediaType}/${query}`);

    if (response.status !== 200) throw new Error((await response.json()).message);

    const data = await response.json();
    return isMovie ? data.results : (data.results as TVSeries[]);
}

const fetchMovieData = async (id: number): Promise<Movie> => {
    const response = await fetch(`${hostUrl}/moviedb/${id}`);

    if (!response.ok) {
        throw new Error('Failed to fetch movie data');
    }

    return response.json();
};

//move these eventually
export const useFetchMovieData = (movieId: number) => useQuery<Movie, Error>({
    queryKey: ["fetchmoviedata", movieId],
    queryFn: () => fetchMovieData(movieId),

})

const fetchReviewsByMovieId = async (id: number): Promise<Review[]> => {
    const response = await fetch(`${hostUrl}/review/movieid/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch movie data');
    }
    const reviews = await response.json();

    const userIds = reviews.map((review: Review) => review.user_id);

    // user information for each user ID
    const users = await Promise.all(
        userIds.map((userId: number) => fetch(`${hostUrl}/users/${userId}`).then(response => response.json()))
    );

    return reviews.map((review: Review, index: number) => ({
        ...review,
        username: users[index].username,
    }));
};


export const useFetchReviewsByMovieId = (movieId: number) => useQuery<Review[], Error>({
    queryKey: ["fetchreviewsbymovieid", movieId],
    queryFn: () => fetchReviewsByMovieId(movieId),

})


export const addReview = async (userID: number, movieID: number, content: string, rating: number) => {
    const response = await fetch(`${hostUrl}/review`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({user_id: userID, movie_id: movieID, content: content, rating: rating}),
    });

    if (!response.ok) {
        throw new Error('Failed to add review');
    }

    return response.json();
};