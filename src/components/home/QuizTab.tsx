import { useState, useEffect } from "react"
import { supabase } from "../../supabaseClient";
import { useNavigate } from 'react-router-dom';
import { QuizClassEpi, QuizRankEpi } from "../../types/tables";

const QuizTab = () => {

  type EpisodeData = QuizRankEpi & QuizClassEpi

  const [classLevel, setClassLevel] = useState<String>("")
  const [rankLevel, setRankLevel] = useState<String>("")
  const [TABLE_NAME, setTABLE_NAME] = useState("")
  const [quizClass, setQuizClass] = useState<EpisodeData[]>([]);
  const [grade, setGrade] = useState<string | null>(null);
  const grades: { name: string; rank: string }[] = [
    { name: "初級", rank: 'low' },
    { name: "中級", rank: 'mediam' },
    { name: "上級", rank: 'high' },
    { name: "五級", rank: 'g5' },
    { name: "四級", rank: 'g4' },
    { name: "三級", rank: 'g3' },
    { name: "準二級", rank: 'gp2' },
    { name: "二級", rank: 'g2' },
    { name: "準一級", rank: 'gp1' },
  ];
  const navigate = useNavigate();
  const selectDifficulty = (rank: string , value:string) => {
    setGrade(value);
    console.log(rank)
    if(value == 'class'){
      setClassLevel(rank)
      setTABLE_NAME('quiz_class_epi')
    }else{
      setRankLevel(rank)
      setTABLE_NAME('quiz_rank_epi')
    }
  };
  const gameButton = (episodes: number | null, quizclass: string | null, grade: string | null) => {
    //console.log(episodes, quizclass)
    navigate(`/game/practice/${grade}/${quizclass}/${episodes}`);
  };

  useEffect(() => {
    async function fetchCategory() {
      try {
        const { data, error } = await supabase
          .from(TABLE_NAME)
          .select(TABLE_NAME === 'quiz_class_epi' ? "episodes, class" : "episodes, rank")
          .eq(TABLE_NAME === 'quiz_class_epi' ? 'class' : 'rank', TABLE_NAME === 'quiz_class_epi' ? classLevel : rankLevel);
        if (error) {
          console.error("データの取得に失敗しました", error);
        } else {
          console.log("データの取得に成功しました", data);
          setQuizClass(data as EpisodeData[]);
        }
      } catch (error) {
        console.error("エラーが発生しました", error);
      }
    }
    fetchCategory();
  }, [classLevel,rankLevel])
  
  const getButtonLabel = (stage: EpisodeData) => {
    const matchingClass = grades.find((grade) => grade.rank === stage.class);
    const matchingRank = grades.find((grade) => grade.rank === stage.rank);

    if (matchingClass) {
      return `${matchingClass.name}:その${stage.episodes}`;
    } else if (matchingRank) {
      return `${matchingRank.name}:その${stage.episodes}`;
    } else {
      return `${stage.episodes}`;
    }
  };

  return (
    <div>
      {(!classLevel && !rankLevel) ? (
        <div>
          <div>
            <p>読めるけど読めない漢字</p>
            <div>
              {grades.slice(0,3).map((grade, index) => (
                <button key={index} onClick={() => selectDifficulty(grade.rank, 'class')}>
                  {grade.name}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p>日本語漢字能力検定（漢検）編</p>
            <div>
              {grades.slice(3).map((grade, index) => (
                <button key={index} onClick={() => selectDifficulty(grade.rank, 'rank')}>
                  {grade.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          {Array.isArray(quizClass) && quizClass.map((stage, index) => (
            <button key={index} onClick={() => gameButton(stage.episodes, grade === 'class' ? stage.class : stage.rank , grade)}>
              {getButtonLabel(stage)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
export default QuizTab;