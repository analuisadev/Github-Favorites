// Classes que irá conter a lógica dos dados (como os dados serão estruturados/organizados)

export class Favorites {
    constructor(root) {
        this.root = document.querySelector(root)    
        this.load()
    }

    load() {
        this.entries = [
            {
                login: 'analuisadev',
                name: 'Ana Luisa Santos',
                public_repos: '41',
                followers: '108'
            }
        ]
    }
}

// Classe que vai criar a visualizaçã e eventos do HTML

export class FavoritesView extends Favorites {
    constructor(root) {
        super(root)

        this.tbody = this.root.querySelector('table tbody')

        this.update()
    }

    update() {
        this.removeAllTr()

        this.entries.forEach(userInfo => {
            const row = this.createRow()
            
            row.querySelector('.github-user img').src = `https://github.com/${userInfo.login}.png`
            row.querySelector('.github-user img').alt = `github profile picture of ${userInfo.name}`
            row.querySelector('.github-user p').textContent = userInfo.name
            row.querySelector('.github-user span').textContent = userInfo.login
            row.querySelector('.github-repositories').textContent = userInfo.public_repos
            row.querySelector('.github-followers').textContent = userInfo.followers

            this.tbody.append(row)
        })
    }

    createRow() {
        const tr = document.createElement('tr')

        tr.innerHTML = `
            <td class="github-user">
                <img src="https://github.com/analuisadev.png" alt="github profile picture">
                <a href="https://github.com/analuisadev" target="_blank">
                    <p>Ana Luisa Santos</p>
                    <span>analuisadev</span>
                </a>
            </td>
            <td class="github-repositories">
                41
            </td>
            <td class="github-followers">
                108
            </td>
            <td>
                <button class="remove-user">&times;</button>
            </td>
        `
        return tr
    }

    removeAllTr() {
        this.tbody.querySelectorAll('tr')
            .forEach((tr) => {
                tr.remove()
            })
    }
}