"use client"
import { SearchAddition, SearchCriteria, SearchPayload } from '@/BE-library/interfaces';
import { AccountOperation, AuthOperation } from '@/BE-library/main';
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
interface userSession {
    id: string;
    fullName: string;
    email: string;
    googleId: string;
    avaUrl: string;
    createdAt: string;
    updateAt: string;
    devices: any[]; // Adjust type if necessary
    schedules: any[]; // Adjust type if necessary
    sid: string
}
interface SessionContextType {
    status: 'loading' | 'authenticated' | 'unauthenticated';
    session: null | userSession; // Replace 'any' with appropriate session type
    setSession: Dispatch<SetStateAction<null | any>>; // Adjust type accordingly
}
export const getSid = () => {
    const gid = Cookies.get("gid");
    return gid;
};
const SessionContext = createContext<SessionContextType>({
    status: 'loading', // Có thể là 'loading', 'authenticated', 'unauthenticated'
    session: null,
    setSession: () => {},
});
export function SessionProvider({ children }) {
    const [status, setStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>("loading");
    const [session, setSession] = useState(null);
    const pathName = usePathname()
    const router =useRouter();
    const sid = getSid()
    const infoAction = new AccountOperation()
    useEffect(() => {
        const fetchData = async () => {
            setSession(sid)
            const infoRes = await infoAction.getAuthenticatedInfo(sid)
            // console.log( infoRes )
            if(infoRes.status != 200)
                {
                    if(pathName.toString() !== "/error?error=Configuration"&& pathName.toString() !== "/error?error=AccessDenied" && pathName.toString() !== "/" && pathName.toString() !== "/en" && pathName.toString() !== "/vi") router.push("/login")
                    setStatus('unauthenticated');
                    return
                }
            let session
            if(infoRes.status == 200)
                session= Object.assign({}, infoRes.data, {
                    sid: sid,
                })
            setSession(session);
            setStatus('authenticated');
        };
        fetchData();
    }, [pathName]);


    return (
        <SessionContext.Provider value={{ status, session, setSession }}>
            {children}
        </SessionContext.Provider>
    );
}
export function useSession() {
    const { status, session, setSession } = useContext(SessionContext);
    return { status, session, setSession };
}