import css from './app.scss'

import {checkHTTPS, registerServiceWorker, GoogleAnalytics} from './registerServiceWorker.js'

// checkHTTPS() // enable this when running HTTPS
registerServiceWorker()
// GoogleAnalytics() // enable this if needed

// jQuery is the first priority
import jQuery from 'jquery';
global.$ = global.jQuery = jQuery // expose jquery to global

// Then load tether and finally bootstrap
import 'tether'
import 'bootstrap'

const WP_SERVER_URL = 'https://wordpress.simonho.net'

// Object to handle Blogs page
class BlogsListObj {
  constructor() {
  }

  execute() {
    this.fetchPosts((posts) => {
      this.showPosts(posts)
    })
  }

  fetchPosts(callback) {
    const url = WP_SERVER_URL + '/wp-json/wp/v2/posts'
    fetch(url)
      .then(res => { return res.json() })
      .then(data => {
        callback(data)
      })
  }

  showPosts(posts) {
    let markup = ''
    posts.forEach((post, i) => {
      let modified = new Date(post.modified).toDateString();
      markup += '<div class="postslist-post">'
      markup +=   '<h2><a href="/wp-content/themes/pwawptheme/postview.html?id=' + post.id + '">' + post.title.rendered + '</a></h2>'
      markup +=   '<p><small>' + modified + '</small></p>'
      markup +=   '<p>' + post.excerpt.rendered + '</p>'
      markup += '</div>'
    })
    $('#posts').empty().append(markup)
  }
} // BlogsListObj

class PostViewObj {
  constructor() {
  }

  execute() {
    // extract the id from url
    var url = new URL(location.href)
    var id = url.searchParams.get('id')
    this.fetchThePost(id, (post) => {
      this.showThePost(post)
    })
  }

  fetchThePost(id, callback) {
    const url = WP_SERVER_URL + '/wp-json/wp/v2/posts/' + id
    fetch(url)
      .then(res => { return res.json() })
      .then(data => {
        callback(data)
      })
  }

  showThePost(post) {
    let modified = new Date(post.modified).toDateString();
    $('.post-title').html(post.title.rendered)
    $('.date').html(modified)
    $('.post-content').html(post.content.rendered)

    $('.back-btn').click((evt) => {
      window.history.back()
    })
  }
  
} // PostViewObj

class PagesListObj {
  constructor() {
  }

  execute() {
    this.fetchPosts((posts) => {
      this.showPosts(posts)
    })
  }

  fetchPosts(callback) {
    const url = WP_SERVER_URL + '/wp-json/wp/v2/pages'
    fetch(url)
      .then(res => { return res.json() })
      .then(data => {
        callback(data)
      })
  }

  showPosts(pages) {
    let markup = ''
    pages.forEach((page, i) => {
      let modified = new Date(page.modified).toDateString();
      markup += '<div class="pageslist-page">'
      markup +=   '<h2><a href="/wp-content/themes/pwawptheme/pageview.html?id=' + page.id + '">' + page.title.rendered + '</a></h2>'
      markup +=   '<p>' + page.excerpt.rendered + '</p>'
      markup += '</div>'
    })
    $('#pages').empty().append(markup)
  }
} // PagesListObj

class PageViewObj {
  constructor() {
  }

  execute() {
    // extract the id from url
    var url = new URL(location.href)
    var id = url.searchParams.get('id')
    this.fetchThePage(id, (page) => {
      this.showThePage(page)
    })
  }

  fetchThePage(id, callback) {
    const url = WP_SERVER_URL + '/wp-json/wp/v2/pages/' + id
    fetch(url)
      .then(res => { return res.json() })
      .then(data => {
        callback(data)
      })
  }

  showThePage(page) {
    let modified = new Date(page.modified).toDateString();
    $('.page-title').html(page.title.rendered)
    $('.date').html(modified)
    $('.page-content').html(page.content.rendered)

    $('.back-btn').click((evt) => {
      window.history.back()
    })
  }
} // PageViewObj


global.BlogsListObj = BlogsListObj;
global.PostViewObj = PostViewObj;
global.PagesListObj = PagesListObj;
global.PageViewObj = PageViewObj;
