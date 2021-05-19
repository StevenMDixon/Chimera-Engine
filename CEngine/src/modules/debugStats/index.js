class Stats {
    constructor(){
        this.target = null;
        this.stats = {};

    }
    renderStats(){
        let Stats = '<p>Stats</p>';
        for(const item in this.stats){
            Stats += `<p>${item}: ${this.stats[item]}</p>`;
        }
        this.target.innerHTML = Stats;
    }
    setTarget(target){
        const gameWindow = document.getElementById(target).parentElement;
        const el = document.createElement('div');
        el.style.color = 'green';
        el.style.background = 'rgba(255,255,255,0.9)';
        el.id = 'gamedebugwindow';
        el.style.position = 'absolute';
        el.style.top = 0;
        el.style.left = '80%';
        el.style.height = '400px';

        
        gameWindow.appendChild(el);
        this.target = document.getElementById('gamedebugwindow');
    }
    update(stats){
        this.stats = {...this.stats, ...stats};
    }
}

export default new Stats();