// show nav bar while scrolling
$(document).on('scroll', (_) => {
    let scrolly = window.scrollY,
        winHeight = window.innerHeight,
        scrollPct = scrolly / winHeight;
    let opacity = (scrollPct - 0.2) / 0.4
    $('nav').css('opacity', opacity)

})
