import { useState, type ReactNode } from "react"

const A = "/assets/"

type MovieCatalogItem = {
  image: string
  title: string
  meta: string
  genre: string
  year: string
  score: string
}

type MoviesPageProps = {
  catalog: MovieCatalogItem[]
  footer: ReactNode
}

export default function MoviesPage({ catalog, footer }: MoviesPageProps) {
  const [genre, setGenre] = useState("전체")
  const [query, setQuery] = useState(
    () => new URLSearchParams(window.location.search).get("q") ?? "",
  )
  const [sort, setSort] = useState("추천순")
  const genres = ["전체", "드라마", "애니메이션", "액션", "코미디", "스릴러", "로맨스"]
  const visibleMovies = catalog
    .filter((movie) => genre === "전체" || movie.genre === genre)
    .filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => {
      if (sort === "평점순") return Number(b.score) - Number(a.score)
      if (sort === "최신순") return Number(b.year) - Number(a.year)
      return 0
    })

  return (
    <main className="movies-page">
      <section className="movies-heading">
        <div>
          <p>EXPLORE CINEMA</p>
          <h1>영화</h1>
          <span>보고 싶은 영화를 한눈에 확인하세요</span>
        </div>
        <label>
          <img src={`${A}cea91.svg`} alt="" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="영화 제목 입력하시오"
            aria-label="영화 제목 검색"
          />
        </label>
      </section>
      <section className="movie-browser" aria-labelledby="movie-list-title">
        <div className="movie-browser-toolbar">
          <div className="movie-genres" aria-label="장르 필터">
            {genres.map((item) => (
              <button
                key={item}
                className={genre === item ? "selected" : ""}
                onClick={() => setGenre(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            aria-label="영화 정렬"
          >
            <option>추천순</option>
            <option>평점순</option>
            <option>최신순</option>
          </select>
        </div>
        <div className="movie-result-heading">
          <h2 id="movie-list-title">{genre === "전체" ? "전체 영화" : genre}</h2>
          <span>{visibleMovies.length}편</span>
        </div>
        {visibleMovies.length > 0 ? (
          <div className="movie-grid">
            {visibleMovies.map((movie) => (
              <article key={movie.title}>
                <div className="movie-grid-poster">
                  <img src={`${A}${movie.image}`} alt={`${movie.title} 포스터`} />
                  <button aria-label={`${movie.title} 찜하기`}>♡</button>
                  <span>★ {movie.score}</span>
                </div>
                <h3>{movie.title}</h3>
                <p>
                  {movie.year} · {movie.genre}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <div className="movie-empty">
            <h3>검색 결과가 없습니다.</h3>
            <p>다른 제목이나 장르로 다시 찾아보세요.</p>
          </div>
        )}
      </section>
      {footer}
    </main>
  )
}
