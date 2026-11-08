import { useEffect, useRef, useState } from "react"
import MoviesPage from "./MoviesPage"

const A = "/movie/assets/"

const movies = [
  { image: "a5765.png", title: "룩백", meta: "드라마 · 100분" },
  {
    image: "bccba.png",
    title: "극장판 치이카와: 인어 섬의 비밀",
    meta: "작은 친구들의 커다란 모험",
  },
  {
    image: "98a3e.png",
    title: "트레인스포팅",
    meta: "다시 만나는 스크린의 명작",
  },
  { image: "0bd75.png", title: "스틸레이", meta: "새롭게 발견하는 이야기" },
  {
    image: "ef813.png",
    title: "[2026 NT Live] 골든 보이",
    meta: "스크린으로 만나는 무대",
  },
  { image: "9a569.png", title: "레위기", meta: "취향을 넓히는 한 편" },
]

const upcoming = [
  {
    image: "3293d.png",
    title: "수능, 출제의 비밀",
    meta: "2026.10.28 개봉 · 코미디 · 99분",
  },
  {
    image: "f7076.png",
    title: "하트 오브 비스트",
    meta: "2026.10.28 개봉 · 액션·어드벤처 · 101분",
  },
  { image: "db2d0.png", title: "쿵푸 허슬", meta: "2026.10.28 개봉" },
  { image: "f105b.png", title: "이성과 감성", meta: "2026.10.28 개봉" },
]

function Brand({ onHome }: { onHome?: () => void }) {
  return (
    <a
      className="brand"
      href="/"
      onClick={(event) => {
        if (!onHome) return
        event.preventDefault()
        onHome()
      }}
    >
      <i />
      CINEROOM
    </a>
  )
}

