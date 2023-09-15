// import { application } from 'express';
import {useState} from 'react'


function CreateWordlist() {
  
  const [csvFile, setCsvFile] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  
  // const handleFileSubmit = () => {
  //   setCsvFile(e.target.files[0]);
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('desc', desc);
    formData.append('csvFile', csvFile);

    try {
      const response = await fetch('http://localhost:3000/api/wordlist/', {
        method: 'POST',
        body: formData,
      })
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // console.log(response.json());
        alert("Wordlist successfully created.");
      } else {
        console.error('Response not OK:', response.statusText);
      }
    } catch (err) {
      console.error("Fail to fetch in api/wordlist: ", err);
    }
  };

  return (
   
    <div>
        <form onSubmit = {handleSubmit} action="">
            <div>
                <label htmlFor = "name">Name:</label>
                <input type="text" name="name" id="name" value = {name} onChange = {(e) => setName(e.target.value)} required/>
            </div>

            <div>
                <label htmlFor="csvFile">Upload CSV file:</label>
                <input 
                  type="file" 
                  id = "csvFile" 
                  name = "csvFile" 
                  accept = ".csv" 
                  onChange = {(e) => setCsvFile(e.target.files[0])} required/>
            </div>

            <div>
                <label htmlFor="desc">Description:</label>
                <textarea 
                  id = "desc" 
                  name = "desc" 
                  rows = "4" 
                  value={desc}
                  onChange = {(e) => setDesc(e.target.value)} />
            </div>

            <button type='submit'>Submit</button>
           
        </form>
    </div>
  )
}

export default CreateWordlist