import "@scss/story.scss";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { StorySentence } from "../types/tables";
import { StoryType } from "../types/tables";
import { useParams } from "react-router-dom";

const story = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { chapter, paragraph } = useParams();
  const chp = Number(chapter);
  const TABLE_NAME = 'story';
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [stories, setStory] = useState<StorySentence >();// 初期状態を{}に変更
  const getImage = (filePath: string): string => {
    return new URL(`../assets/${filePath}`, import.meta.url).href;
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [clickCount, setClickCount] = useState(0);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [storyText, setStoryText] = useState<string>("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [storyTextIndex, setStoryTextIndex] = useState(0);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    async function fetchStories() {
      try {
        if(chapter && paragraph){
          const { data, error } = await supabase
            .from(TABLE_NAME)
            .select("sentence") // "*" はすべてのカラムを選択することを意味します
            .eq("chapter", chp)
            .eq("paragraph", paragraph);

        if (error) {
          console.error("データの取得に失敗しました", error);
        } else {
          console.log("データの取得に成功しました", data);
          setStory(data[0]);
        }
      } 
    }
    catch (error) {
        console.error("エラーが発生しました", error);
      }
    }
    fetchStories();
  }, []);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (stories && clickCount < stories.sentence?.start.length) {
      const currentStoryText = stories.sentence?.start[clickCount];
      const timer = setInterval(() => {
        if (storyText.length < stories.sentence?.start[clickCount].length) {
          setStoryText((prevText) => prevText + currentStoryText[storyTextIndex]);
          setStoryTextIndex((prevIndex) => prevIndex + 1);
        }
        if (storyTextIndex === currentStoryText.length) {
          clearInterval(timer);
        }
      }, 80);

      return () => {
        clearInterval(timer);
      };
    }
  }, [clickCount, storyTextIndex, stories]);

  const handleNextClick = () => {
    if (clickCount < (stories?.sentence?.start.length || 0) - 1) {
      setClickCount(clickCount + 1);
      setStoryText("");
      setStoryTextIndex(0);
    }
  };

  const storyAuto = () => {
    location.href = ""
  };

  const storyLog = () => {
    location.href = ""
  };

  const storySkip = () => {
    location.href = ""
  };

  return (
    <>
      {
        chapter == null || paragraph == null
          ? (location.href = "/404")
          : stories == null
            ? (<p>Loading...</p>)
            : (
              Object.keys(stories).length === 0 ? (
                <p>受信に問題が発生した</p>
              )
                : (
                  <>
                    <div className="App">
                      <div>
                        <button onClick={storyAuto}>AUTO</button>
                        <button onClick={storyLog}>LOG</button>
                        <button onClick={storySkip}>SKIP</button>
                      </div>

                      <div>
                        <img src={getImage('egao.png')} alt="" />
                        <div className="sentenceArea" onClick={handleNextClick}>
                          {<h3>{storyText}</h3>}
                        </div>
                      </div>
                    </div>
                  </>
                )
            )
      }
    </>
  );
}

export default story;