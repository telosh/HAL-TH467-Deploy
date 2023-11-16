import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Session } from "@supabase/supabase-js";
import { ProfileType } from "../types/tables";
import QuizTab from "../components/home/QuizTab";
import StoryTab from "../components/home/StoryTab";
import Avatar from '../components/Avatar'
import { error } from "console";
import HomeModal from "../components/home/HomeModal";
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const [sessions, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<ProfileType | null>(null)
  const [showTab, setShowTab] = useState<{ [key: string]: boolean }>({
    'home': true,
    'quiz': false,
    'story': false
  })

  const navigate = useNavigate();
  const [showConfigModal, setShowModal] = useState(false);
  const [menuBar, setMenu] = useState("line_menu.png");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  const setTab = (tabName: string) => {
    const updatedTabs: { [key: string]: boolean } = {};
    Object.keys(showTab).forEach((key) => {
      updatedTabs[key] = key === tabName;
    });
    setShowTab(updatedTabs);
  };

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

  useEffect(() => {
    const navigateRegFrom = async () => {
      if (user?.username === null) {
        navigate('/RegForm');
      } else {
        console.log(user?.username);
      }
    };
    navigateRegFrom();
  }, [user]);


  const toggleModal = () => {
    setShowModal(!showConfigModal);

    if (!showConfigModal) {//modalの状態でcross か barを変える
      setMenu('line_cross.png');
    } else {
      setMenu('line_menu.png');
    }
  };

  const getImage = (filePath: string): string => {
    return new URL(`../assets/${filePath}`, import.meta.url).href;
  };

  return (
    <>
      {user?.username ? (
        <div className="App">
          <div className={"black"}></div>
          <section className={"home-wrap"}>
            <section>
              <div>
                <p>レベル</p>
              </div>
              <div>
                <p>{user && user.username}</p>
                <p>アイテム数</p>
              </div>
              <div>
                <p>モーダルを表示</p>
              </div>
            </section>
            <div className={showConfigModal ? "overlay-add" : "overlay"}>
              <HomeModal
                closeModal={toggleModal}
              />
            </div>
            <div
              className="home-btn"
              onClick={toggleModal}
            >
              <img src={getImage(menuBar)} alt="" />
            </div>
            {showTab['home'] ? (
              <h1>ホーム</h1>
            ) : showTab['quiz'] ? (
              <>
                <h1>クイズ</h1>
                <QuizTab />
              </>
            ) : showTab['story'] ? (
              <>
                <h1>ストーリー</h1>
                <StoryTab />
              </>
            ) : null}
          </section>
          <div>
            <button onClick={() => setTab('home')}>ホーム</button>
            <button onClick={() => setTab('quiz')}>クイズ</button>
            <button onClick={() => setTab('story')}>ストーリー</button>
          </div>
        </div>
      ) : null}
    </>
  );






  // return (
  //     <>
  //         <div className="App">
  //             <div className={"black"}></div>
  //             <section className={"home-wrap"}>
  //                 <section>
  //                     <div>
  //                         <p>レベル</p>
  //                     </div>
  //                     <div>
  //                         <p>{user && user.username}</p>
  //                         <p>アイテム数</p>
  //                     </div>
  //                     <div>
  //                         <p>モーダルを表示</p>
  //                     </div>
  //                 </section>
  //                 <div className={showConfigModal ? "overlay-add" : "overlay"}>
  //                     <HomeModal />
  //                 </div>
  //                 {user?.username ? (


  //                     showTab['home'] ? (
  //                         <>
  //                             <h1>ホーム</h1>
  //                         </>
  //                     ) : showTab['quiz'] ? (
  //                         // Quiz コンポーネントの内容
  //                         <>
  //                             <h1>クイズ</h1>
  //                             <QuizTab />
  //                         </>
  //                     ) : showTab['story'] ? (
  //                         // Story コンポーネントの内容
  //                         <>
  //                             <h1>ストーリー</h1>
  //                             <StoryTab />
  //                         </>
  //                     ) : null
  //                 ) : (
  //                     <>

  //                     </>
  //                 )}
  //             </section>
  //             <div>
  //                 <button onClick={() => setTab('home')}>ホーム</button>
  //                 <button onClick={() => setTab('quiz')}>クイズ</button>
  //                 <button onClick={() => setTab('story')}>ストーリー</button>
  //             </div>
  //         </div>
  //     </>
  // );
}
export default Home;