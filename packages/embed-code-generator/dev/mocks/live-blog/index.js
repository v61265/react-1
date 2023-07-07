import data from './ukraine-war.json'

export default {
  initialLiveblog: data,
  fetchLiveblogUrl:
    'https://editools-gcs-dev.readr.tw/files/liveblogs/ukraine-war.json',
  fetchImageBaseUrl: 'https://editools-gcs-dev.readr.tw',
  toLoadPeriodically: false,
}
