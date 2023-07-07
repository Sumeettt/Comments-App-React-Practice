import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import CommentsItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]
const COMMENT_IMG_URL =
  'https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png'

class Comments extends Component {
  state = {
    name: '',
    comment: '',
    commentsList: [],
  }

  onEnteringName = event => {
    this.setState({
      name: event.target.value,
    })
  }

  onEnteringComment = event => {
    this.setState({
      comment: event.target.value,
    })
  }

  onAddComment = event => {
    event.preventDefault()

    const {name, comment} = this.state
    const indexForColor = Math.ceil(
      Math.random() * initialContainerBackgroundClassNames.length - 1,
    )
    const initialBackgroundColorClassName =
      initialContainerBackgroundClassNames[indexForColor]

    const newComment = {
      id: uuidv4(),
      initialColor: initialBackgroundColorClassName,
      name,
      comment,
      date: new Date(),
      isLiked: false,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      name: '',
      comment: '',
    }))
  }

  toggleIsLike = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  onDelete = id => {
    const {commentsList} = this.state

    const listAfterDelete = commentsList.filter(
      eachComment => eachComment.id !== id,
    )

    this.setState({
      commentsList: listAfterDelete,
    })
  }

  render() {
    const {name, comment, commentsList} = this.state
    console.log(commentsList)
    const commentsCount = commentsList.length
    return (
      <div className="app-container">
        <div className="sub-container">
          <h1 className="heading">Comments</h1>
          <div className="input-and-image-card">
            <form className="input-container" onSubmit={this.onAddComment}>
              <p className="description">
                Say something about 4.0 Technologies
              </p>
              <input
                className="name-input"
                type="text"
                placeholder="Your Name"
                onChange={this.onEnteringName}
                value={name}
              />
              <textarea
                className="comment-input"
                type="text"
                placeholder="Your Comment"
                onChange={this.onEnteringComment}
                value={comment}
                rows="6"
              />
              <button type="submit" className="add-comment-button">
                Add Comment
              </button>
            </form>
            <div className="img-container">
              <img
                className="comment-img"
                src={COMMENT_IMG_URL}
                alt="comments"
              />
            </div>
          </div>
          <hr className="horizontal-line" />
          <div className="comments-count-container">
            <p className="comments-count">{commentsCount}</p>
            <p className="comments-text">Comments</p>
          </div>
          <ul className="comments-list-container">
            {commentsList.map(eachCommentItem => (
              <CommentsItem
                key={eachCommentItem.id}
                eachCommentItem={eachCommentItem}
                toggleIsLike={this.toggleIsLike}
                onDelete={this.onDelete}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
