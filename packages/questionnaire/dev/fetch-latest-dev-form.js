const axios = require('axios').default
const fs = require('fs')

const endpoint = 'https://editools-gql-prod-4g6paft7cq-de.a.run.app/api/graphql'
const query = `
query {
  form(where: {id: 2}) {
    id
    name
    slug
    type
    active
    content
    heroImage {
      resized {
        w480 w800 w1200 w1600 w2400 original
      }
    }
    mobileImage  {
      resized {
        w480 w800 w1200 w1600 w2400 original
      }
    }
    updateTime
    answers {
      id
      name
      content
      heroImage {
        resized {
          w480 w800 w1200 w1600 w2400 original
        }
      }
      mobileImage {
        resized {
          w480 w800 w1200 w1600 w2400 original
        }
      }
    }
    fields {
      id
      name
      type
      status
      sortOrder
      options {
        id
        name
        sortOrder
        value
      }
    }
    conditions {
      id
      type
      order
      condition {
        id
        formField {
          id
          name
        }
        compare
        option {
          id
          name
          value
        }
      }
      answer {
        id
        name

      }
      next {
        id
        name
      }
      goOut
    }
  }
}
`

axios.post(endpoint, { query })
  .then((res) => {
    console.log(res?.data?.data?.form)
    fs.writeFileSync('./mock-data.json', JSON.stringify(res?.data?.data?.form, null , 2))
  })
  .catch((err) => {
    console.error(err.response.data.errors)
  })
