import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Instruction from "../screens/Instruction";
import Quiz from "../screens/Quiz";
import Result from "../screens/Result";


export default function WebRouter() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Instruction />}></Route>
                    <Route path="Quiz" element={<Quiz />}></Route>
                    <Route path="Result" element={<Result />}></Route>
                </Routes>
            </Router>

        </>
    )
}

