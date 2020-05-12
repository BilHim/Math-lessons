/* jshint esversion: 6 */

let data = [
    {
        name: 'Espace Vectoriels',
        permalink: 'espace-vect',
        link: 'content/espaces-vect.html'
    },
    {
        name: 'Matrices',
        permalink: 'matrices',
        link: 'content/matrices.html'
    },
    {
        name: 'Determinant',
        permalink: 'determinant',
        link: 'content/determinant.html'
    },
    {
        name: 'Espaces euclidiens',
        permalink: 'espace-euclid',
        link: 'content/espaces-euclid.html'
    }
];

function onLoad() {
    let nav = document.querySelector('#sidebar nav');

    for (let i = 0; i < data.length; i++) {
        let link = document.createElement('a');
        link.innerHTML = data[i].name;
        link.href = '#'+data[i].permalink;
        link.addEventListener('click', ()=>{showContent(i)});

        nav.appendChild(link);
    }
}

function showContent(i) {
    // Show  loader
    document.querySelector('.loader').classList.remove('done');

    // Clear content
    document.querySelector('#content .wrapper').innerHTML = '';

    // Make all nav links non active
    document.querySelectorAll('#sidebar nav a').forEach((elem, i)=>{
        elem.classList.remove('active');
    });

    // Make selected link active
    document.querySelectorAll('#sidebar nav a')[i].classList.add('active');

    let request = new XMLHttpRequest();
    request.open('GET', data[i].link, true);
    request.send();
    request.onreadystatechange = function() {
        if (request.readyState==4 && request.status==200) {
            // Success
            let dom = new DOMParser().parseFromString(request.response, 'text/html');
            document.querySelector('#content .wrapper').innerHTML = dom.body.innerHTML;
            MathJax.typesetPromise();
            document.querySelector('.loader').classList.add('done');
        }

    }
}

window.onload = onLoad;