import React from "react";
import config from "../config.json";
import styled from "styled-components";

import { CSSReset } from '../src/components/CSSReset'
import Menu  from '../src/components/Menu'
import { StyledTimeline }  from "../src/components/Timeline";

function HomePage() {
  const [valorDoFiltro, setValorDoFiltro] = React.useState("");

  return (
    <>
      <CSSReset/>
      <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1
            }}>
        <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
        <Header banner={config.banner}/>
        <Timeline searchValue={valorDoFiltro} playlists={config.playlists} />
        <Favorites favorites={config.favorites} />
      </div>
    </>
  );
}

export default HomePage;

const StyledHeader = styled.div`
  background-color: ${({theme}) => theme.backgroundLevel1 || "#f0f0f0" };
  .user-info {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
  }
`;
const StyledBanner = styled.div`
  height: 230px;
  background-image: url(${({bg}) => bg});
  background-position: center;
`;

function Header() {
  return (
    <StyledHeader>
      <div>
        <StyledBanner bg={config.banner}/>
        <section className="user-info">
          <img src={`https://github.com/${config.github}.png`} />
          <div>
            <h2>{config.name}</h2>
            <p>{config.job}</p>
          </div>
        </section>
      </div>
    </StyledHeader>
  );
}

function Timeline({searchValue, ...props}) {
  const playlistNames = Object.keys(props.playlists);

  return (
      <StyledTimeline>
        <h1>Playlists</h1>
        {playlistNames.map((playlistName) => {
          const videos = props.playlists[playlistName];
          return (
            <section key={playlistName}>
              <h2>{playlistName}</h2>
              <div className="playlist-section">
                {
                  videos.filter((video) => {
                    const titleNormalized = video.title.toLowerCase();
                    const searchValueNormalized = searchValue.toLowerCase();

                    return titleNormalized.includes(searchValueNormalized)
                  }).map((video) => {
                  return (
                    <a href={video.url} key={video.url} >
                      <img src={video.thumb} />
                      <span>{video.title}</span>
                    </a>
                  );
                })}
              </div>
            </section>
          );
        })}
      </StyledTimeline>
  );
}


const StyledFavorites = styled.div`
  section{
    padding: 16px;
    .favorites-section{
      display: flex;
      align-items: center;
      padding: 16px;
      width: 100%;
      gap: 16px;
      a{
        img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display:block;
          margin:auto;
        }
        span {
          margin: auto;
          padding-top: 8px; 
          display: block;
          color: ${({ theme }) => theme.textColorBase || "#222222"}
        }
      }
    }
  }
`;

function Favorites(props) {
  return (
    <StyledFavorites>
      <section>
        <h1>Favorites</h1>
        <div className="favorites-section">
          {
            props.favorites.map((favorite) => {
              return(
                <a href={favorite.url} key={favorite.name} >
                  <img src={favorite.thumbnail} />
                  <span>{favorite.name}</span>
                </a>
              )
            })
          }
        </div>
      </section>
    </StyledFavorites>
  );
}
