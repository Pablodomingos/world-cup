
(function () {
    const basePath = document.body.getAttribute('data-base-path') || '';
    const componentsPath = basePath + 'components/';

    function getNavLinks() {
        const depth = (basePath.match(/\.\.\//g) || []).length;

        if (depth === 0) {
            return {
                home: '#hero',
                homeLogo: 'index.html',
                jogos: 'pages/jogos-historicos.html',
                elencos: 'pages/elencos.html',
                mascotes: 'pages/mascotes.html',
                contato: 'pages/contato.html'
            };
        } else if (depth === 1) {
            return {
                home: '../index.html',
                homeLogo: '../index.html',
                jogos: 'jogos-historicos.html',
                elencos: 'elencos.html',
                mascotes: 'mascotes.html',
                contato: 'contato.html'
            };
        } else {
            return {
                home: '../../index.html',
                homeLogo: '../../index.html',
                jogos: '../jogos-historicos.html',
                elencos: '../elencos.html',
                mascotes: '../mascotes.html',
                contato: '../contato.html'
            };
        }
    }

    const nav = getNavLinks();

    function replacePlaceholders(html) {
        return html
            .replace(/\{\{BASE\}\}/g, basePath)
            .replace(/\{\{NAV_HOME_LOGO\}\}/g, nav.homeLogo)
            .replace(/\{\{NAV_HOME\}\}/g, nav.home)
            .replace(/\{\{NAV_JOGOS\}\}/g, nav.jogos)
            .replace(/\{\{NAV_ELENCOS\}\}/g, nav.elencos)
            .replace(/\{\{NAV_MASCOTES\}\}/g, nav.mascotes)
            .replace(/\{\{NAV_CONTATO\}\}/g, nav.contato);
    }

    function fetchComponent(name) {
        return fetch(componentsPath + name + '.html')
            .then(function (res) {
                if (!res.ok) throw new Error('Component not found: ' + name);
                return res.text();
            })
            .then(function (html) {
                return replacePlaceholders(html);
            });
    }

    var placeholders = document.querySelectorAll('[data-component]');
    var fetchPromises = [];

    placeholders.forEach(function (el) {
        var name = el.getAttribute('data-component');
        fetchPromises.push(
            fetchComponent(name).then(function (html) {
                el.outerHTML = html;
            })
        );
    });

    Promise.all(fetchPromises).then(function () {
        document.dispatchEvent(new Event('components:loaded'));
    });
})();
