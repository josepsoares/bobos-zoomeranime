import React, { useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'
import { ApiContext } from '../contexts/ApiContext'
import contentMovies from '../assets/content/contentMovies'
import contentTvseries from '../assets/content/contentTvseries'

const InfiniteList = props => {
  const { getItemSpecificInfo } = useContext(ApiContext)
  const { title, items, location } = props
  const arrayContent = title === 'movies' ? contentMovies : contentTvseries
  const action =
    title === 'movies' ? 'movieSpecificItem' : 'tvserieSpecificItem'
  const startLink = location.includes('movies') ? '/movies/' : '/tvseries/'

  return (
    <Grid container>
      <h1 className="mb-4">{title}</h1>
      <Grid container justify="center" spacing={2}>
        {items.map((specificItem, index) => (
          <Link
            key={index}
            to={`${startLink + arrayContent[index].link}`}
            className="p-0 d-flex align-items-center justify-content-center"
            onClick={() => {
              getItemSpecificInfo(action, specificItem.title.romaji)
            }}
          >
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <div
                className="w-100 p-0 overlay colour"
                style={{
                  backgroundImage: `url(${specificItem.coverImage.large})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover'
                }}
              >
                <aside className="p-1 title-overlay title-overlay-list">
                  <h3>{arrayContent[index].name}</h3>
                </aside>
              </div>
            </Grid>
          </Link>
        ))}
      </Grid>
    </Grid>
  )
}

export default InfiniteList
