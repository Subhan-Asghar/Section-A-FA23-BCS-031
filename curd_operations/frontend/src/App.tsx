import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import DBnosql  from "./pages/nosql/DBnosql";
import NoCreate from "./pages/nosql/NoCreate";
import NoUpdate from "./pages/nosql/NoUpdate"
import DBsql from "./pages/sql/DBsql";
import SqlCreate from "./pages/sql/SqlCreate";
import SqlUpdate from "./pages/sql/SqlUpdate";
import DBsqlite from "./pages/sqlite/DBsqlite";
import LiteCreate from "./pages/sqlite/LiteCreate";
import LiteUpdate from "./pages/sqlite/LiteUpdate";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nosql" element={<DBnosql />} />
        <Route path="/nosql/create" element={<NoCreate />} />
        <Route path="/nosql/update/:id" element={<NoUpdate />} />
        <Route path="/sql" element={<DBsql />} />
        <Route path="/sql/update/:id" element={<SqlUpdate />} />
        <Route path="/sql/create" element={<SqlCreate />} />
        <Route path="/sqlite" element={<DBsqlite />} />
        <Route path="/sqlite/create" element={<LiteCreate />} />
        <Route path="/sqlite/update/:id" element={<LiteUpdate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;