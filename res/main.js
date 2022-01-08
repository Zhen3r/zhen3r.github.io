

let scrollDest = [];
$('.my-card-container>h3').each(function (i, x) {
    scrollDest.push($(x).position().top)
})

$('.nav-btn a').each(function (i, x) {
    if (i >= scrollDest.lendth) { return }
    $(x).on('click', () => {
        $(window).scrollTop(scrollDest[i]);
    })

})

// show nav bar while scrolling
$(document).on('scroll', (_) => {
    let scrolly = window.scrollY,
        winHeight = window.innerHeight,
        scrollPct = scrolly / winHeight;
    let opacity = (scrollPct - 0.2) / 0.4;
    $('nav').css('opacity', opacity);

    let scrollNow = scrollDest.length - 1;
    for (let i = 0; i < scrollDest.length; i++) {
        const d = scrollDest[i];
        if (scrolly <= d + window.innerHeight * 0.7) {
            scrollNow = i
            break
        }
    }
    navBtn = $(".nav-btn a")
    navBtn.removeClass("activated-nav")
    // console.log(navBtn[scrollNow], scrollNow)
    $(navBtn[scrollNow]).toggleClass("activated-nav")

})

$("#link-550").on('click', (e) => {
    e.preventDefault();
    window.open('https://github.com/Zheng-Zhen/street-view-our-safety/blob/main/Writeup.md', 'name');
})

$("#link-509").on('click', (e) => {
    e.preventDefault();
    window.open('https://github.com/Zhen3r/WSOPB-MUSA509/blob/main/proposal.md', 'name');
})

$("#link-509-2").on('click', (e) => {
    e.preventDefault();
    window.open('http://air.orifish.tech', 'name');
})