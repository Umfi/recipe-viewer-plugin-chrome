const SITES = {
    CHEFKOCH: 'https://www.chefkoch.de/',
    ICHKOCHE: 'https://www.ichkoche.at/',
    GUTEKUECHE: 'https://www.gutekueche.at/'
};

class Helper {
    static isOnlyWhitespace(value) {
        return !value.replace(/\s/g, '').length;
    }
}

class Scraper {

    constructor(url) {
        this.scrapedContent = {
            heading: '',
            image: '',
            ingredients: '',
            instructions: ''
        };

        this.startScraping(url);
    }

    startScraping(url) {
        if (url.includes(SITES.CHEFKOCH)) {
            this.scrapeSite(SITES.CHEFKOCH);
        } else if (url.includes(SITES.ICHKOCHE)) {
            this.scrapeSite(SITES.ICHKOCHE);
        } else if (url.includes(SITES.GUTEKUECHE)) {
            this.scrapeSite(SITES.GUTEKUECHE);
        }
    }

    scrapeSite(siteName) {
        this.scrapeHeading(siteName);
        this.scrapeImage(siteName);
        this.scrapeIngredients(siteName);
        this.scrapeInstructions(siteName);
    }

    getScrapedContent() {
        return this.scrapedContent;
    }

    scrapeHeading(siteName) {
        if (siteName === SITES.CHEFKOCH) {
            const $heading = document.querySelector('.recipe-header h1');
            this.scrapedContent.heading = $heading.textContent;
        } else if (siteName === SITES.ICHKOCHE) {
            const $heading = document.querySelector('h1.page_title');
            this.scrapedContent.heading = $heading.textContent;
        } else if (siteName === SITES.GUTEKUECHE) {
            const $heading = document.querySelector('article h1');
            this.scrapedContent.heading = $heading.textContent;
        }
    }

    scrapeImage(siteName) {
        let $img = "";

        if (siteName === SITES.CHEFKOCH) {
            $img = document.querySelector('#recipe-image-carousel img');
        } else if (siteName === SITES.ICHKOCHE) {
            $img = document.querySelector('.gallery img');
        } else if (siteName === SITES.GUTEKUECHE) {
            $img = document.querySelector('article img');
        }

        this.scrapedContent.image = $img.src;
    }

    scrapeIngredients(siteName) {
        let $ingredientsItems = null;
        let $amount = null;
        let $name = null;
        if (siteName === SITES.CHEFKOCH) {
            $ingredientsItems = document.querySelector('.ingredients').children[0].children;
            $amount = [0];
            $name = [1];
        } else if (siteName === SITES.ICHKOCHE) {
            $ingredientsItems = document.querySelector('.ingredients_wrap').children[0].children;
            $amount = [0];
            $name = [1];
        } else if (siteName === SITES.GUTEKUECHE) {
            $ingredientsItems = document.querySelector('.ingredients-table table ').children[0].children;
            $amount = [0, 1];
            $name = [2];
        }

        const $ingredientsTableRows = $ingredientsItems;
        const ingredients = [];

        for (let i = 0; i < $ingredientsTableRows.length; i++) {
            let amount = "";
            for (let j = 0; j < $amount.length; j++) {
                amount +=  $ingredientsTableRows[i].children[$amount[j]].innerText + " ";
            }
           
            let name = "";
            for (let k = 0; k < $name.length; k++) {
                name +=  $ingredientsTableRows[i].children[$name[k]].innerText + " ";
            }

            ingredients.push({
                amount: Helper.isOnlyWhitespace(amount) ? '-' : amount,
                name: Helper.isOnlyWhitespace(name) ? '-' : name,
            });
        }

        this.scrapedContent.ingredients = ingredients;
    }

    scrapeInstructions(siteName) {
        
        let instructionText = null;

        if (siteName === SITES.CHEFKOCH) {
            const $preparation = document.querySelector('.ds-recipe-meta.rds-recipe-meta');
            instructionText = $preparation.nextElementSibling.innerText;
        } else if (siteName === SITES.ICHKOCHE) {
            const $preparation = document.querySelector('.description ol');
            instructionText = $preparation.innerText;
        } else if (siteName === SITES.GUTEKUECHE) {
            const $preparation = document.querySelector('.rezept-preperation ol');
            instructionText = $preparation.innerText;
        }

        const instructionTableRows = instructionText.split("\n");
        const instructions = [];

        for (let i = 0; i < instructionTableRows.length; i++) {
            if (instructionTableRows[i] && instructionTableRows[i] != "" && instructionTableRows[i] != "\n") {
                instructions.push(instructionTableRows[i]);
            }
        }

        this.scrapedContent.instructions = instructions;

    }
}