var casper = require("casper").create({
    pageSettings: {
        loadImages: false,
        loadPlugins: false,
        userAgent: "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36"
    }
});

// Open VK
casper.start().thenOpen("https://vk.com", function() {
    console.log("Vk opened");
});

// Populate the login form with login and password and submit the form
casper.then(function(){
    console.log("Login using username and password");
    this.evaluate(function(){
        document.getElementById("index_email").value="your_username";
        document.getElementById("index_pass").value="your_password"; 
        document.getElementById("index_login_button").click();
    });
});

// Wait until you are logged-in and move to a wiki page address
casper.waitForUrl(/feed/, function(){
    casper.thenOpen("link_to_the_wiki_page");
});

// Click "View" button
casper.then(function(){
    this.click("button.flat_button");
});

// Click "Edit" button   
casper.waitForSelector("button.flat_button.secondary.wk_subscribe_btn", function(){
    this.click("button.flat_button.secondary.wk_subscribe_btn");
});    

// Click "Edit in wiki-mode" button 
casper.waitForSelector("a#wke_b_mode", function(){
    this.click("a#wke_b_mode");
});

// Write the content of the page to a file
casper.then(function(){
    var text = this.fetchText("textarea#wke_textarea");
    var fs = require("fs");
    fs.write("wiki.txt", text, "w");
});

casper.run();