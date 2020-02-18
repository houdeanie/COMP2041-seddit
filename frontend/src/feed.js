// Assignment 2 Seddit
// Dean Hou z5163159
// last editted: 14/08/2019

// file is for managing the feed on the main page

// get json function
function getJSON(path) {
    return fetch(path).then(response => response.json());
}

// create a post button for the posts
function postButton() {
    const post = document.createElement('button');
    post.id = 'post-button';
    post.className = 'button button-secondary';
    post.innerText = 'Post';
    return post;
}

// feed header title and create post button
function feedHeader() {
    // create the header div for the feed element
    const feedHead = document.createElement('div');
    feedHead.id = 'feed-header';
    feedHead.className = 'feed-header';

    // add the feed title
    const header = document.createElement('h3');
    header.id = 'feed-header=id';
    header.className = 'feed-title alt-text';
    header.innerText = 'Popular posts';

    feedHead.appendChild(header);
    feedHead.appendChild(postButton());
    return feedHead;
}

// format time to get 0's infront of single digit numbers
function formatTime(t) {
	if (t < 10) {t = '0' + t};  
	return t;
}

// adds a post to the feed
// takes a post json data as input
// outputs a list element of the post
// each posts must include
// 1. who the post was made by (must include data-id-author) done
// 2. when it was posted
// 3. The image itself, if there is one present
// 4. How many upvotes it has (or none) (must include data-id-upvotes) semi-done
// 5. The post title (must include data-id-title) done
// 6. The post description text 
// 7. How many comments the post has
// 8. What suseddit this was posted to i,e /s/meme
function addPost(post) {
    //const feedList = document.getElementById('');
    // creates list container for the post
    var img = null;
    if (post.image != null) {
        img = document.createElement('img');
        img.className = 'post image';
        img.src = 'data:image/jpeg;base64,' + post.image;
    }
    const list = document.createElement('li');
    list.className = 'post';
    list.setAttribute('data-id-post', '');
    // number of upvotes
    const upVotes = document.createElement('div');
    upVotes.className = 'post vote';
    upVotes.setAttribute('data-id-upvotes', '');
    upVotes.innerText = post.meta.upvotes.length;

    // create a container for the content
    const content = document.createElement('div');
    content.className = 'content';

    // title of post
    const contentTitle = document.createElement('h4');
    contentTitle.setAttribute('data-id-title', '');
    contentTitle.className = 'post-title alt-text';
    contentTitle.innerText = post.title;

    // contents of post
    const contentText = document.createElement('p');
    contentText.className = 'post content';
    contentText.innerText = post.text;

    // n comments on post
    const comments = document.createElement('p');
    comments.className = 'post-author';
    comments.innerText = post.comments.length + ' Comments';

    // subseddit of post
    const subText = document.createElement('p');
    subText.className = 'post-author';
    subText.innerText = 's/'+ post.meta.subseddit;

    // author of post + time
    const contentAuthor = document.createElement('p');
    contentAuthor.className = 'post-author';
    contentAuthor.setAttribute('data-id-author', '');
    var d = new Date(post.meta.published*1000);
    var date = formatTime(d.getDate()) + '/' + formatTime(d.getMonth()) + '/' + d.getFullYear();
    var time = formatTime(d.getHours()) + ':' + formatTime(d.getMinutes()) + ':' + formatTime(d.getSeconds());
    contentAuthor.innerText = 'Posted by @' + post.meta.author + ' at ' + time + ', ' + date;

    content.appendChild(contentTitle);
    content.appendChild(subText);
    content.appendChild(contentAuthor);
    content.appendChild(contentText);
    if (img != null) {
        content.appendChild(img);
    }
    content.appendChild(comments);
    list.append(upVotes);
    list.append(content);
    return list;
}

// function that given an elemment and a parent, appends element to parent
function append(element, parent) {
    parent.appendChild(element);
}

// map append function
const mapAppend = parent => element => append(element, parent);

// takes in feed and returns adds the post data to feed in published sorted order
function readPosts(feed) {
    fetch('../data/feed.json', {credentials: 'include'})
        .then(r => r.json())
        .then(data => {
            data.posts.sort(function(a, b){return b.meta.published - a.meta.published});
            data.posts.forEach(
                post => feed.appendChild(addPost(post))
            )
        });
}

// 

// creates a post in the feed
function createPost() {
}


export { readPosts, postButton, feedHeader };