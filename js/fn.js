import { POST } from "./http.js";
import { reactions } from "./script.js";

export const cE = (element) => document.createElement(element);
export const qS = (element) => document.querySelector(element);

const reactionsGen = (tweetData) => {
  const reactionsEl = cE("div");

  reactionsEl.className = "tweet__reactions";

  reactions.forEach((reaction) => {
    const reactionEl = cE("div");
    const reactionImg = cE("img");
    const reactionNumber = cE("span");

    reactionEl.className = "tweet__reaction";
    reactionEl.classList.add(reaction.name);
    reactionImg.className = "svg";

    reactionImg.src = reaction.image;
    reactionImg.alt = reaction.name;
    reactionNumber.className = "reaction-number";
    reactionNumber.textContent = tweetData.reactions;

    if (reactionEl.classList.contains("share")) {
      reactionNumber.textContent = "";
    }
    if (reactionEl.classList.contains("views") && tweetData.reactions > 0) {
      reactionNumber.textContent = Math.floor(Math.random() * (100 - 20) + 20);
    }

    reactionEl.append(reactionImg, reactionNumber);
    reactionsEl.append(reactionEl);
  });

  // const likeReactionEl = qS(".likes");
  // const likeImgEl = likeReactionEl.addEventListener("click", () => {});

  return reactionsEl;
};

export const tweetGen = (tweetData) => {
  const wrapperEl = cE("div");
  const profilePicEl = cE("div");
  const profilePicImg = cE("img");
  const contentEl = cE("div");
  const userBarEl = cE("div");
  const userDataEl = cE("div");
  const screenNameEl = cE("span");
  const usernameEl = cE("span");
  const actionsEl = cE("div");
  const actionEl = cE("img");
  const bodyEl = cE("div");
  const bodyPEl = cE("p");

  wrapperEl.className = "tweetWrapper";
  profilePicEl.className = "tweet__profilePic";
  profilePicImg.src = tweetData.user?.image || "./assets/nameless.jpg";
  profilePicImg.alt = tweetData.user?.username || "imnameless";
  contentEl.className = "tweet__content";
  userBarEl.className = "tweet__userBar";
  userDataEl.className = "tweet__userData";
  screenNameEl.className = "userData-screenName";
  screenNameEl.textContent = tweetData.user?.firstName || "NAMELESS IS";
  screenNameEl.textContent += " ";
  screenNameEl.textContent += tweetData.user?.lastName || "MY PRICE";
  usernameEl.className = "userData-nickname";
  usernameEl.textContent = "@";
  usernameEl.textContent += tweetData.user?.username || "imnameless";
  actionsEl.className = "userBar__actions";
  actionEl.src = "./assets/svg/actions.svg";
  actionEl.alt = "actions";
  actionEl.className = "svg";
  bodyEl.className = "tweet__body";
  bodyPEl.textContent = tweetData.body;

  profilePicEl.appendChild(profilePicImg);
  userDataEl.append(screenNameEl, usernameEl);
  actionsEl.appendChild(actionEl);
  userBarEl.append(userDataEl, actionsEl);
  bodyEl.appendChild(bodyPEl);
  contentEl.append(userBarEl, bodyEl, reactionsGen(tweetData));

  wrapperEl.append(profilePicEl, contentEl);

  return wrapperEl;
};

export const onHandleClick = () => {
  const textAreaEl = qS(".newPost__input");
  const homeLabelEl = qS(".navLink");

  if (textAreaEl.value.length >= 1) {
    const body = {
      title: textAreaEl.value,
      userId: 3,
    };
    POST("/posts/add", body);

    const newTweetData = {
      user: {
        image: "./assets/icon.png",
        username: "twitteruser",
        firstName: "pic credit: @posebean",
        lastName: " ",
      },
      body: textAreaEl.value,
      reactions: 0,
    };

    qS(".tweets").insertBefore(
      tweetGen(newTweetData),
      qS(".tweets").firstChild
    );
    textAreaEl.value = "";
    homeLabelEl.classList.add("newPostsNotif");
  }
};

export const createFollowSuggestions = (data) => {
  const wrapperEl = cE("div");
  const contentEl = cE("div");
  const profilePicEl = cE("div");
  const imgEl = cE("img");
  const userDataEl = cE("div");
  const screenNameEl = cE("p");
  const nicknameEl = cE("p");
  const actionsEl = cE("div");
  const btnEl = cE("div");

  wrapperEl.className = "userSection";
  contentEl.className = "userSection__content";
  profilePicEl.className = "userSection__profilePic";
  imgEl.src = data.image;
  imgEl.alt = data.username;
  userDataEl.className = "userSection__userData";
  screenNameEl.className = "userData-screenName";
  screenNameEl.textContent = data.firstName + " " + data.lastName;
  nicknameEl.className = "userData-nickname";
  nicknameEl.textContent = "@" + data.username;
  actionsEl.className = "userSection__actions";
  btnEl.className = "followButton";
  btnEl.textContent = "Segui";

  profilePicEl.appendChild(imgEl);
  userDataEl.append(screenNameEl, nicknameEl);
  actionsEl.appendChild(btnEl);
  contentEl.append(profilePicEl, userDataEl);
  wrapperEl.append(contentEl, actionsEl);

  return wrapperEl;
};
