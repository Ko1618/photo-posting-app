// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

//= require jquery3
//= require popper
//= require bootstrap

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")

//= require jquery
//= require jquery_ujs

//= require jquery3
//= require popper
//= require bootstrap-sprockets

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()

document.addEventListener('DOMContentLoaded',() => {
 

      $('.inactive-heart ').on('click',(e) => {
        e.preventDefault();
        const id = $(e.currentTarget).attr('id')
        axios.post(`posts/${id}/like`)
          .then((response) => {
            if (response.data.status === 'ok') {
              $(`.active-heart.${id}`).removeClass('hidden')
              $(`.inactive-heart.${id}`).addClass('hidden')
            
            }
          })
          .catch((e) =>{
            window.alert('Error')
            console.log(e)
          })

      })

      $('.active-heart').on('click',(e) => {
        e.preventDefault();
        const id = $(e.currentTarget).attr('id')
        axios.delete(`/posts/${id}/like`)
          .then((response) => {
            if (response.data.status === 'ok') {
              $(`.active-heart.${id}`).addClass('hidden')
              $(`.inactive-heart.${id}`).removeClass('hidden')
              
            }
          })
          .catch((e) =>{
            window.alert('Error')
            console.log(e)
          })

      })
  })

  document.addEventListener('DOMContentLoaded',() => {
    const dataset = $('#post-show').data()
    const postId = dataset.postId

    axios.get(`/posts/${postId}/comments`)
      .then((response) => {
        const comments = response.data
        comments.forEach((comment) => {
          $('.comments-container').append(
            `<div class="comment-card">
              <div class="comment-avatar">
                <img src="${comment.user.avatar}">
              </div>
              <div class="comment-user-info">
                <div class="comment-username"><p>${comment.user.username}</p></div>
                <div class="comment-content"><p>${comment.content}</p></div>
              </div>
            </div>`
          )
        })
      })


      $('.add-comment-btn').on('click', () => {
        const content = $('#comment_content').val()
        if (!content) {
          window.alert('コメントを入力してください')
        } else {
          axios.post(`/posts/${postId}/comments`, {
            comment: {content: content}
          })
            .then((res) => {
              const comment = res.data
              $('.comments-container').append(
                `<div class="comment-card">
                  <div class="comment-avatar">
                    <img src="${comment.user.avatar}">
                  </div>
                  <div class="comment-user-info">
                    <div class="comment-username"><p>${comment.user.username}</p></div>
                    <div class="comment-content"><p>${comment.content}</p></div>
                   </div>
                </div>`
              )
              $('#comment_content').val('')
            })
          }
        })

  })
