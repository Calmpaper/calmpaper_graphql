const fetch = require('node-fetch')
const PRERENDER_TOKEN = 'q5JyQikCsiyQrPGPXy5Z'

const prerender = async (resolve, root, args, context, info) => {
  const result = await resolve(root, args, context, info)

  // Book
  if (info.fieldName === 'createBook') {
    console.log('result')
    console.log(result)
    const body = {
      prerenderToken: PRERENDER_TOKEN,
      url: `http://ec2-34-224-154-199.compute-1.amazonaws.com/@${
        result.author.username || `user${result.author.id}`
      }/${result.slug}`,
    }

    const response = await fetch('https://api.prerender.io/recache', {
      method: 'post',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
    console.log(response)
    // const json = await response.json()
    // console.log(json)
  }

  // Chapter
  if (info.fieldName === 'createOneChapter') {
    // const userId = getUserId(context)
    // const userFeed = getStreamClient.feed('user', userId)
    // userFeed.addActivity({
    //   actor: getStreamClient.user(userId),
    //   to: [`book:${result.bookId}`],
    //   verb: 'add',
    //   object: `chapter:${result.id}`,
    //   bookId: result.bookId,
    //   chapterId: result.id,
    //   userId,
    // })
  }

  return result
}

module.exports = {
  prerender,
}
