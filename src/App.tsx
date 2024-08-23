import { FormEventHandler, useState } from "react";
import "./App.css";

function App() {
  const [date, setDate] = useState("");
  const [author, setAuthor] = useState("");
  const [sum, setSum] = useState(0);
  const [category, setCategory] = useState("");
  const [comment, setComment] = useState("");

  const [error, setError] = useState("");
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    console.log("passed");
    e.preventDefault();
    let err = "";
    if (date === "") err += "Пожалуйста выберите дату расхода\n";
    if (author === "") err += "Пожалуйста выберите автора расхода\n";
    if (sum === 0) err += "Пожалуйста выберите сумму расхода\n";
    if (category === "") err += "Пожалуйста выберите категорию расхода\n";
    if (comment === "") err += "Пожалуйста выберите категорию расхода\n";
    setError(err);

    if (err !== "") return;
    const body = JSON.stringify({ date, author, sum, category, comment });
    console.log(body);

    fetch("/api", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Дата: </label>
        <input
          id="date"
          type="date"
          onChange={(e) => setDate(e.currentTarget.value.toString())}
        />{" "}
        <br />
        <label htmlFor="author">Автор: </label>
        <input
          id="author"
          type="text"
          onChange={(e) => setAuthor(e.currentTarget.value)}
        />{" "}
        <br />
        <label htmlFor="sum">Сумма (тенге): </label>
        <input
          id="sum"
          type="number"
          onChange={(e) => setSum(Number(e.currentTarget.value))}
        />{" "}
        <br />
        <label htmlFor="category">Категория: </label>
        <select
          name=""
          id="category"
          onChange={(e) => setCategory(e.currentTarget.value)}
        >
          <option value="purchases">Покупки</option>
          <option value="taxes">Налоги</option>
          <option value="bills">Счета</option>
        </select>
        <label htmlFor="comment">Комментарий: </label>
        <textarea
          id="comment"
          onChange={(e) => setComment(e.currentTarget.value)}
        ></textarea>
        <button type="submit">Готово</button>
      </form>
      <div>{error}</div>
    </>
  );
}

export default App;
