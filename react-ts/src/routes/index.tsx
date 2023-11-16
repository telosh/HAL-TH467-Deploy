import { useEffect, useState } from "react";
import "../../src/assets/scss/style.scss";
import "../../src/assets/scss/home.scss";
import Modal from "../components/ConfigModal";
import { supabase } from "../supabaseClient";
import { Session } from "@supabase/supabase-js";

function App() {
  const getImage = (filePath: string): string => {
    return new URL(`../assets/${filePath}`, import.meta.url).href;
  };
  const [email, setEmail] = useState("guest@example.com")
  const [password, setPassword] = useState("guest")

  const appState = localStorage.getItem("flag");
  const modelUrl = "/Live2dModels/rutika-model/runtime/rutika.model3.json";

  
  const [showConfigModal, setShowModal] = useState(false); // Modalコンポーネントの表示の状態を定義する 0 ~ 5
  const [menuBar, setMenu] = useState("line_menu.png"); //menuの画像を変える
  const [username, setUserName] = useState("")

  const [showNo, setNo] = useState(false); //Nologinの画面表示用
  const [showLogin, setLogin] = useState(false); //Loginの画面表示用
  const [toggleInUp, setToggleInUp] = useState(true); // false = SignIn, true = SignUp

  const toggleModal = () => {
    setShowModal(!showConfigModal);
    
    if(!showConfigModal){//modalの状態でcross か barを変える
      setMenu('line_cross.png');
    }else{
      setMenu('line_menu.png');
    }

    setNo(false);
    setLogin(false);
    setToggleInUp(false);
  };

  const onNologin = () => {setNo(!showNo);};
  const toggleSign = () => {setLogin(!showLogin);};
  const toggleInUpFunc = () => {setToggleInUp(!toggleInUp)};

  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])
  
  const onSubmit = async () => {
    console.log('test')

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      throw error;
    }

    if(data){
      location.href = "/home";
    }
  }

  const tapStart = () => {
    (!session ? 
      (confirm("ゲストモードでプレイしますか？") ? onSubmit() : alert("右上のアイコンから新規登録かログインしてプレイしてね"))
      : location.href='/home'
    );
  }
  return (
    modelUrl && (
      <>
        <div className="App">
          <div className={"black"}></div>
          <section className={"home-wrap"}>
            <div className={showConfigModal ? "overlay-add" : "overlay"}>
              <Modal 
                setUserName={setUserName} 
                onNologin={onNologin}
                setLogin={setLogin}
                toggleSign={toggleSign}
                toggleInUpFunc={toggleInUpFunc}
                closeModal={toggleModal}
                info={{showConfigModal , showNo, showLogin, toggleInUp, username}}
              />
            </div>
            <div
              className="home-btn"
              onClick={toggleModal}
            >
              <img src={getImage(menuBar)} alt="" />
            </div>
            <div className="logo-wrap" onClick={tapStart}>
              <img className="logo-img" src={getImage('logo.png')} alt="" />
            </div>
            <div className="home-text-wrap" onClick={tapStart}>
              <p className="home-text">~タップして始める~</p>
            </div>
          </section>
        </div>
        {/* <Keikoku /> */}
      </>
    )
  );
}

export default App;
