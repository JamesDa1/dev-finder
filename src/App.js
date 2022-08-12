import "./App.css"
import { useState, useEffect } from "react"
import { Octokit } from "@octokit/core"
import axios from "axios"

const ACCESS_TOKEN = "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"
const octokit = new Octokit({ auth: ACCESS_TOKEN })
const username = "JamesDa1"

function App() {
  const [query, setQuery] = useState("")
  const [data, setData] = useState({})

  const fetchData = async () => {
    const response = await octokit.request(`GET /users/{username}`, {
      username: username,
    })
    setData(response.data)
    console.log(data)
    console.log(typeof data.created_at, data.created_at)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="App">
      <header>
        <h1>devFinder</h1>
        <div className="modeToggle">
          <p>light</p>
          <p>Icon</p>
        </div>
      </header>
      <section className="searchField">
        <label htmlFor="search"></label>
        <input
          type="text"
          name=""
          id="search"
          placeholder="Search Github username"
          onChange={(e) => {
            setQuery(e.target.value)
          }}
        />
        <button
          className="btn"
          onClick={() => {
            console.log(query)
          }}
        >
          Search
        </button>
      </section>

      <section className="card">
        <div className="cardHeader">
          <div className="imgContainer">
            <img src={data.avatar_url} alt="avatar" />
          </div>
          <div className="userInfo">
            <h3 className="userName">{data.login}</h3>
            <p>@TheRanger</p>
            <p>Joined 25 Jan 2011</p>
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
