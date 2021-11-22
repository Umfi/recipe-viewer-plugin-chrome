function generateCookingModeHtml(scrapedContent) {
    let newHTML = `
    <div class="container mt-2" id="cooking" style="display:none;">
        <div class="row">
            <div class="col-12">
                <div class="bs-stepper">
                    <div class="bs-stepper-header" role="tablist">
                        <div class="step" data-target="#ingredients-part">
                            <button type="button" class="step-trigger" role="tab" aria-controls="ingredients-part" id="ingredients-part-trigger">
                                <span class="bs-stepper-circle">1</span>
                            </button>
                        </div>
                        <div class="line"></div>`;
                                let index = 2;
                                for (i in scrapedContent.instructions) {
                                    newHTML += `
                                    <div class="step" data-target="#part-${i}">
                                        <button type="button" class="step-trigger" role="tab" aria-controls="part-${i}" id="part-${i}-trigger">
                                            <span class="bs-stepper-circle">${index++}</span>
                                        </button>
                                    </div>
                                    `
                                    if (i != scrapedContent.instructions.length-1) {
                                        newHTML += "<div class='line'></div>";
                                    }
                                }
                                newHTML +=
                        `
                    </div>
                    <div class="bs-stepper-content">
                        <!-- your steps content here -->
                        <div id="ingredients-part" class="content" role="tabpanel" aria-labelledby="ingredients-part-trigger">
                        
                            <div class="card">
                                <div class="card-body" style="padding: 0;">
                                <table class="table table-striped" style="margin: 0;">`;
                                for (i in scrapedContent.ingredients) {
                                    newHTML += `<tr><td>${scrapedContent.ingredients[i].amount}</td><td>${scrapedContent.ingredients[i].name}</td><td><input type="checkbox" class="float-end"></td></tr>`
                                }
                                newHTML +=
                                `</table>
                                </div>
                                <div class="card-footer bg-transparent">
                                    <button type="button" class="btn btn-primary float-end nextStep">Next</button>
                                </div>
                            </div>

                  

                            
                    
                        </div>
                        `;
                            for (i in scrapedContent.instructions) {
                                newHTML += `
                                <div id="part-${i}" class="content" role="tabpanel" aria-labelledby="part-${i}-trigger">
                                
                                    <div class="card">
                                        <div class="card-body">
                                            <p class="lead">${scrapedContent.instructions[i]}</p>
                                            `;

                                            if (scrapedContent.instructions[i].toLowerCase().includes("minute")) {
                                                newHTML += `<div class="col-12 text-center">
                                                <div class="chrono">
                                                    <div class="values" class="mb-1 text-muted values">00:00:00</div>
                                                    <div>
                                                        <button class="btn btn-outline-primary startButton">Start</button>
                                                        <button class="btn btn-outline-dark pauseButton">Pause</button>
                                                        <button class="btn btn-outline-dark stopButton">Stop</button>
                                                        <button class="btn btn-outline-danger resetButton">Reset</button>
                                                    </div>
                                                </div>
                                            </div>`;
                                            }
                                            newHTML +=
                                            `
                                        </div>
                                        <div class="card-footer bg-transparent">
                                            <button type="button" class="btn btn-secondary previousStep">Previous</button>
                                            `
                                            if (i != scrapedContent.instructions.length-1) {
                                                newHTML += '<button type="button" class="btn btn-primary float-end nextStep">Next</button>';
                                            }
                                            newHTML +=
                                            `
                                        </div>
                                    </div>
                                </div>
                                `
                            }
                            newHTML +=
                        `
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    document.body.innerHTML = document.body.innerHTML + newHTML;

  

    const stepper = new Stepper(document.querySelector('.bs-stepper'), {
        linear: false
    });

    const btns = document.querySelectorAll('.nextStep')
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                stepper.next();
            });
        }
    );

    const btnsPrev = document.querySelectorAll('.previousStep')
    btnsPrev.forEach(btn => {
            btn.addEventListener('click', () => {
                stepper.previous();
            });
        }
    );


    var timer = new easytimer.Timer();
    const startBtns = document.querySelectorAll('.startButton')
    startBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                timer.start();
            });
        }
    );
    const pauseBtns = document.querySelectorAll('.pauseButton')
    pauseBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                timer.pause();
            });
        }
    );
    const stopBtns = document.querySelectorAll('.stopButton')
    stopBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                timer.stop();
            });
        }
    );
    const resetBtns = document.querySelectorAll('.resetButton')
    resetBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                timer.reset();
            });
        }
    );

    timer.addEventListener('secondsUpdated', function (e) {
        const all = document.querySelectorAll('.chrono .values')
        all.forEach(div => {
                div.innerHTML = timer.getTimeValues().toString();
            }
        );
    });

    timer.addEventListener('started', function (e) {
        const all = document.querySelectorAll('.chrono .values')
        all.forEach(div => {
                div.innerHTML = timer.getTimeValues().toString();
            }
        );
    });

    timer.addEventListener('reset', function (e) {
        const all = document.querySelectorAll('.chrono .values')
        all.forEach(div => {
                div.innerHTML = timer.getTimeValues().toString();
            }
        );
    });
}