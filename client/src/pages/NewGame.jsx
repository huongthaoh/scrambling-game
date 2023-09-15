function NewGame() {
    const postWordlist = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/wordlist/6503cc2e11a2410e548faa12");
            const data = await response.json();
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }

    const getWord = async () => {
        try {
            // await postWordlist();
            const response = await fetch("http://localhost:3000/api/word/getWord/");
            const data = await response.json();
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }

  return (
    <div>
        <button onClick = {postWordlist}>POST A WORDLIST</button>
        <p></p>
        <button onClick = {getWord}>RETRIEVE A WORD</button>
    </div>
  )
}

export default NewGame