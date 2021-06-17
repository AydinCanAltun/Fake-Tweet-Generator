var fetchDataButton = document.getElementById("fetchDataButton");
var createTweetButton = document.getElementById("createTweet");

var userImg = document.querySelector("#tweet .author .img");
var displayName = document.querySelector("#tweet .author .displayName .name");
var verified = document.querySelector("#tweet .author .displayName .verified");
var username = document.querySelector("#tweet .author .username");

var content = document.querySelector("#tweet .content p");

var tweet = document.getElementById("tweet");
var download = document.getElementById("downloadURL");

var retweets = document.getElementById("retweets");
var quoteTweets = document.getElementById("quoteTweets");
var likes = document.getElementById("likes");

function toDataUrl(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}

function errorToast(errorMessage)
{
    var toast = document.createElement("div");
    toast.style.position = "absolute";
    toast.style.top = "10px";
    toast.style.right = "10px";
    toast.style.backgroundColor = "#dc3545";
    toast.style.color = "white";
    toast.style.padding = "10px";
    toast.innerText = errorMessage;

    document.body.appendChild(toast);

    setTimeout(function(){
        toast.remove();
    }, 1000);

}



fetchDataButton.addEventListener("click", function(event){
    event.preventDefault();

    var givenUsername = document.querySelector("#fetchData input[name='fetchDataUsername']").value;

    if(givenUsername === "" || givenUsername === " " || givenUsername == "" || givenUsername == " ")
    {
        errorToast("Username field is empty!");
        return false;
    }

    fetch("search.php?username=" + givenUsername)
        .then(response => response.json())
        .then(data => {
            if(data.status === "success")
            {                
                toDataUrl(data.result.data.profile_image_url, function(base64) {
                    userImg.src = base64;
                });

                displayName.innerText = data.result.data.name;
                username.innerText = data.result.data.username;
                console.log(data.result.data.verified);
                if(data.result.data.verified)
                {
                    verified.innerHTML = `
                    <svg fill="#fff" width="19" height="19" viewBox="0 0 24 24" aria-label="Onaylanmış hesap">
                        <g>
                            <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path>
                        </g>
                    </svg>
                    `;
                }else
                {
                    verified.innerHTML = "";
                }

            }else if(data.status === "error")
            {
                errorToast(data.result);
            }
        });
});

content.addEventListener('blur', function(){
    var tweet = content.innerText;
    tweet = tweet
        .replace(/@([\w]+)/g, '<span>@$1</span>')
        .replace(/#([\wşçöğüıİ]+)/gi, '<span>#$1</span>')
        .replace(/(https?:\/\/[\w\.\/]+)/, '<span>$1</span>')
        .replace(/\n/g, '<br />');
    content.innerHTML = tweet;
});

retweets.addEventListener('blur', function() {
    var number = parseInt(retweets.innerText);
    var isNumber = Number.isInteger(number);
    
    if(isNumber)
    {
        if(number >= 10000 && number < 1000000)
        {
            retweets.innerText = (number / 1000) + "K";
        }else if(number >= 1000000)
        {
            retweets.innerText = (number / 1000000) + "M";
        }
    }

});

quoteTweets.addEventListener('blur', function() {
    var number = parseInt(quoteTweets.innerText);
    var isNumber = Number.isInteger(number);

    if(isNumber)
    {
        if(number >= 10000 && number < 1000000)
        {
            quoteTweets.innerText = (number / 1000) + "K";
        }else if(number >= 1000000)
        {
            quoteTweets.innerText = (number / 1000000) + "M";
        } 
    }

});

likes.addEventListener('blur', function() {
    var number = parseInt(likes.innerText);
    var isNumber = Number.isInteger(number);

    if(isNumber)
    {
        if(number >= 10000 && number < 1000000)
        {
            likes.innerText = (number / 1000) + "K";
        }else if(number >= 1000000)
        {
            likes.innerText = (number / 1000000) + "M";
        } 
    }

});


createTweetButton.addEventListener("click", function(event) {
    event.preventDefault();
    
    html2canvas(tweet)
        .then(function(canvas) {
            download.href = canvas.toDataURL();
            download.click();
        });
   
});