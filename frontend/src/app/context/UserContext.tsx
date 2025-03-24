"use client"
import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../lib/api';

export interface Friend {
    username: string;
    avatar: string | null;
}

export interface User {
    id: number;
    email: string;
    username: string;
    avatar: string | null;
    bio: string;
    is_online: boolean;
    last_seen: string;
    friends: Friend[];
}

interface UserContextType {
    user: User | null | undefined;
    loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null | undefined>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get("/api/users/get-user/")

                setUser(res.data)

            } catch (error) {
                console.error("Failder to fech user: ", error)
            }
            finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [])

    return (
        <UserContext.Provider value={{ user, loading }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}