export function getQueryParams () {
  let qs = location.search.substring(1).split('+').join(' ')

  let params = {}

  qs.split('&').forEach((part) => {
    let kvp = part.split('=')
    params[decodeURIComponent(kvp[0])] = decodeURIComponent(kvp[1])
  })

  return params
}

export function getMic () {
  return new Promise((resolve, reject) => {
    navigator.getUserMedia({video: false, audio: true}, (audioStream) => {
      resolve(audioStream)
    }, (err) => {
      reject(err)
    })
  })
}