function Header({
  page = "home",
  onNavigate,
  onSearch,
}: {
  page?: "home" | "movies"
  onNavigate?: (page: "home" | "movies") => void
  onSearch?: (query: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = (nextPage: "home" | "movies") => {
    setOpen(false)
    onNavigate?.(nextPage)
  }
  return (
    <header className="header">
      <div className="header-inner">
        <Brand onHome={() => navigate("home")} />
        <nav aria-label="주요 메뉴" className={open ? "nav open" : "nav"}>
          <a
            className={page === "home" ? "active" : ""}
            href="/"
            style={{ position: "relative" }}
            onClick={(event) => {
              event.preventDefault()
              navigate("home")
            }}
          >
            홈
          </a>
          <a
            className={page === "movies" ? "active" : ""}
            href="/movies"
            onClick={(event) => {
              event.preventDefault()
              navigate("movies")
            }}
          >
            영화
          </a>
          <a href="#curation">컬렉션</a>
          <span>
            매거진 <small>준비 중</small>
          </span>
        </nav>
        <div className="header-actions">
          <button aria-label="검색" onClick={() => setSearchOpen(true)}>
            <img src={`${A}cea91.svg`} alt="" />
          </button>
          <button
            className="menu-button"
            aria-expanded={open}
            aria-label="메뉴 열기"
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
            <span />
          </button>
          <span className="login">로그인</span>
        </div>
      </div>
      {searchOpen && (
        <div
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) setSearchOpen(false)
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            display: "grid",
            placeItems: "start center",
            padding: "15vh 20px 20px",
            background: "rgba(0,0,0,.65)",
          }}
        >
          <form
            role="dialog"
            aria-modal="true"
            aria-label="영화 검색"
            onSubmit={(event) => {
              event.preventDefault()
              const query = searchQuery.trim()
              if (!query) return
              setSearchOpen(false)
              onSearch?.(query)
            }}
            style={{
              width: "min(560px, 100%)",
              padding: 24,
              borderRadius: 16,
              background: "#151515",
              boxShadow: "0 20px 60px rgba(0,0,0,.4)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <strong>영화 검색</strong>
              <button type="button" aria-label="검색 팝업 닫기" onClick={() => setSearchOpen(false)}>×</button>
            </div>
            <label style={{ display: "flex", gap: 8 }}>
              <input
                autoFocus
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="영화 제목을 입력하세요"
                aria-label="영화 제목"
                style={{ flex: 1, minWidth: 0, padding: 12, borderRadius: 8 }}
              />
              <button type="submit">검색</button>
            </label>
          </form>
        </div>
      )}
    </header>
  )
}

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const heroImages = ["61be5.png", "3d30c.png", "d5d65.png", "3293d.png"]

  useEffect(() => {
    if (!isPlaying) return
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroImages.length)
    }, 5000)
    return () => window.clearInterval(timer)
  }, [isPlaying, heroImages.length])

  return (
    <section className="hero" id="top">
      <div
        className="hero-slides"
        style={{ transform: `translateX(-${activeSlide * 100}%)` }}
        aria-hidden="true"
      >
        {heroImages.map((image, index) => (
          <div
            className="hero-slide"
            key={image}
            style={{ backgroundImage: `url(${A}${image})` }}
            data-active={index === activeSlide}
          />
        ))}
      </div>
      <div className="hero-inner">
        <div className="hero-copy">
          <div className="eyebrow">
            <i />
            오늘의 추천 <span>CINEROOM SELECT</span>
          </div>
          <h1>룩백</h1>
          <h2>마음에 남은 순간을, 다시 돌아보다.</h2>
          <p className="meta">2026.10.08 개봉 · 드라마 · 100분</p>
          <p className="description">
            고레에다 히로카즈 감독의 실사 영화 〈룩백〉.
            <br />
            오늘은 오래 머무는 감정과 섬세한 시선을 만나보세요.
          </p>
          <div className="hero-actions">
            <a className="primary" href="#boxoffice">
              ▶ <span>&nbsp;예고편 보기</span>
            </a>
            <a className="secondary" href="#now">
              상세 보기
            </a>
            <button className="round" aria-label="찜하기">
              ♡
            </button>
          </div>
        </div>
        <figure className="hero-poster">
          <img src={`${A}a5765.png`} alt="영화 룩백 포스터" />
          <figcaption>극장에서 만나는 섬세한 시선</figcaption>
        </figure>
      </div>
      <div
        className="hero-progress"
        role="group"
        aria-label="히어로 배너 페이지"
      >
        <b>{String(activeSlide + 1).padStart(2, "0")}</b>
        {heroImages.map((image, index) => (
          <button
            className={index === activeSlide ? "active" : ""}
            key={image}
            type="button"
            aria-label={`${index + 1}번 배너 보기`}
            aria-current={index === activeSlide ? "true" : undefined}
            onClick={() => setActiveSlide(index)}
          >
            <i />
          </button>
        ))}
        <span>{String(heroImages.length).padStart(2, "0")}</span>
        <button
          className="play-toggle"
          type="button"
          aria-label={isPlaying ? "자동 슬라이드 정지" : "자동 슬라이드 재생"}
          aria-pressed={!isPlaying}
          onClick={() => setIsPlaying((current) => !current)}
        >
          {isPlaying ? "Ⅱ" : "▶"}
        </button>
      </div>
    </section>
  )
}

function Discovery() {
  const [selected, setSelected] = useState("전체")
  const chips = [
    "전체",
    "웃고 싶은 날",
    "울고 싶은 날",
    "긴장감",
    "따뜻한",
    "가볍게",
    "깊게 생각할",
    "90분 이하",
  ]
  return (
    <section className="discovery section">
      <div className="title-row">
        <h2>오늘은 어떤 영화가 끌리나요?</h2>
        <span>기분과 시간으로 빠르게 골라보세요</span>
      </div>
      <label className="search">
        <img src={`${A}cea91.svg`} alt="" />
        <input placeholder="영화, 감독, 배우 검색" aria-label="영화 검색" />
        <button>검색</button>
      </label>
      <div className="chips" aria-label="영화 필터">
        {chips.map((c) => (
          <button
            key={c}
            className={selected === c ? "selected" : ""}
            onClick={() => setSelected(c)}
          >
            {c}
          </button>
        ))}
      </div>
    </section>
  )
}

