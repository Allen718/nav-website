const $siteList = $('.siteList')
const $lastLi = $('.siteList').find("li.last")
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    { logo: 'A', url: "https://www.acfun.cn", logoIco: 'https://www.acfun.cn/favicon.ico' },
    { logo: "B", url: 'https://www.bilibili.com', logoIco: 'https://www.bilibili.com/favicon.ico' }]
const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace('/\/.*', '')
}

const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
                     <div class="site">
                    <div class="logo"><img src=${node.logoIco}></div>
                    <div class="link">${simplifyUrl(node.url)}</div>
                    <div class="close">
                    <svg class="icon">
                    <use xlink:href="#icon-remove"></use>
                </svg>
                </div>
                </div>
            
        </li>`).insertBefore($lastLi)

        $li.on("click", () => {
            window.open(node.url)
        })
        $li.on("click", '.close', (e) => {

            e.stopPropagation()
            hashMap.splice(index, 1)
            render()
        })

    })

}
render()

$('.addButton').on("click", fn => {
    let url = window.prompt('请问你要增加的网址是')
    if (url.indexOf('http') !== 0) {
        url = "https://" + url
    }
    console.log(url)

    hashMap.push({ logo: simplifyUrl(url)[0], url: url, logoIco: (url + '/favicon.ico') })
    render()
})
window.onbeforeunload = () => {
    console.log('页面要关闭了')
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}
$(document).on('keypress', (e) => {
    console.log(e.key)
    const { key } = e//key=e.key//
    for (i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
}
)