import { useContext, useState } from 'react';
import { ApplicationContext } from '../../domain/application.store';
import { LikePictureById, unLikePictureById, commentPictureById } from '../../domain/picture/picture.actions';
import { LikeButton, BookmarkButton } from '../buttons';
import './Card.css';


export function Card({ picture }) {
    const
        { state, dispatch } = useContext(ApplicationContext),
        [comment, setComment] = useState({ comment: '' })

    const onLike = (pictureId) => {
        if (picture.likedBy.find(({ _id }) => _id === state.user._id))
            unLikePictureById(dispatch, pictureId)
        else
            LikePictureById(dispatch, pictureId)
    }

    const onChange = (e) => {
        setComment({
            comment: e.target.value
        })
    }

    const postComment = (pictureId) => {
        commentPictureById(dispatch, { pictureId, data: comment })
    }

    if (!state.user) return null
    return (
        <div className="card">
            <div className="card-img">
                <img src={picture.download_url} />
                <LikeButton onClick={() => { onLike(picture.id) }} isLiked={picture.likedBy && picture.likedBy.find(({ _id }) => _id === state.user._id)} />
                <span className="likes">Likes : {picture.likedBy?.length ?? 0}</span>
                <BookmarkButton onClick={() => { }} />
            </div>
            <div className="card-body">
                <h3>
                    Author : {picture.author}
                </h3>
                <div className="card-comments">
                    Comments
                    {picture.comments.length > 0 && (
                        <ul>
                            {picture.comments.map(({ comment }, index) => (
                                <li key={index}>{comment}</li>
                            ))}
                        </ul>
                    )}
                    <div>
                        <input name="comment" placeholder="Add a comment..." type="text" onChange={onChange} />
                        <button onClick={() => { postComment(picture.id); }}>Publish</button>
                    </div>
                </div>
            </div>
        </div>
    )

}
