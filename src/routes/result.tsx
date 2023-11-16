import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Result = () => {
    const Navigate = useNavigate();
    const jg = useLocation().state.type;
    const gamemode = useLocation().state.gamemode;
    const mode = useLocation().state.result.mode;
    const grade = useLocation().state.result.grade;
    const episode = useLocation().state.result.episode;
    // const score = useLocation().state.score;
    var score = 0;
    var returnBody;
    //取得経験値の計算 and ランクの計算

    const replayBtn = () => {
        //再挑戦ボタンを押したときの処理
        if(mode && grade && episode){
            Navigate(`/game/${gamemode}/${mode}/${grade}/${episode}`);
        }else if(mode && grade){
            Navigate(`/game/${gamemode}/${mode}/${grade}`);
        }
    }
     
    jg ? (
         returnBody = ( 
                <div className="Result">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2 }}
                    >
                        <h1>Result</h1>
                    </motion.div>
                </div>            
        )
    ) : (
        returnBody = (
            <div className="Result">
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
                >   
                    <h1>GameOver!</h1>
                    <div>
                        <h3>Mode: {mode}</h3>
                        <h3>Score: {score}</h3>
                    </div>
                    <div className="reBtn">
                        <button className="replayBtn" onClick={replayBtn}>
                            再挑戦！
                        </button>
                        <button className="toHome">
                            諦めて戻る
                        </button>
                    </div>
                </motion.div>
            </div>
        )
    );

    return returnBody;
}

export default Result;