function SectionTitle({
  kicker,
  title,
  subtitle,
}: {
  kicker?: string
  title: string
  subtitle: string
}) {
  return (
    <div className="section-title">
      {kicker && <b>{kicker}</b>}
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <a href="#top">더 보기 ›</a>
    </div>
  )
}

function MovieCard({
  movie,
  rank,
}: {
  movie: typeof movies[number]
  rank?: number
}) {
  return (
    <article className="movie-card">
      <div className="poster">
        <img src={`${A}${movie.image}`} alt={`${movie.title} 포스터`} />
        {rank && <strong>{String(rank).padStart(2, "0")}</strong>}
        <button aria-label={`${movie.title} 찜하기`}>♡</button>
      </div>
      <h3>{movie.title}</h3>
      <p>{movie.meta}</p>
    </article>
  )
}

function MovieRail({
  ranked = false,
  swipeable = false,
}: {
  ranked?: boolean
  swipeable?: boolean
}) {
  const railRef = useRef<HTMLDivElement>(null)
  const dragStart = useRef({ x: 0, scrollLeft: 0 })
  const isDragging = useRef(false)
  const canDrag = ranked || swipeable

  return (
    <div
      ref={railRef}
      className={`rail${ranked ? " ranked-rail" : ""}${swipeable ? " swipe-rail" : ""}`}
      onPointerDown={(event) => {
        if (!canDrag || (event.target as HTMLElement).closest("button")) return
        isDragging.current = true
        dragStart.current = {
          x: event.clientX,
          scrollLeft: railRef.current?.scrollLeft ?? 0,
        }
        railRef.current?.setPointerCapture(event.pointerId)
      }}
      onPointerMove={(event) => {
        if (!canDrag || !isDragging.current || !railRef.current) return
        railRef.current.scrollLeft =
          dragStart.current.scrollLeft - (event.clientX - dragStart.current.x)
      }}
      onPointerUp={(event) => {
        if (!canDrag) return
        isDragging.current = false
        railRef.current?.releasePointerCapture(event.pointerId)
      }}
      onPointerCancel={() => {
        isDragging.current = false
      }}
    >
      {movies.map((movie, i) => (
        <MovieCard
          key={movie.title}
          movie={movie}
          rank={ranked ? i + 1 : undefined}
        />
      ))}
    </div>
  )
}

function Upcoming() {
  return (
    <section className="section upcoming">
      <SectionTitle
        kicker="COMING SOON"
        title="곧, 극장에서 만나요"
        subtitle="개봉 예정작 · 2026.10.26 기준"
      />
      <div className="upcoming-rail">
        {upcoming.map((item) => (
          <article key={item.title}>
            <div>
              <img src={`${A}${item.image}`} alt={`${item.title} 스틸컷`} />
              <b>D−2</b>
            </div>
            <h3>{item.title}</h3>
            <p>{item.meta}</p>
            <small>
              상세 보기 ↗ <span>알림 · 준비 중</span>
            </small>
          </article>
        ))}
      </div>
    </section>
  )
}

