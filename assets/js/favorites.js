// Classes que irá conter a lógica dos dados (como os dados serão estruturados/organizados)

export class GithubUser {
    static search(username) {
        const endPoint = `https://api.github.com/users/${username}`

        return fetch(endPoint)
        .then(data => data.json())
        .then(({ login, name, public_repos, followers }) => ({
            login,
            name,
            public_repos,
            followers
        }))
    }
}

export class Favorites {
    constructor(root) {
        this.root = document.querySelector(root)
        this.load()
    }

    async add(username) {
        const user = await GithubUser.search(username)
    }

    load() {
        this.entries = JSON.parse(localStorage.getItem
            ('@github-favorites:')) || []
    }

    delete(user) {
        const filteredEntries = this.entries
            .filter(entry => entry.login !== user.login)

        this.entries = filteredEntries
        this.update()
    }
}

// Classe que vai criar a visualizaçã e eventos do HTML

export class FavoritesView extends Favorites {
    constructor(root) {
        super(root)

        this.tbody = this.root.querySelector('table tbody')

        this.update()
        this.onAdd()
    }

    onAdd() {
        const addUser = this.root.querySelector('.search-user button')

        addUser.onclick = () => {
            const { value } = this.root.querySelector('.search-user input')

            this.add(value)
        }
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
            row.querySelector('.remove-user').onclick = () => {
                const isOk = confirm('Tem certeza que deseja deletar esta linha?')

                if (isOk) {
                    this.delete(userInfo)
                }
            }
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