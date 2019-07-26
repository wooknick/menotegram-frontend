import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import useInput from "../../Hooks/useInput";
import PostPresenter from "./PostPresenter";
import { useMutation } from "react-apollo-hooks";
import { TOGGLE_LIKE, ADD_COMMENT } from "./PostQueries";
import { toast } from "react-toastify";
import { parseCreatedAt } from "../Util";

const PostContainer = ({
    id,
    user,
    files,
    likeCount,
    isLiked,
    comments,
    createdAt,
    caption,
    location
}) => {
    const [isLikedS, setIsLiked] = useState(isLiked);
    const [likeCountS, setLikeCount] = useState(likeCount);
    const [currentItem, setCurrentItem] = useState(0);
    const [selfComments, setSelfComments] = useState([]);
    const comment = useInput("");
    const toggleLikeMutation = useMutation(TOGGLE_LIKE, { variables: { postId: id } });
    const addCommentMutation = useMutation(ADD_COMMENT, {
        variables: { postId: id, text: comment.value }
    });
    const slide = useCallback(() => {
        const totalFiles = files.length;
        if (currentItem === totalFiles - 1) {
            setCurrentItem(0);
        } else {
            setCurrentItem(currentItem + 1);
        }
    }, [currentItem, files]);

    useEffect(() => {
        setTimeout(slide, 3000);
    }, [currentItem, slide]); // currentItem이 변할 때 다시 동작함.

    const toggleLike = async () => {
        toggleLikeMutation();
        if (isLikedS === true) {
            setIsLiked(false);
            setLikeCount(likeCountS - 1);
        } else {
            setIsLiked(true);
            setLikeCount(likeCountS + 1);
        }
    };

    const onKeyPress = async e => {
        const { which } = e;
        if (which === 13) {
            e.preventDefault();
            try {
                const {
                    data: { addComment }
                } = await addCommentMutation();
                setSelfComments([...selfComments, addComment]);
                comment.setValue("");
            } catch {
                toast.error("Can't send comment");
            }
        }
    };

    // dateTime formatting
    const parsedCreatedAt = parseCreatedAt(createdAt);

    return (
        <PostPresenter
            user={user}
            files={files}
            likeCount={likeCountS}
            location={location}
            caption={caption}
            isLiked={isLikedS}
            comments={comments}
            createdAt={parsedCreatedAt}
            newComment={comment}
            setIsLiked={setIsLiked}
            setLikeCount={setLikeCount}
            currentItem={currentItem}
            toggleLike={toggleLike}
            onKeyPress={onKeyPress}
            selfComments={selfComments}
        />
    );
};

PostContainer.propTypes = {
    id: PropTypes.string.isRequired,
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired
    }).isRequired,
    files: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired
        })
    ).isRequired,
    likeCount: PropTypes.number.isRequired,
    isLiked: PropTypes.bool.isRequired,
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            user: PropTypes.shape({
                id: PropTypes.string.isRequired,
                username: PropTypes.string.isRequired
            }).isRequired
        })
    ).isRequired,
    createdAt: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    location: PropTypes.string
};

export default PostContainer;