function Curation() {
  const items = [
    {
      image: "3d30c.png",
      kicker: "AFTER THE CREDITS",
      title: "엔딩 뒤에도 남는 마음",
      sub: "여운을 따라 고른 영화 · 룩백 외",
    },
    {
      image: "d5d65.png",
      kicker: "A LITTLE ESCAPE",
      title: "작은 모험, 커다란 행복",
      sub: "함께라서 더 좋은 애니메이션",
    },
    {
      image: "61be5.png",
      kicker: "ANOTHER POINT OF VIEW",
      title: "익숙한 세상을 뒤집는 웃음",
      sub: "일상을 새롭게 보는 코미디",
    },
  ]
  return (
    <section className="section curation" id="curation">
      <SectionTitle
        kicker="CURATED BY CINEROOM"
        title="취향을 넓히는 세 가지 시선"
        subtitle="에디터 큐레이션"
      />
      <div className="curation-grid">
        {items.map((x) => (
          <article
            key={x.title}
            style={{
              backgroundImage: `linear-gradient(0deg,#000 0%,transparent 70%),url(${A}${x.image})`,
            }}
          >
            <b>{x.kicker}</b>
            <h3>{x.title}</h3>
            <p>{x.sub}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function Footer() {
  return (
    <>
      <section className="newsletter">
        <div>
          <b>GET CINEROOM LETTER</b>
          <h2>좋은 영화는, 오래 이야기하고 싶으니까.</h2>
          <p>매주 새로운 영화 이야기를 보내드려요.</p>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            aria-label="이메일"
            placeholder="이메일 주소를 입력하세요"
          />
          <button>구독하기</button>
        </form>
      </section>
      <footer>
        <Brand />
        <div className="footer-links">
          <span>서비스 ＋</span>
          <span>고객센터 ＋</span>
          <span>이용약관 ＋</span>
          <span>개인정보처리방침 ＋</span>
        </div>
        <p>© CINEROOM. All rights reserved.</p>
      </footer>
    </>
  )
}

function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="모바일 메뉴">
      {[
        ["e6f62.svg", "홈"],
        ["cb202.svg", "영화"],
        ["c3b54.svg", "검색"],
        ["ee889.svg", "탐색"],
        ["12bb3.svg", "마이"],
      ].map(([icon, label], i) => (
        <a
          key={label}
          className={i === 0 ? "active" : ""}
          href={i === 0 ? "#top" : "#boxoffice"}
        >
          <img src={`${A}${icon}`} alt="" />
          <span>{label}</span>
        </a>
      ))}
    </nav>
  )
}

const movieCatalog = [
  ...movies.map((movie, index) => ({
    ...movie,
    genre: ["드라마", "애니메이션", "드라마", "스릴러", "공연", "미스터리"][index],
    year: ["2026", "2026", "1996", "2025", "2026", "2025"][index],
    score: ["9.1", "8.8", "8.6", "8.3", "9.0", "8.1"][index],
  })),
  ...upcoming.map((movie, index) => ({
    ...movie,
    genre: ["코미디", "액션", "코미디", "로맨스"][index],
    year: "2026",
    score: ["8.4", "8.7", "8.9", "8.5"][index],
  })),
]

export default function App() {
  const [page, setPage] = useState<"home" | "movies">(
    () => window.location.pathname === "/movies" ? "movies" : "home",
  )

  useEffect(() => {
    const syncPage = () => setPage(window.location.pathname === "/movies" ? "movies" : "home")
    window.addEventListener("popstate", syncPage)
    return () => window.removeEventListener("popstate", syncPage)
  }, [])

  const navigate = (nextPage: "home" | "movies", query = "") => {
    const path = nextPage === "movies"
      ? `/movies${query ? `?q=${encodeURIComponent(query)}` : ""}`
      : "/"
    window.history.pushState({}, "", path)
    setPage(nextPage)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="app">
      <Header page={page} onNavigate={navigate} onSearch={(query) => navigate("movies", query)} />
      {page === "movies" ? <MoviesPage catalog={movieCatalog} footer={<Footer />} /> : <main>
        <Hero />
        <Discovery />
        <section className="section" id="boxoffice">
          <SectionTitle
            kicker="BOX OFFICE"
            title="박스오피스 TOP 10"
            subtitle="일별 박스오피스 · 시안용 구성"
          />
          <MovieRail ranked />
          <p className="notice">
            시안용 순위·추천 구성 · 실제 순위와 다를 수 있습니다
          </p>
        </section>
        <section className="section recommend">
          <SectionTitle
            kicker="FOR YOU"
            title="나를 위한 추천"
            subtitle="많이 찜한 영화 · 로그인 전 둘러보는 추천"
          />
          <p className="recommend-note">
            ♡ 무엇을 볼지 고민이라면, 눈여겨볼 만한 영화들
          </p>
          <MovieRail swipeable />
        </section>
        <Upcoming />
        <Curation />
        <section className="section now" id="now">
          <SectionTitle
            kicker="YOUR NEXT MOVIE NIGHT"
            title="지금 볼 수 있는 영화"
            subtitle="영화를 고르고, 시청 경로를 확인하세요"
          />
          <MovieRail />
        </section>
        <Footer />
      </main>}
      {page === "home" && <BottomNav />}
    </div>
  )
}
