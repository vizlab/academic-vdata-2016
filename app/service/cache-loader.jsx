import {storage} from './firebase'
import {csv} from 'd3-request'

class CacheLoader {
  constructor () {
    this.files = {}
  }

  getCsvFileFromFirebaseStorage (path) {
    if (this.files.hasOwnProperty(path)) {
      return new Promise((resolve) => resolve(this.files[path]))
    }
    return new Promise((resolve) => {
      storage.ref(path).getDownloadURL().then((url) => {
        csv(url, (data) => {
          this.files[path] = data
          resolve(data)
        })
      })
    })
  }
}

export const cacheLoader = new CacheLoader()
