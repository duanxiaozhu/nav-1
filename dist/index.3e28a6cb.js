const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hasMap = xObject || [
    {
        logo: "A",
        url: "https://www.acfun.cn"
    },
    {
        logo: "B",
        url: "https://www.bilibili.com"
    },
    {
        logo: "G",
        url: "https://github.com"
    },
    {
        logo: "I",
        url: "https://www.iconfont.cn"
    },
    {
        logo: "F",
        url: "https://www.figma.com"
    },
    {
        logo: "B",
        url: "https://www.bootcdn.cn"
    },
    {
        logo: "D",
        url: "https://developer.mozilla.org"
    }
];
console.log(hasMap);
const simplifyUrl = (url)=>{
    return url.replace("https://", "").replace("http://", "").replace("www.", "").replace(/\/.*/, "");
};
const render = ()=>{
    $siteList.find("li:not(.last)").remove();
    hasMap.forEach((node, index)=>{
        const $li = $(`<li>
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class='close'>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
            </div>
        </li>`).insertBefore($lastLi);
        $li.on("click", ()=>{
            window.open(node.url, "_self");
        });
        $li.on("click", ".close", (e)=>{
            e.stopPropagation();
            hasMap.splice(index, 1);
            render();
        });
    });
};
render();
$(".addButton").on("click", ()=>{
    let url = window.prompt("请问你要添加的网址是什么");
    if (url.indexOf("https") !== 0) url = "https://" + url;
    console.log(url);
    hasMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        url: url
    });
    render();
});
window.onbeforeunload = ()=>{
    const string = JSON.stringify(hasMap);
    localStorage.setItem("x", string);
};
$(document).on("keypress", (e)=>{
    const { key  } = e;
    for(let i = 0; i < hasMap.length; i++)if (hasMap[i].logo.toLowerCase() === key) window.open(hasMap[i].url);
});

//# sourceMappingURL=index.3e28a6cb.js.map
