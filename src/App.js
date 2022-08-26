// import "./App.css"
import "./styles.css"
import { useState, useEffect } from "react"
import { Octokit } from "@octokit/core"

const ACCESS_TOKEN = process.env.REACT_APP_MT_API_KEY
const octokit = new Octokit({ auth: ACCESS_TOKEN })

function App() {
  const [query, setQuery] = useState("")
  const [data, setData] = useState({})

  const fetchData = async (query) => {
    const username = query || "Jamesda1"
    const response = await octokit.request(`GET /users/{username}`, {
      username: username,
    })

    const dateYear = response.data.created_at.substring(0, 4)
    const dateMonth = response.data.created_at.substring(5, 7)
    const dateDay = response.data.created_at.substring(8, 10)
    const newDate = `${dateDay}/${dateMonth}/${dateYear}`
    setData({ ...response.data, created_at: newDate })
  }

  useEffect(() => {
    fetchData()
    // console.log(data)
  }, [])

  return (
    <div className="App">
      <header>
        <h1>devFinder</h1>
      </header>
      <section className="searchField">
        <label htmlFor="search"></label>
        <input
          type="text"
          name=""
          id="search"
          placeholder="Github user"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchData(query)
            }
          }}
          onChange={(e) => {
            setQuery(e.target.value)
          }}
        />
        <button
          className="btn"
          onClick={() => {
            fetchData(query)
          }}
        >
          Search
        </button>
      </section>

      <section
        className="card"
        onClick={() => {
          window.open(data.html_url, "_blank")
        }}
      >
        <div className="cardHeader">
          <div className="imgContainer">
            <img src={data.avatar_url} alt="avatar" />
          </div>
          <div className="userInfo">
            <h3 className="userName">{data.login}</h3>
            <p>@{data.login}</p>
            <p>Joined {data.created_at}</p>
          </div>
        </div>
        <p className="userGreeting">
          {data.bio ? data.bio : "User has no bio"}
        </p>
        <div className="stats">
          <div className="stat">
            <h4>Repos</h4>
            <p>{data.public_repos}</p>
          </div>

          <div className="stat">
            <h4>Followers</h4>
            <p>{data.followers}</p>
          </div>

          <div className="stat">
            <h4>Following</h4>
            <p>{data.following}</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
