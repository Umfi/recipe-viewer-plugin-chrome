function generateHtml(scrapedContent) {
    let newHTML = `
    <html>
        <head>
            <title>Recipe Viewer</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css" integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bs-stepper/dist/css/bs-stepper.min.css" />
        </head>
        <body>
            <nav class="navbar navbar-light bg-light">
                <a class="navbar-brand" style="margin-left: 2%;">
                    Recipe Viewer
                </a>

                <a class="nav-link"  style="margin-right: 2%;" href="javascript:window.location.href=window.location.href">
                    <i class="fas fa-arrow-left"></i> Go back to page
                </a>
            </nav>
            <div class="container mt-2" id="main">
                <div class="row">
                    <div class="col-12">
                        <h1 class="text-center">${scrapedContent.heading}</h1>
                    </div>
                </div>
                <div class="row mt-1">
                    <div class="col-6">
                        <div class="recipe-ingredients">
                            <h3>Ingredients</h3>
                            <dl class="ingredients-list">`;
                                for (i in scrapedContent.ingredients) {
                                    newHTML += `<dt>${scrapedContent.ingredients[i].amount}</dt> <dd>${scrapedContent.ingredients[i].name}</dd>`
                                }
                                newHTML +=
                            `</dl>
                        </div>
                    </div>
                    <div class="col-6 d-block m-auto text-center">
                        <img class="recipe-picture" src="${scrapedContent.image}" />
                        <br>
                        <span class="badge rounded-pill bg-primary" style=" font-size: 15px; margin-top: 10px; ">${scrapedContent.kcal} kcal</span>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-12">
                        <div class="recipe-directions">
                            <h3>Instructions</h3>
                            <ol>`;
                                for (i in scrapedContent.instructions) {
                                    newHTML += `<li>${scrapedContent.instructions[i]}</li>`
                                }
                                newHTML +=
                            `</ol>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 text-center">
                        <button type="button" class="btn btn-primary btn-lg" onclick="document.getElementById('main').style.display = 'none'; document.getElementById('cooking').style.display = 'block';">
                            <i class="fas fa-play"></i> Start Cooking Mode
                        </button>
                    </div>
                </div>
            </div>
        </body>
    </html>`;

    document.open()
    document.write(newHTML)
    document.close()
}
