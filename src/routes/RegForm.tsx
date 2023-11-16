import { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"
import { ProfileType } from "../types/tables"
import { Session } from "@supabase/supabase-js"
import Avatar from "../components/Avatar"
import { useNavigate } from 'react-router-dom';


const RegForm = () => {
    const [sessions, setSession] = useState<Session | null>(null)
    const [user, setUser] = useState<ProfileType | null>(null)
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState(null)
    const [full_name, setFullName] = useState(null)
    const [website, setWebsite] = useState(null)
    const [avatar_url, setAvatarUrl] = useState(null)
    const [exp, setExp] = useState<number>(0)

    const navigate = useNavigate();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    useEffect(() => {
        const setupUser = async () => {
            if (sessions?.user.id) {
                const { data: profiles, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', sessions.user.id)
                if (error) {
                    console.error("データの取得に失敗しました", error);
                } else {
                    console.log("データの取得に成功しました", profiles);
                    setUser(profiles[0])
                }
            }
        }
        setupUser()
    }, [sessions])

    async function updateProfile(event) {
        event.preventDefault()
        const setupUser = async () => {
            if (sessions?.user.id) {
                const { data: profiles, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', sessions.user.id)
                if (error) {
                    console.error("データの取得に失敗しました", error);
                } else {
                    console.log("データの取得に成功しました", profiles);
                    setUser(profiles[0])
                }
            }
        }

        setLoading(true)

        const updates = {
            avatar_url: avatar_url,
            exp: 0,
            full_name: full_name,
            id: user?.id,
            game_state: user?.game_state,
            updated_at: new Date(),
            username: username,
            website: website,
        }

        const { error } = await supabase.from('profiles').upsert(updates)


        if (error) {
            alert(error.message)
        } else {
            setAvatarUrl(avatar_url)
            setupUser()
        }

    }

    useEffect(() => {
        const navigateHome = async () => {
            if (user && user.username) {
                navigate('/home');
            }
        };

        navigateHome();
    }, [user, navigate]);


    return (
        <>
            <div className="App">
                <div className={"black"}></div>
                <p>ユーザー情報登録画面</p>
                <form onSubmit={updateProfile} className="form-widget">
                    <div>
                        <label htmlFor="email">Email</label>
                        <input id="email" type="text" value={sessions?.user.email} disabled />
                    </div>
                    <div>
                        <label htmlFor="username">Name</label>
                        <input
                            id="username"
                            type="text"
                            required
                            value={username || ''}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="full_name">FullName</label>
                        <input
                            id="full_name"
                            type="text"
                            required
                            value={full_name || ''}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="website">Website</label>
                        <input
                            id="website"
                            type="url"
                            value={website || ''}
                            onChange={(e) => setWebsite(e.target.value)}
                        />
                    </div>
                    <div>
                        <button
                            className="button block primary"
                            type="submit"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default RegForm