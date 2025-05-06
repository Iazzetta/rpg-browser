document.querySelector('.entity.enemy').addEventListener('mousedown', (e) => {
    window.player.attack(window.enemy);
});

