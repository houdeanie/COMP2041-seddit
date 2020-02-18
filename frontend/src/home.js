// Assignment 2 Seddit
// Dean Hou z5163159
// last editted: 14/08/2019

// creates the basic layouts of the main page under root
// creates banner, main elements

import { loginButton } from './login.js';
import { signButton } from './registration.js';
import { readPosts, feedHeader } from './feed.js';

// search bar that takes user input
function searchBar() {
    const search = document.createElement('input');
    search.setAttribute('data-id-search', '');
    search.id = 'search';
    search.placeholder = 'Search Seddit';
    search.type = 'search';
    return search;
}

// creates navbar that contains search bar, login button and sgn up button
function navBar() {
    const root = document.getElementById('root');
    const banner = document.createElement('header');
    banner.id = 'nav';
    banner.className = 'banner';

    const header = document.createElement('h1');
    header.id = 'logo';
    header.className = 'flex-center';
    header.innerText = 'Seddit';

    const navList = document.createElement('ul');
    navList.className = 'nav';

    const navBarItems = [searchBar(), loginButton(), signButton()]
    
    for (let func of navBarItems) {
        const list = document.createElement('li');
        list.className = 'nav-item';
        list.appendChild(func);
        navList.appendChild(list);
    }

    banner.appendChild(header);
    banner.appendChild(navList);
    root.appendChild(banner);
    //return ;
}

// controls the feed functions
// main section for the feed that contains the feed
// calls the feed.js file extensively to add the feed
// creates the main section
function mainPage() {
    const root = document.getElementById('root');
    // create the main element
    const main = document.createElement('main');
    main.id = 'main';
    main.setAttribute('role', 'main');

    // create the feed element
    const feed = document.createElement('ul');
    feed.id = 'feed';
    feed.setAttribute('data-id-feed', '');
    feed.appendChild(feedHeader());
    readPosts(feed);
    //console.log(posts);
    //for (x of posts) {
    //    feed.appendChild(x);
    //}
    
    // use the posts function to append the list of posts


    main.appendChild(feed);
    root.appendChild(main);
    //return main;
    //readPosts();

}

export { navBar, mainPage };
