import { useEffect, useState } from "react";
import { linkIcon, loader, tick, copy } from "../assets"
import { useLazyGetSummaryQuery } from "../services/article";

interface Article {
  url?: string;
  summary?: string;
}

const Lieutenant = () => {
  const [article, setArticle] = useState<Article>()
  const [allArticles, setAllArticles] = useState<Article[]>([])
  const [copied, setCopied] = useState("");

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (article === undefined) return;

    const existArticle = allArticles.find((a) => a.url === article.url)
    if (existArticle) return setArticle(existArticle)

    const data = await getSummary(article.url!).unwrap()
      if (data.summary) {
        const newArticle = { ...article, summary: data.summary }
        const updatedArticles = [newArticle, ...allArticles]
        setArticle(newArticle)
        setAllArticles(updatedArticles)
        localStorage.setItem("articles", JSON.stringify(updatedArticles));
      }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(e)
    }
  }

  const handleCopy = (url: string) => {
    setCopied(url)
    navigator.clipboard.writeText(url)
    setTimeout(() => setCopied(""), 5000);
  }

  useEffect(() => {
    try {
      const storedArticlesInLocal = JSON.parse(
        localStorage.getItem("articles") ?? ""
      );
      setAllArticles(storedArticlesInLocal)
    } catch (e) {
      console.log("Parsing error:", e)
    }
  },[])

  return (
    <section className="w-full mt-16 max-w-xl">
      <div className="flex flex-col gap-2 w-full">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img src={linkIcon} alt='link_icon' className="absolute left-0 my-2 ml-3 w-5" />
          <input
            type="url"
            required 
            placeholder="Paste the article link"
            className="url_input peer"
            value={article?.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            onKeyDown={handleKeyDown}
          ></input>
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            <p>⮐</p>
          </button>
        </form>
        <div>
          <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
            {allArticles.reverse().map((item, index) => (
              <div
                key={`link-${index}`}
                onClick={() => setArticle(item)}
                className="link_card"
              >
                <div className="copy_btn" onClick={() => handleCopy(item.url!)}>
                  <img 
                    src={copied === item.url ? tick : copy} 
                    alt={copied === item.url ? "tick_icon" : "copy_icon"} 
                    className='w-[40%] h-[40%] object-contain'
                  />
                </div>
                <p className="flex-1 font-erode text-blue-700 font-medium text-sm truncate">{item.url}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex my-10 max-w-full justify-center items-center">
        {isFetching ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
        ) : error ? (
          <p className="font-erode font-normal text-gray-700">
            Well, that wasn't supposed to happen...
          </p>
        ):(
          article?.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-erode font-extrabold text-gray-800 text-xl">Article <span className="blue_gradient">Summary</span></h2>
              <div className="summary_box">
                <p className="font-erode font-bold text-lg text-gray-700">{article.summary}</p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  )
}

export default Lieutenant
