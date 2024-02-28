  //saving the comment in the LocalStorage.

const commentsContainer = document.getElementById('comments')
const usernameInput = document.getElementById('client-name')
const textareainput = document.getElementById('content')
const sectionComment = document.getElementById('comment-section')
const nameErrors = document.getElementById('text-error')


const addCommnents = () => {
    const commentStore = JSON.parse(localStorage.getItem('commentStore')) || []
    const specificDate = new Date(); 
    const year = specificDate.getFullYear();
    const month = specificDate.getMonth() + 1;
    const day = specificDate.getDate();
    
    const commentsObj = {
        visitor: usernameInput.value,
        message :textareainput.value,
        year: year,
        month: month,
        day: day
    }
    commentStore.push(commentsObj)
    localStorage.setItem('commentStore', JSON.stringify(commentStore))
    // alert("comments has been successful saved!")
}

// Retrieve the comments from localStorage and display to the website.


document.addEventListener('DOMContentLoaded', () => {
sectionComment.innerHTML =""

    const comments = JSON.parse(localStorage.getItem('commentStore')) || [];

    comments.forEach(comment => {
        const commentsHTML = `
        <div class="comments">
                     <div class="comment-user">
                     <img src="https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg" alt="">
                     </div>
                     <div class="user-comments">
                        <h3>${comment.visitor}</h3>
                        <p class="data">${comment.year}.0${comment.month}. ${comment.day}</p>
                        <p>${comment.message}</p>
                     </div>
                    </div> 
                    `
        
            sectionComment.innerHTML+= commentsHTML
    })
    
})




