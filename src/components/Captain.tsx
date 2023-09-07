import { logo } from "../assets"

const Captain = () => {
  return (
    <header className="flex flex-col w-full justify-center items-center">
      <nav className="flex justify-between items-center w-full pt-2 mb-10">
        <img src={logo} alt="logo" className="w-28" />
        <button
          className="black_btn"
          onClick={() => window.open("https://github.com/Robert-CPX/ai_summarize","_blank")}
        >
          GitHub
        </button>
      </nav>
      <h1 className="head_text">
        Summarize Articles with <br className='max-md:hidden' />
        <span className="orange_gradient">OpenAI GPT-4</span>
      </h1>
      <h2 className="desc">Simplify your reading with Summize, an open-source article summarizer that transforms lengthy articles into clear and concise summaries</h2>
    </header>
  )
}

export default Captain