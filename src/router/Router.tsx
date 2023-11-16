import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Index from "../routes/index";
import Home from "../routes/home";
import Story from "../routes/story";
import Game_p from "../routes/game_prac";
import Game_t from "../routes/game_test";
import NotF from "../routes/404"; 
import RegForm from "../routes/RegForm";
import Result from "../routes/result";
import Test from "../routes/test";

export const Router: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/test" element={<Test />} />
      <Route path="/RegForm" element={<RegForm />} />
      <Route path="/home" element={<Home />} />
      <Route path="/story/:chapter?/:paragraph?" element={<Story />} />
      <Route path="/game/practice/:mode?/:grade?/:episode?" element={<Game_p />} />
      <Route path="/game/test/:mode?/:grade?" element={<Game_t />} />
      <Route path="/result" element={<Result />} />
      <Route path="*" element={<NotF />} />
    </Routes>
  )
}