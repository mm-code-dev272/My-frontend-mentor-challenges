class results extends HTMLElement {
    connectedCallback() {
        const category = this.getAttribute('category') || '';
        const score = this.getAttribute('score') || '';
        const icon = this.getAttribute('icon') || '';
        const bgcolor = this.getAttribute('bgcolor') || '';
        const color = this.getAttribute('color') || '';
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = `
        <style>
    :host {
        display: block;
    }
    p {
        margin : 0;
        }
    .detailedResults {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 1.8rem;
        background-color: ${bgcolor};
        border-radius: 1rem;
    }

    .category-div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
    }
    .category-icon{
    width : 1.8rem;
    height : 1.8rem;
    }
    .category-text {
    font-size: 1.6rem;
    color: var(${color});
    font-weight: 700;
    }

    .detailed-numbers {
    font-size: 1.6rem;
    color: hsl(240, 33%, 71%);
    font-weight: 800;
    }
    @media(max-width:766px) and (min-height:853px){
    .detailedResults {
        padding-top: 3rem;
        padding-bottom: 3rem;
    }
        }
    @media(min-width : 767px) {
    .detailedResults {
    padding : 1.2rem
    }
    
    }
        </style>
        <div class="detailedResults">

                <div class="category-div">
                    <img class="category-icon" src="${icon}" alt="reaction">
                    <p class="category-text">${category}</p>
                </div>

                <div>
                    <p class="detailed-numbers"><span style="color:black">${score}</span> / 100</p>
                </div>

            </div>
        `
    }

}
customElements.define('detailed-results', results);

document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(r => r.json())
        .then(data => {
            const container = document.getElementById('detailed-results');
            if (!container) return;

            data.forEach(item => {
                const card = document.createElement('detailed-results');
                card.setAttribute('category', item.category);
                card.setAttribute('score', item.score);
                card.setAttribute('icon', item.icon);
                card.setAttribute('bgcolor', item.bgcolor);
                card.setAttribute('color', item.color);
                container.appendChild(card);
            });
        })
        .catch(err => console.error('Error loading data.json:', err));
});