
export function generateBarcode() {
  return Date.now()
}

export const req = (url, opts, dataType) => fetch(url, opts ? opts : {}).then(e => e[dataType]())

export const reqJSON = (url, opts) => {
  const headers = {'Content-Type': 'application/json; charset=utf-8'}
  if(opts) {
    opts.headers ? opts.headers = {...opts.headers, headers} : opts.headers = headers
  }
  return req(url, opts ? opts : {headers: headers}, 'json')
}

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
