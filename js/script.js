import { qS, tweetGen, onHandleClick, createFollowSuggestions } from "./fn.js";
import { GET } from "./http.js";

export const reactions = [
  {
    id: 1,
    name: "comments",
    image: "./assets/svg/comments.svg",
  },
  {
    id: 2,
    name: "retweets",
    image: "./assets/svg/retweets.svg",
  },
  {
    id: 3,
    name: "likes",
    image: "./assets/svg/likes.svg",
  },
  {
    id: 4,
    name: "views",
    image: "./assets/svg/views.svg",
  },
  {
    id: 5,
    name: "share",
    image: "./assets/svg/share.svg",
  },
];

let postList = [];
let userList = [];
const tweetsEl = qS(".tweets");
const tweetButtonEl = qS(".sendTweetBtn");
const dashForYou = qS(".dashboardNavigation__forYou");
const dashFollowing = qS(".dashboardNavigation__following");

const postData = Promise.all([GET("/posts"), GET("/users")]);

postData
  .then((data) => {
    postList = data[0].posts;
    userList = data[1].users;
  })
  .then(() => {
    const fullList = postList.map((fullPost) => {
      fullPost.user = userList.find((user) => user.id === fullPost.userId);

      return fullPost;
    });
    // appends tweets to dashboard
    fullList.forEach((post) => tweetsEl.append(tweetGen(post)));

    // appends suggested users to sidebar
    const followSuggestions = userList.slice(13, 16);
    followSuggestions.forEach((user) =>
      qS(".followSuggestions").insertBefore(
        createFollowSuggestions(user),
        qS(".followSuggestions__more")
      )
    );
  });

// EVENTS

// posts a new tweet
tweetButtonEl.addEventListener("click", onHandleClick);

dashForYou.addEventListener("click", () => {
  dashForYou.classList.add("active");
  dashFollowing.classList.remove("active");
});

dashFollowing.addEventListener("click", () => {
  dashFollowing.classList.add("active");
  dashForYou.classList.remove("active");
});
