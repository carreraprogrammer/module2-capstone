/* eslint-disable linebreak-style */
import postComment from './addCommentAPI.js';
import getComment from './getCommentAPI.js';

const createPopup = (object) => {
  const popupContainer = document.createElement('div');
  popupContainer.setAttribute('class', 'popup-card');
  const body = document.querySelector('body');
  body.appendChild(popupContainer);

  const name = document.createElement('h1');
  name.setAttribute('class', 'pokemon-name');
  name.textContent = object.name.toUpperCase();
  popupContainer.appendChild(name);

  const popupInfo = document.createElement('div');
  popupInfo.setAttribute('class', 'popup-info');
  popupContainer.appendChild(popupInfo);

  const leftSide = document.createElement('div');
  leftSide.classList.add('left-side');
  popupInfo.appendChild(leftSide);

  const pokemonData = document.createElement('div');
  pokemonData.classList.add('pokemon-data');
  leftSide.appendChild(pokemonData);

  const imgContainer = document.createElement('div');
  imgContainer.classList.add('picDiv');
  const pokemonImage = document.createElement('img');
  pokemonImage.setAttribute('src', object.sprites.front_default);
  pokemonImage.setAttribute('alt', 'pokemon image');
  imgContainer.appendChild(pokemonImage);
  pokemonData.appendChild(imgContainer);

  const intro = document.createElement('div');
  intro.classList.add('intro');
  pokemonData.appendChild(intro);
  const info = document.createElement('p');
  info.classList.add('info');
  info.textContent = `Type: 
  Height: ${object.height}
  weight: ${object.weight}
  `;
  intro.appendChild(info);

  const pokemonTypes = object.types;
  const types = document.createElement('ul');
  types.classList.add('pokemon-types');

  pokemonTypes.forEach((type) => {
    const li = document.createElement('li');
    li.textContent = type.type.name;
    li.classList.add('type');
    li.classList.add(type.type.name);
    types.appendChild(li);
  });

  pokemonData.appendChild(types);

  const commentSection = document.createElement('div');
  commentSection.classList.add('comment-section');
  popupInfo.appendChild(commentSection);

  const commentHeader = document.createElement('div');
  commentHeader.setAttribute('id', 'comment-header');
  commentSection.appendChild(commentHeader);

  const commentTitle = document.createElement('h3');
  commentTitle.textContent = 'COMMENTS';
  commentHeader.appendChild(commentTitle);

  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'X';
  closeBtn.setAttribute('class', 'close-btn');
  popupContainer.appendChild(closeBtn);

  const commentArea = document.createElement('div');
  commentArea.classList.add('comment-area');
  commentSection.appendChild(commentArea);

  const newComments = document.createElement('div');
  newComments.classList.add('new-comments');
  commentSection.appendChild(newComments);

  const addComments = document.createElement('h3');
  addComments.textContent = 'Add a comment';
  newComments.appendChild(addComments);

  const input1 = document.createElement('input');
  input1.setAttribute('type', 'text');
  input1.setAttribute('placeholder', 'your name');
  newComments.appendChild(input1);

  const input2 = document.createElement('input');
  input2.setAttribute('type', 'text');
  input2.setAttribute('placeholder', 'your insigths');
  newComments.appendChild(input2);

  const submitBtn = document.createElement('button');
  submitBtn.setAttribute('type', 'submit');
  submitBtn.setAttribute('id', 'submit-button');
  submitBtn.textContent = 'Submit';
  newComments.appendChild(submitBtn);

  closeBtn.addEventListener('click', (e) => {
    e.target.parentElement.remove();
  });

  const displayComments = async () => {
    const recentComments = await getComment(object.id);
    await recentComments.reverse();
    recentComments.forEach((comment) => {
      const newComment = document.createElement('div');
      newComment.innerHTML = `<p class="input-date">${comment.creation_date}</p><p class="comment-name">${comment.username}</p><p class="comment-msg">${comment.comment}</p>`;
      commentArea.appendChild(newComment);
    });
  };

  displayComments();

  submitBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    commentArea.innerHTML = '';
    await postComment(object.id, input1.value, input2.value);
    await displayComments();
    input1.value = '';
    input2.value = '';
  });
};

const commentsPopup = (name) => {
  const link = 'https://pokeapi.co/api/v2/pokemon/';
  const newLink = link + name;
  const pokemonObject = async () => {
    await fetch(newLink)
      .then((response) => response.json())
      .then((json) => createPopup(json));
  };
  pokemonObject();
};

export default commentsPopup;
