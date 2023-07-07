import {formatDistanceToNow} from 'date-fns'
import './index.css'

const UNLIKE_ICON =
  'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
const LIKED_ICON =
  'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'

const DELETE_BTN =
  'https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png'

const CommentsItem = props => {
  const {eachCommentItem, toggleIsLike, onDelete} = props
  const {id, initialColor, name, comment, date, isLiked} = eachCommentItem
  const initial = name ? name[0].toUpperCase() : ''
  const likeIcon = isLiked ? LIKED_ICON : UNLIKE_ICON
  const likeText = isLiked ? 'active like-button' : 'unliked-text like-button'
  const initialTextBackgroundColor = initialColor
  const postedTime = formatDistanceToNow(date)

  const onClickingLikeButton = () => {
    toggleIsLike(id)
  }
  const onClickingDeleteButton = () => {
    onDelete(id)
  }

  return (
    <li>
      <div className="comment-container">
        <div className={`initial-container ${initialTextBackgroundColor}`}>
          <p className="initial">{initial}</p>
        </div>
        <div>
          <div className="username-time-container">
            <p className="user-name">{name}</p>
            <p className="time">{postedTime} ago</p>
          </div>
          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="like-and-delete-button-container">
        <div className="like-button-container">
          <img className="like-icon" src={likeIcon} alt="like" />
          <button
            className={likeText}
            onClick={onClickingLikeButton}
            type="button"
          >
            Like
          </button>
        </div>
        <button
          className="delete-btn"
          type="button"
          data-testid="delete"
          onClick={onClickingDeleteButton}
        >
          <img className="delete" src={DELETE_BTN} alt="delete" />
        </button>
      </div>
      <hr className="horizontal-line" />
    </li>
  )
}

export default CommentsItem
