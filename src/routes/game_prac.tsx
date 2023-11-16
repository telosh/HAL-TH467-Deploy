import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { supabase } from "../supabaseClient";   
import "@scss/mozi.scss";
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom'
import { QuizClassType, QuizRankType } from '../types/tables'
import CanComp from "../components/game/canvas";

interface Quiz {
  question: string | null;
  answer: string | null;
  choices: string[] | null;
}

//ゲームプレイ画面
const Game = () => {
  const Navigate = useNavigate();
  const { search } = useLocation();
  const {mode, grade, episode} = useParams();
  //['ゲームが終わっているか','クリア=> true, 失敗=> false']
  const [gameStatus, setGameStatus] = useState<boolean[]>([false, false]);
  const getImage = (filePath: string): string => {return new URL(`../assets/${filePath}`, import.meta.url).href;};

  // quiz関連 --------------------------------------
  const question = [...Array(10).keys()];
  const [nowNum, setNowNum] = useState<number>(0);
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [showChoice, setShowChoice] = useState<boolean>(false);
  const [quizNow, setQuizNow] = useState<Quiz>({
    question: "",
    answer: "答え",
    choices: ["", "", ""],
  });
  const [quizChoice, setChoice] = useState<string[]>([]);

  const [lifeNow, setLifeNow] = useState<number>(3);
  if(mode == "rank"){
    console.log(mode);
    const [quizRank, setQuizRank] = useState<QuizRankType[] | null>(null);
    useEffect(() => {
      const fetchQuiz = async () => {
        if(grade != null && episode != null){
          const { data, error } = await supabase.from('quiz_rank').select('*').eq('rank', grade).eq('episodes', episode);
          if (error) {
            Navigate('/404');
            return;
          }
      
          if (data) {
            let selected = data.slice().sort(function () { return Math.random() - 0.5; }).slice(0, 10);
            setQuizRank(selected);
          }
        }
      }
      fetchQuiz(); // 非同期関数を実行
    }, [])

    useEffect(() => {
      if(quizRank){
        var tmpChoice = quizChoice.slice(0,6);
        tmpChoice = tmpChoice.map(element => element.replace(/[ 　\n]/g, ""));
        setQuizNow({
          question: quizRank[nowNum].problem,
          answer: quizRank[nowNum].write,
          choices: tmpChoice,
        })
        setShowChoice(true);
      }
      
  
    }, [quizChoice])

    useEffect(() => {
      quizRank !== null? 
      (
        setQuizNow({
          question: quizRank[nowNum].problem,
          answer: quizRank[nowNum].write,
          choices: [],
        }),
        setShowQuiz(true),
        setShowChoice(true)
      ):null;
    }, [quizRank, nowNum])
  }else{
    const [quizClass, setQuizClass] = useState<QuizClassType[] | null>(null);
    useEffect(() => {
      const fetchQuiz = async () => {
        if(grade != null && episode != null){
          const { data, error } = await supabase.from('quiz_class').select('*').eq('class', grade).eq('episodes', episode);
          if (error) {Navigate('/404');console.log(error);return;}
          if (data) {let selected = data.slice().sort(function () { return Math.random() - 0.5; }).slice(0, 10);setQuizClass(selected);}
        }
      }
      fetchQuiz(); // 非同期関数を実行
    }, [])

    useEffect(() => {
      if(quizClass){
        var tmpChoice = quizChoice.slice(0,6);
        tmpChoice = tmpChoice.map(element => element.replace(/[ 　\n]/g, ""));
        setQuizNow({
          question: quizClass[nowNum].problem,
          answer: quizClass[nowNum].write,
          choices: tmpChoice
        })
        setShowChoice(true);
      }
    }, [quizChoice])

    useEffect(() => {
      quizClass !== null
      ? 
      (
        setQuizNow({
          question: quizClass[nowNum].problem,
          answer: quizClass[nowNum].write,
          choices: [],
        }),
        setShowQuiz(true),
        setShowChoice(true)
      )
      : null;
    }, [quizClass, nowNum])
  }
 
  const clearChildCanvas = () => {
    if (childCanvasRef.current && childCanvasRef.current.clearCanvas) {
      childCanvasRef.current.clearCanvas();
      setShowChoice(false);}
    };
  
  
  // canvas関連 --------------------------------------
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [showCanvasText, setShowCanvasText] = useState<boolean>(false);
  const toggleCanvasText = () => {
    console.log(showCanvasText);
    setShowCanvasText(!showCanvasText);
  };
  const childCanvasRef = useRef(null);

  const recognizeChildCanvas = () => {
    if (childCanvasRef.current && childCanvasRef.current.recognize) {
      childCanvasRef.current.recognize();
    }
  };

   const HandingSaveImg = async() => {
    let canvas = canvasRef.current;
    if (!canvas) return;
    let base64 = canvas.toDataURL("image/png");
    //Download
    // ダウンロード用のリンクを作成
    const downloadLink = document.createElement('a');
          downloadLink.href = base64;
          downloadLink.download = 'image.png'; // ファイル名を指定
          // リンクをクリックしてダウンロードを開始
          downloadLink.click();
  }

  // 正誤判定 --------------------------------------
  const jg = (e : any) => {
    if (quizNow.answer, quizNow.choices) {
      const dataV = e.target.closest('[data-v]')?.getAttribute('data-v');
      
      if (dataV !== null && quizNow.answer && quizNow.choices) {
        console.log(dataV);
    
        if (quizNow.answer === quizNow.choices[Number(dataV)]) {
          setNowNum(nowNum + 1);
          clearChildCanvas();
        } else {
          setLifeNow(lifeNow - 1);
          clearChildCanvas();
        }
      }
    };    
  }
  
  useEffect(() => {//問題が10問終わったらクリア
    if(nowNum == 1){//クリア
      //showClearModalの表示
      setGameStatus([true, true]);
      setTimeout(() => {
        Navigate('/result' ,
          { state: 
            { 
              gamemode: "test",
              type: true, 
              result : {
                mode : mode,
                grade : grade,
                clearNum: nowNum,
              }
            },
          }); 
        }, 4000);
    }
  }, [nowNum]);

  return (
      <>
      <div className="App">
      <div className="mozi-wrap">
        <div className="num-wrap">
          {question.map((v, i) => {
            return (
              <div className={i < nowNum ? "num num-add" : "num"} key={v}>
                {i + 1}
              </div>
            );
          })}
        </div>
        <div className={gameStatus[0] ? "end-black end-black-add" : "end-black"}>
          {gameStatus[1] ? (
            <div className="clear-area">
              <div className="clear-add">
                <h2>CLEAR</h2>
              </div>
            </div>
            ) : null}
        </div>

        {/* ランダムに取得した問題を出す */}
        { showQuiz ? (
          <div className="q-wrap">
              <h2 className="q">
                  {quizNow.question}
              </h2>
          </div>
          ) : null
        }

        { showChoice ? (
          <div className="result-box">
            <div className="result-wrap">
              { quizNow.choices !== null ?
                  quizNow.choices.map((v, i) => {
                    if(i == 0){
                      return (
                        <div 
                          className="result-push" 
                          onClick={jg}
                          key={v}
                          >
                          <div className={"result add"}
                            style={{ 
                              fontSize: `4.2rem`,
                              textAlign: "center",
                            }}
                            >
                            <p data-v={i}>{v}</p>
                          </div>
                        </div>
                      );
                    }else{
                      return (
                        <div className="result-push" onClick={jg} key={v} >
                          <div className={"result add"}
                            style={{ 
                              fontSize: `4.2rem`,
                              textAlign: "center",
                            }}
                            >
                            <p data-v={i}>{v}</p>
                          </div>
                        </div>
                      );
                    }
                  })
                : null
              }
              </div>
          </div>
          ) : null
        }

        <div style={{ display: "inline-block" }}>
          <div
            className={"mozi-canvas-wrap canvas-add"}
          >
            <CanComp 
              ref={childCanvasRef} 
              quizNow={quizNow} 
              ansShow={showCanvasText}
              setChoice={setChoice}
              />
            
          </div>
          <br />
          <button className="erase-btn" onClick={clearChildCanvas}>
            <img src={getImage('kesi.png')} alt="" />
          </button>

          <div className="life-wrap">
            <img src={getImage('heart.png')} alt="" />
            <h2>{lifeNow}</h2>
          </div>

          <button className="ans-wrap" onClick={ toggleCanvasText }>
            <img src={getImage('scope.png')} alt="" />
          </button>
        </div>  
      </div>
    </div>
  </>
  );
};

export default Game;

 {/* <button className="save-btn" onClick={recognizeChildCanvas}><img src={getImage('tp.png')} alt="" /></button> */}