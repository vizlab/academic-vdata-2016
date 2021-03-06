import {storage} from './firebase'
import {csv, json} from 'd3-request'

class CacheLoader {
  constructor () {
    this.files = {}
    this.urls = {}
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

  getJsonFileFromFirebaseStorage (path) {
    if (this.files.hasOwnProperty(path)) {
      return new Promise((resolve) => resolve(this.files[path]))
    }
    return new Promise((resolve) => {
      storage.ref(path).getDownloadURL().then((url) => {
        json(url, (d) => {
          this.files[path] = d
          resolve(d)
        })
      })
    })
  }

  getFileUrlFromFirebaseStorage (path) {
    if (this.files.hasOwnProperty(path)) {
      return new Promise((resolve) => resolve(this.urls[path]))
    }
    return new Promise((resolve) => {
      storage.ref(path).getDownloadURL().then((url) => {
        this.urls[path] = url
        resolve(url)
      })
    })
  }
}

export const cacheLoader = new CacheLoader()
