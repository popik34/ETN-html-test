function toggleMobileMenu() {
    var menu = document.getElementById('mobile-top-menu');

    if(menu.style.display === 'block') {
        document.getElementById('mobile-top-menu').style.display = 'none';
    } else {
        document.getElementById('mobile-top-menu').style.display = 'block';
    }
}